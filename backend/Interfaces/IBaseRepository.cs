namespace task_manager_api.Interfaces
{
    public interface IBaseRepository<T> where T : class
    {
        Task Add(T entity);
        Task<IEnumerable<T>> GetAll();
        Task<T?> GetById(int id);
        Task Remove(T entity);
        Task SaveChanges();
    }
}