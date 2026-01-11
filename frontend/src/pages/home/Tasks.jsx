import { useEffect, useState } from "react";
import taskRepo from "../../api/taskRepo";
import AddTask from "./AddTask";
import { DeleteButton } from "../../components/buttons/DeleteButton";
import { PrimaryButton } from "../../components/buttons/PrimaryButton";
import { ConfirmPopup } from "../../components/ConfirmPopup";

function Tasks(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [confirmData, setConfirmData] = useState({
    isOpen: false,
    title: "Are you sure?",
    message: "Do you want to continue?",
    onYes: () => {
      console.log("Yes");
    },
    onNo: () => {
      console.log("No");
    },
    yesText: "Yes",
    noText: "No",
  });

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

  function OnMarkAsDone(taskId, taskTitle) {
    setConfirmData((data) => ({
      isOpen: true,
      title: "Update Task",
      message: `Are you sure you want to mark "${taskTitle}" as done?`,
      onYes: () => {
        taskRepo
          .setToDone(taskId, true)
          .then(() => {
            taskRepo
              .getAllTasks()
              .then((res) => {
                setTasks(res.data);
                setConfirmData((data) => ({ ...data, isOpen: false }));
              })
              .catch((err) => console.error(err));
          })
          .catch((err) => console.log(err));
      },
      onNo: () => {
        setConfirmData((data) => ({ ...data, isOpen: false }));
      },
      yesText: "Mark as Done",
      noText: "Cancel",
    }));
  }

  function OnDelete(taskId, taskTitle) {
    setConfirmData((data) => ({
      isOpen: true,
      title: "Delete Task",
      message: `Are you sure you want to delete "${taskTitle}"?`,
      onYes: () => {
        taskRepo
          .deleteById(taskId)
          .then(() => {
            taskRepo
              .getAllTasks()
              .then((res) => {
                setTasks(res.data);
                setConfirmData((data) => ({ ...data, isOpen: false }));
              })
              .catch((err) => console.error(err));
          })
          .catch((err) => console.log(err));
      },
      onNo: () => {
        setConfirmData((data) => ({ ...data, isOpen: false }));
      },
      yesText: "Delete",
      noText: "Cancel",
    }));
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
        <div
          className={`flex items-center justify-between w-full max-w-300 mx-auto`}
        >
          <h2 className="text-2xl">My Tasks</h2>
          <PrimaryButton onClick={() => setIsOpen(true)}>Add</PrimaryButton>
        </div>
        <ul className="flex-1 w-full max-w-300 mx-auto flex flex-col gap-2 px-4 border">
          <div className={`grid grid-cols-3 *:text-xl text-center`}>
            <div>Title</div>
            <div>Status</div>
            <div>Actions</div>
          </div>
          {tasks.map((task) => (
            <li className={`grid grid-cols-3`} key={task.id}>
              <p className="overflow-clip" title={task.title}>
                {task.title}
              </p>
              <div className="text-center">{task.isDone ? "✅" : "❌"}</div>
              <div className="flex flex-wrap gap-1 justify-end">
                {!task.isDone && (
                  <button
                    className="border border-white bg-green-700"
                    onClick={() => OnMarkAsDone(task.id, task.title)}
                  >
                    Done
                  </button>
                )}
                <DeleteButton onClick={() => OnDelete(task.id, task.title)}>
                  Delete
                </DeleteButton>
              </div>
            </li>
          ))}
        </ul>
      </div>
      {isOpen && <AddTask onClose={OnPopupClose}></AddTask>}
      <ConfirmPopup
        isOpen={confirmData.isOpen}
        title={confirmData.title}
        message={confirmData.message}
        onYes={confirmData.onYes}
        onNo={confirmData.onNo}
        yesText={confirmData.yesText}
        noText={confirmData.noText}
      ></ConfirmPopup>
    </>
  );
}

export default Tasks;
