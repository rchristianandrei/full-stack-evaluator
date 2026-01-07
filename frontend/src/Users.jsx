import { useEffect, useState } from "react";
import taskRepo from "./api/taskRepo";
import AddTask from "./components/AddTask";

function Users(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const controller = new AbortController();

    taskRepo
      .getAllTasks(controller)
      .then((res) => setTasks(res.data))
      .catch((err) => {
        if (err.name !== "CanceledError") {
          console.error(err);
        }
      });

    return () => {
      controller.abort();
    };
  }, []);

  function OnMarkAsDone(taskId) {
    const confirm = window.confirm(
      `Are you sure you want to mark task Id: ${taskId} as done?`
    );

    if (!confirm) return;

    taskRepo
      .setToDone(taskId, true)
      .then(() => {
        taskRepo
          .getAllTasks()
          .then((res) => setTasks(res.data))
          .catch((err) => console.error(err));
      })
      .catch((err) => console.log(err));
  }

  function OnDelete(taskId) {
    const confirm = window.confirm(
      `Are you sure you want to delete task Id: ${taskId}?`
    );

    if (!confirm) return;

    taskRepo
      .deleteById(taskId)
      .then(() => {
        taskRepo
          .getAllTasks()
          .then((res) => setTasks(res.data))
          .catch((err) => console.error(err));
      })
      .catch((err) => console.log(err));
  }

  function OnPopupClose(success) {
    setIsOpen(false);

    if (!success) return;

    taskRepo
      .getAllTasks()
      .then((res) => setTasks(res.data))
      .catch((err) => console.error(err));
  }

  return (
    <>
      <div className={`${props.className} flex flex-col gap-2`}>
        <div className="flex items-center justify-between w-full max-w-150 mx-auto">
          <h2 className="text-2xl">Users</h2>
          <button
            className="border bg-white text-black"
            onClick={() => setIsOpen(true)}
          >
            Add
          </button>
        </div>
        <ul className="flex-1 w-full max-w-150 mx-auto flex flex-col gap-2 px-4 border overflow-y-auto">
          <div className="grid grid-cols-[1fr_100px] *:text-xl">
            <div className="text-start">Email</div>
            <div>Actions</div>
          </div>
          {tasks.map((task) => (
            <li className="grid grid-cols-[1fr_100px]" key={task.id}>
              <div className="text-start">{task.user.email} </div>
              <button
                className="border bg-red-500"
                onClick={() => OnDelete(task.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
      {isOpen && <AddTask onClose={OnPopupClose}></AddTask>}
    </>
  );
}

export default Users;
