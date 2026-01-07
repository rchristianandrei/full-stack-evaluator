import { useEffect, useState } from "react";
import taskRepo from "../api/taskRepo";
import userRepo from "../api/userRepo";

function AddTask(props) {
  const [formData, setFormData] = useState({
    title: "",
    userId: "",
  });

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const controller = new AbortController();

    userRepo.getAllUsers(controller)
      .then((res) => setUsers(res.data))
      .catch((err) => {
        if (err.name !== "CanceledError") {
          console.error(err);
        }
      });

    return () => {
      controller.abort();
    };
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    taskRepo.addTask(formData)
      .then(() => {
        props.onClose(true);
      })
      .catch((err) => {
        console.log(err);
        alert("Failed to submit form.");
      });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" onClick={() => props.onClose(false)} />

      {/* Modal Box */}
      <div className="relative z-10 w-full max-w-md rounded-lg border p-6 shadow-lg bg-black">
        <button
          onClick={() => props.onClose(false)}
          className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>

        <h2 className="mb-4 text-xl font-semibold">Create Task Form</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            className="w-full rounded border px-3 py-2 focus:border-blue-500 focus:outline-none"
            required
          />

          <select
            name="userId"
            value={formData.userId}
            onChange={handleChange}
            className="w-full rounded border px-3 py-2 focus:border-blue-500 focus:outline-none *:bg-black"
            required
          >
            <option value="" disabled>
              Select a user
            </option>
            {users.map((user) => (
              <option key={user.id} value={`${user.id}`}>
                {user.email}
              </option>
            ))}
          </select>

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

export default AddTask;
