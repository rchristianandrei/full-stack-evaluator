import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useTasks } from "../../context/TasksProvider";
import { FullScreenLoader } from "../../components/FullScreenLoader";
import { ConfirmPopup } from "../../components/ConfirmPopup";

export function DoneTask({ doneEvent }) {
  const { fetchTasks, onMarkDone } = useTasks();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!doneEvent) return;
    setIsOpen(true);
  }, [doneEvent]);

  async function onYes() {
    setIsLoading(true);
    await onMarkDone(doneEvent.taskId);
    setIsLoading(false);
    setIsOpen(false);
    toast.success("Task Done");
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
          title="Mark Task as Done"
          message={`Are you sure you want to mark "${doneEvent.taskTitle}" as done?`}
          onYes={onYes}
          onNo={onNo}
          yesText="Delete"
          noText="Cancel"
        ></ConfirmPopup>
      )}
      <FullScreenLoader
        open={isLoading}
        message="Marking Task as Done"
      ></FullScreenLoader>
    </>
  );
}
