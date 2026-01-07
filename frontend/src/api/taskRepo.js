import api from "./axios"

function getAllTasks(controller){
    return api.get('/tasks', controller ? {
      signal: controller.signal,
    } : null)
}

function deleteById(taskId){
    return api.delete(`/tasks/${taskId}`)
}

export default {getAllTasks, deleteById}