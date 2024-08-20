import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";

export default function AllUsers() {
  const navigate = useNavigate();
  const { user, token } = useContext(AppContext);

  const [users, setUsers] = useState([]); // Initialize users as an empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function getUsers() {
    try {
      const res = await fetch("/api/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        if (res.status === 403) {
          throw new Error("Unauthorized access");
        } else {
          throw new Error("Failed to fetch users");
        }
      }

      const data = await res.json();
      setUsers(data || []); // Ensure data is an array or set as an empty array
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(userId) {
    try {
      const res = await fetch(`/api/admin/users/${userId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        if (res.status === 403) {
          throw new Error("Unauthorized access");
        } else {
          throw new Error("Failed to delete user");
        }
      }

      const data = await res.json();
      setUsers(users.filter(u => u.id !== userId));
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    if (user && user.role === 'admin') {
      getUsers();
    } else {
      navigate("/"); // Redirect if not an admin
    }
  }, [user, token, navigate]);

  if (loading) {
    return <p>Loading users...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!users.length) {
    return <p>No users found!</p>;
  }

  return (
    <>
      {users.map((user) => (
        <div
          key={user.id}
          className="mt-4 p-4 border rounded-md border-dashed border-slate-400"
        >
          <div className="mb-2 flex items-start justify-between">
            <div>
              <h2 className="font-bold text-xl">{user.name}</h2>
              <small className="text-xs text-slate-600">
                Email: {user.email}
              </small>
              <p className="text-xs text-slate-500">Role: {user.role}</p>
            </div>
          </div>

          {/* No role check here, assumes admin role is already checked */}
          <div className="flex items-center justify-end gap-4">
            <Link
              to={`/admin/users/update/${user.id}`}
              className="bg-green-500 text-white text-sm rounded-lg px-3 py-1"
            >
              Update
            </Link>

            <form onSubmit={(e) => {
              e.preventDefault();
              handleDelete(user.id);
            }}>
              <button className="bg-red-500 text-white text-sm rounded-lg px-3 py-1">
                Delete
              </button>
            </form>
          </div>
        </div>
      ))}
    </>
  );
}
