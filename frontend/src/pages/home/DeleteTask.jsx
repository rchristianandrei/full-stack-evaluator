import { useEffect, useState } from "react";
import { ConfirmPopup } from "../../components/ConfirmPopup";
import { useTasks } from "../../context/TasksProvider";
import { FullScreenLoader } from "../../components/FullScreenLoader";

export function DeleteTask({ deleteEvent }) {
  const { fetchTasks, onDelete } = useTasks();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!deleteEvent) return;
    setIsOpen(true);
  }, [deleteEvent]);

  async function onYes() {
    setIsLoading(true);
    await onDelete(deleteEvent.taskId);
    setIsLoading(false);
    setIsOpen(false);
    await fetchTasks();
  }
  function onNo() {
    setIsOpen(false);
  }

  return (
    <>
      {isOpen && (
        <ConfirmPopup
          isOpen={isOpen}
          title="Delete Task"
          message={`Are you sure you want to delete "${deleteEvent.taskTitle}"?`}
          onYes={onYes}
          onNo={onNo}
          yesText="Delete"
          noText="Cancel"
        ></ConfirmPopup>
      )}
      <FullScreenLoader
        open={isLoading}
        message="Deleting Task"
      ></FullScreenLoader>
    </>
  );
}
