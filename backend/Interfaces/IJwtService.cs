using task_manager_api.Models;

namespace task_manager_api.Interfaces;

public interface IJwtService
{
    string GenerateToken(User user);
}
