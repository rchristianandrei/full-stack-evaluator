import api from "./axios";

const path = "/users"

function getAll(controller) {
  return api.get(
    path,
    controller
      ? {
          signal: controller.signal,
        }
      : null
  );
}

function add(user) {
  return api.post(path, user);
}

function deleteById(userId) {
  return api.delete(`${path}/${userId}`);
}

export default { getAll, add, deleteById };
