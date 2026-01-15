import { useState } from "react";
import taskRepo from "../api/taskRepo";

export function useTasks() {
  const [tasks, setTasks] = useState([]);
  const [query, setQuery] = useState("");

  async function fetchTasks() {
    const res = await taskRepo.getAllTasks(query);
    setTasks(res.data);
  }

  async function onMarkDone(taskId) {
    await taskRepo.setToDone(taskId, true);
  }

  async function onDelete(taskId) {
    await taskRepo.deleteById(taskId);
  }

  return {
    tasks,
    query,
    setQuery,
    fetchTasks,
    onMarkDone,
    onDelete,
  };
}
