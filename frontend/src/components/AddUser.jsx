import { useEffect, useState } from "react";
import userRepo from "../api/userRepo";

function AddUser(props) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errMssg, setErrMssg] = useState("")

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setErrMssg("")

    userRepo
      .add(formData)
      .then(() => {
        props.onClose(true);
      })
      .catch((err) => {
        setErrMssg(err.response.data)
      });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={() => props.onClose(false)}
      />

      {/* Modal Box */}
      <div className="relative z-10 w-full max-w-md rounded-lg border p-6 shadow-lg bg-black">
        <button
          onClick={() => props.onClose(false)}
          className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>

        <h2 className="mb-4 text-xl font-semibold">Create User Form</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
            value={formData.email}
            onChange={handleChange}
            className="w-full rounded border px-3 py-2 focus:border-blue-500 focus:outline-none"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full rounded border px-3 py-2 focus:border-blue-500 focus:outline-none"
            required
          />

          {errMssg && <div className="text-red-400">{errMssg}</div>}

          <button
            type="submit"
            className="w-full rounded bg-blue-600 py-2 text-white hover:bg-blue-700"
          >
            Add
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddUser;
