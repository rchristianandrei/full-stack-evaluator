import api from "./axios";

function getAllTasks(query, controller) {
  return api.get(
    `/tasks?search=${query ?? ""}`,
    controller
      ? {
          signal: controller.signal,
        }
      : null
  );
}

function addTask(task) {
  return api.post("/tasks", task);
}

function setToDone(taskId, status) {
  return api.patch(`/tasks/${taskId}`, {
    isDone: status,
  });
}

function deleteById(taskId) {
  return api.delete(`/tasks/${taskId}`);
}

export default { getAllTasks, addTask, setToDone, deleteById };
