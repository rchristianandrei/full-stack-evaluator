import { useEffect, useState } from "react";
import { useTasks } from "../../context/TasksProvider";
import { PrimaryButton } from "../../components/buttons/PrimaryButton";
import { FullScreenLoader } from "../../components/FullScreenLoader";
import { SearchBar } from "../../components/inputs/SearchBar";
import { Card } from "./Card";
import { AddTask } from "./AddTask";
import { DeleteTask } from "./DeleteTask";
import { DoneTask } from "./DoneTask";

export function Tasks(props) {
  const [deleteEvent, setDeleteEvent] = useState(null);
  const [doneEvent, setDoneEvent] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const { tasks, isLoading, query, setQuery, fetchTasks } = useTasks();

  useEffect(() => {
    fetchTasks().catch((err) => console.log(err));
  }, [query]);

  function OnMarkAsDone(taskId, taskTitle) {
    setDoneEvent({ taskId, taskTitle });
  }

  function OnDelete(taskId, taskTitle) {
    setDeleteEvent({ taskId, taskTitle });
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
          <SearchBar onSearch={setQuery} delay={500}></SearchBar>
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
      <DeleteTask deleteEvent={deleteEvent}></DeleteTask>
      <DoneTask doneEvent={doneEvent}></DoneTask>
    </>
  );
}
