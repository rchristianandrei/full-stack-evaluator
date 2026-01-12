using task_manager_api.Models;

namespace task_manager_api.Interfaces;

public interface ITaskItemRepository : IBaseRepository<TaskItem>
{
    Task<IEnumerable<TaskItem>> GetAllByUserId(int userId, string search = "");
    Task<TaskItem?> GetByIdIncludeAll(int id);
}