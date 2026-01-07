using Microsoft.EntityFrameworkCore;
using task_manager_api.Data;
using task_manager_api.Interfaces;
using task_manager_api.Models;

namespace task_manager_api.Repositories;

public class UserRepository(ApplicationDbContext context) : BaseRepository<User>(context), IUserRepository
{
    public async Task<User?> GetByEmail(string email)
    {
        return await context.Users.SingleOrDefaultAsync(u => EF.Functions.ILike(u.Email, email));
    }
}
