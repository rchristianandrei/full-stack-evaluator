using Microsoft.EntityFrameworkCore;
using task_manager_api.Data;
using task_manager_api.Interfaces;
using task_manager_api.Models;

namespace task_manager_api.Repositories;

public class TaskItemRepository(ApplicationDbContext context) : BaseRepository<TaskItem>(context), ITaskItemRepository
{
    public override async Task<IEnumerable<TaskItem>> GetAll()
    {
        return await dbSet.Include(t => t.User).OrderBy(t => t.Id).ToListAsync();
    }

    public async Task<IEnumerable<TaskItem>> GetAllByUserId(int userId, string search = "")
    {
        if (string.IsNullOrWhiteSpace(search))
            return await dbSet.Where(t => t.UserId == userId).ToListAsync();

        search = search.ToLower();

        return await dbSet
        .Where(t =>
            t.UserId == userId &&
            (t.Title.ToLower().Contains(search) ||
             t.Details.ToLower().Contains(search)))
        .ToListAsync();
    }

    public async Task<TaskItem?> GetByIdIncludeAll(int id)
    {
        return await dbSet.Include(t => t.User).FirstOrDefaultAsync(t => t.Id == id);
    }
}
