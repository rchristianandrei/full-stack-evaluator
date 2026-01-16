import { useState } from "react";
import taskRepo from "../api/taskRepo";

export function useTasks() {
  const [tasks, setTasks] = useState([]);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function fetchTasks() {
    setIsLoading(true)
    const res = await taskRepo.getAllTasks(query);
    setTasks(res.data);
    setIsLoading(false)
  }

  async function onMarkDone(taskId) {
    await taskRepo.setToDone(taskId, true);
  }

  async function onDelete(taskId) {
    await taskRepo.deleteById(taskId);
  }

  return {
    tasks,
    isLoading,
    query,
    setQuery,
    fetchTasks,
    onMarkDone,
    onDelete,
  };
}
