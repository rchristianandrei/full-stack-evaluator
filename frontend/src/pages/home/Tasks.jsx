import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import AddTask from "./AddTask";
import { PrimaryButton } from "../../components/buttons/PrimaryButton";
import { ConfirmPopup } from "../../components/ConfirmPopup";
import { Card } from "./Card";
import { SearchBar } from "../../components/inputs/SearchBar";
import { useTasks } from "../../context/TasksProvider";
import { useConfirm } from "../../hooks/useConfirm";
import { FullScreenLoader } from "../../components/FullScreenLoader";

export function Tasks(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState({
    open: false,
    message: "",
  });
  const {
    tasks,
    isLoading,
    query,
    setQuery,
    fetchTasks,
    onMarkDone,
    onDelete,
  } = useTasks();
  const { confirmData, onMarkAsDone, onDeletePopup, onClose } = useConfirm();

  useEffect(() => {
    fetchTasks().catch((err) => console.log(err));
  }, [query]);

  function OnMarkAsDone(taskId, taskTitle) {
    onMarkAsDone(
      `Are you sure you want to mark "${taskTitle}" as done?`,
      async () => {
        setLoading({ open: true, message: "Marking as Done" });
        await onMarkDone(taskId);
        setLoading((data) => ({ ...data, open: false }));
        toast.success("Task Done");
        onClose();
        await fetchTasks();
      },
      () => {
        onClose();
      },
    );
  }

  function OnDelete(taskId, taskTitle) {
    onDeletePopup(
      `Are you sure you want to delete "${taskTitle}"?`,
      async () => {
        try {
          setLoading({ open: true, message: "Deleting Task" });
          await onDelete(taskId);
          setLoading((data) => ({ ...data, open: false }));
          onClose();
          toast.success("Deleted Task");
          await fetchTasks(query);
        } catch (err) {
          console.log(err);
        }
      },
      () => {
        onClose();
      },
    );
  }

  async function OnPopupClose(success) {
    setIsOpen(false);
    if (!success) return;
    await fetchTasks();
  }

  return (
    <>
      <div
        className={`${props.className} flex flex-col gap-2 px-2 overflow-auto`}
      >
        <div
          className={`flex items-center justify-between w-full max-w-300 mx-auto gap-2`}
        >
          <SearchBar query={query} onSearch={setQuery} delay={500}></SearchBar>
          <PrimaryButton onClick={() => setIsOpen(true)}>Add</PrimaryButton>
        </div>
        <ul className="relative flex-1 max-w-300 mx-auto w-full overflow-auto">
          {tasks.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
              {tasks.map((task) => (
                <Card
                  task={task}
                  OnDelete={OnDelete}
                  OnMarkAsDone={OnMarkAsDone}
                  key={task.id}
                ></Card>
              ))}
            </div>
          )}
          {tasks.length <= 0 && !isLoading && (
            <div className="flex h-full justify-center items-center">
              <div>No Tasks Found</div>
            </div>
          )}
          <FullScreenLoader
            open={isLoading}
            message="Loading Tasks"
          ></FullScreenLoader>
        </ul>
      </div>
      <AddTask isOpen={isOpen} onClose={OnPopupClose}></AddTask>
      <ConfirmPopup
        isOpen={confirmData.isOpen}
        title={confirmData.title}
        message={confirmData.message}
        onYes={confirmData.onYes}
        onNo={confirmData.onNo}
        yesText={confirmData.yesText}
        noText={confirmData.noText}
      ></ConfirmPopup>
      <FullScreenLoader
        open={loading.open}
        message={loading.message}
      ></FullScreenLoader>
    </>
  );
}
