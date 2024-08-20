import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppContext } from "./Context/AppContext";
import { useContext } from "react";

import Layout from "./Pages/Layout";
import Home from "./Pages/Home";
import Register from "./Pages/Auth/Register";
import Login from "./Pages/Auth/Login";
import Create from "./Pages/Posts/Create";
import Show from "./Pages/Posts/Show";
import Update from "./Pages/Posts/Update";
import AllUsers from "./Pages/Users/AllUsers";
import UpdateUser from "./Pages/Users/UpdateUser";
import "./App.css";

export default function App() {
  const { user } = useContext(AppContext);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />

          <Route path="/register" element={user ? <Home /> : <Register />} />
          <Route path="/login" element={user ? <Home /> : <Login />} />

          <Route path="/create" element={user ? <Create /> : <Login />} />

          <Route path="/posts/:id" element={<Show />} />

          <Route path="/posts/update/:id" element={user ? <Update /> : <Login />} />

          <Route path="/all-users" element={user && user.role === 'admin' ? <AllUsers /> : <Home />} />
          <Route path="admin/users/update/:id" element={user && user.role === 'admin' ? <UpdateUser /> : <Home />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}