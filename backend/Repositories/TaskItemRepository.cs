using Microsoft.EntityFrameworkCore;
using task_manager_api.Data;
using task_manager_api.Interfaces;
using task_manager_api.Models;

namespace task_manager_api.Repositories;

public class TaskItemRepository(ApplicationDbContext context) : BaseRepository<TaskItem>(context), ITaskItemRepository
{
    public async Task<TaskItem?> GetByIdIncludeAll(int id)
    {
        return await dbSet.Include(t => t.User).FirstOrDefaultAsync(t => t.Id == id);
    }
}
