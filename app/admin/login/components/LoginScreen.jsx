import { loginUser } from "../../../firebase";
import { useState } from "react";

export default function LoginScreen() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    loginUser(formData.email, formData.password).then((success) => {
      if (success) {
        if (window != undefined) {
          window.location.href = "/admin";
        }
      } else {
        alert(
          "Login failed, double-check your password and email and try again."
        );
      }
    });
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Login</h2>
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="input input-bordered w-full mb-4"
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="input input-bordered w-full mb-4"
          />
          <div className="card-actions justify-end">
            <button onClick={handleSubmit} className="btn btn-primary">
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
