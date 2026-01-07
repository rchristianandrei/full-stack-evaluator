using task_manager_api.Models;

namespace task_manager_api.Interfaces;

public interface ITaskItemRepository : IBaseRepository<TaskItem>
{
    Task<TaskItem?> GetByIdIncludeAll(int id);
}