import { useEffect, useState } from "react";
import taskRepo from "./api/taskRepo";
import AddTask from "./modals/AddTask";
import { TableHeader } from "./components/table/TableHeader";
import { TableEntry } from "./components/table/TableEntry";
import { Table } from "./components/table/Table";
import { Heading } from "./components/Heading";
import { Container } from "./components/Container";
import { DeleteButton } from "./components/buttons/DeleteButton";
import { PrimaryButton } from "./components/buttons/PrimaryButton";
import { ConfirmPopup } from "./components/ConfirmPopup";

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
      <Container className={props.className}>
        <Heading>
          <h2 className="text-2xl">Tasks</h2>
          <PrimaryButton onClick={() => setIsOpen(true)}>Add</PrimaryButton>
        </Heading>
        <Table>
          <TableHeader className="grid-cols-4">
            <div>Title</div>
            <div>User</div>
            <div>Status</div>
            <div>Actions</div>
          </TableHeader>
          {tasks.map((task) => (
            <TableEntry className="grid-cols-4" key={task.id}>
              <p className="overflow-clip" title={task.user.email}>
                {task.title}
              </p>
              <p className="overflow-clip" title={task.user.email}>
                {task.user.email}
              </p>
              <div>{task.isDone ? "✅" : "❌"}</div>
              <div className="flex gap-1 justify-end">
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
            </TableEntry>
          ))}
        </Table>
      </Container>
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
