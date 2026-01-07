import api from "./axios";

function getAllUsers(controller) {
  return api.get(
    "/users",
    controller
      ? {
          signal: controller.signal,
        }
      : null
  );
}

export default { getAllUsers };
