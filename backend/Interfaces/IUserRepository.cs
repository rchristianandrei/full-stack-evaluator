using task_manager_api.Models;

namespace task_manager_api.Interfaces
{
    public interface IUserRepository : IBaseRepository<User>
    {
        Task<User?> GetByEmail(string email);
    }
}