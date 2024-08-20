import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../Context/AppContext";
import { useNavigate, useParams } from "react-router-dom";

export default function UpdateUser() {
  const { id } = useParams(); // Get the user ID from the URL
  const navigate = useNavigate();
  const { token, user } = useContext(AppContext); // Get the authentication token from context

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "user", // Default role
  });

  const [errors, setErrors] = useState({});

  // Fetch the user's existing data to populate the form
  async function getUser() {
    const res = await fetch(`/api/admin/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();

    if (res.ok) {
      if (user.role !== 'admin') {
        navigate("/"); // Redirect if the logged-in user is not an admin
      }

      setFormData({
        name: data.name,
        email: data.email,
        role: data.role || "user",
      });
    }
  }

  // Handle form submission to update the user's data
  async function handleUpdate(e) {
    e.preventDefault();

    const res = await fetch(`/api/admin/users/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    console.log(data);

    if (data.errors) {
      setErrors(data.errors);
    } else {
      navigate("/all-users"); // Redirect to all users page after successful update
    }
  }

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <h1 className="title">Update User</h1>

      <form onSubmit={handleUpdate} className="w-1/2 mx-auto space-y-6">
        <div>
          <input
            type="text"
            placeholder="User Name"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
          />
          {errors.name && <p className="error">{errors.name[0]}</p>}
        </div>

        <div>
          <input
            type="email"
            placeholder="User Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          {errors.email && <p className="error">{errors.email[0]}</p>}
        </div>

        <div>
          <select
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          {errors.role && <p className="error">{errors.role[0]}</p>}
        </div>

        <button className="primary-btn">Update</button>
      </form>
    </>
  );
}
