import { useEffect, useState } from "react";
import taskRepo from "./api/taskRepo";
import AddTask from "./components/AddTask";

function Tasks(props) {
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
        <div className="flex items-center justify-around">
          <h2 className="text-2xl">Tasks</h2>
          <button
            className="border bg-white text-black"
            onClick={() => setIsOpen(true)}
          >
            Add
          </button>
        </div>
        <div className="flex-1 flex justify-center">
          <ul className="flex-1 max-w-150 flex flex-col gap-2 px-4">
            <div className="grid grid-cols-4 *:text-xl">
              <div>Title</div>
              <div>User</div>
              <div>Status</div>
              <div>Actions</div>
            </div>
            {tasks.map((task) => (
              <li className="grid grid-cols-4" key={task.id}>
                <div>{task.title}</div>
                <div>{task.user.email} </div>
                <div>{task.isDone ? "✅" : "❌"}</div>
                <div className="flex gap-1 justify-end">
                  {!task.isDone && (
                    <button
                      className="border border-white bg-green-700"
                      onClick={() => OnMarkAsDone(task.id)}
                    >
                      Done
                    </button>
                  )}
                  <button
                    className="border bg-red-500"
                    onClick={() => OnDelete(task.id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {isOpen && <AddTask onClose={OnPopupClose}></AddTask>}
    </>
  );
}

export default Tasks;
