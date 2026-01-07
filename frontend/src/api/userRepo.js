import api from "./axios";

function getAll(controller) {
  return api.get(
    "/users",
    controller
      ? {
          signal: controller.signal,
        }
      : null
  );
}

function deleteById(userId) {
  return api.delete(`/users/${userId}`);
}

export default { getAll, deleteById };
