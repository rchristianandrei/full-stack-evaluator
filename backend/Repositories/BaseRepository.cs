using Microsoft.EntityFrameworkCore;
using task_manager_api.Data;
using task_manager_api.Interfaces;

namespace task_manager_api.Repositories;

public abstract class BaseRepository<T>(ApplicationDbContext context) : IBaseRepository<T> where T : class
{
    protected readonly ApplicationDbContext context = context;
    protected readonly DbSet<T> dbSet = context.Set<T>();

    public async Task SaveChanges()
    {
        await context.SaveChangesAsync();
    }

    public async Task<IEnumerable<T>> GetAll()
    {
        return await dbSet.ToListAsync();
    }

    public async Task<T?> GetById(int id)
    {
        return await dbSet.FindAsync(id);
    }

    public async Task Add(T entity)
    {
        await dbSet.AddAsync(entity);
        await context.SaveChangesAsync();
    }

    public async Task Remove(T entity)
    {
        dbSet.Remove(entity);
        await context.SaveChangesAsync();
    }
}
