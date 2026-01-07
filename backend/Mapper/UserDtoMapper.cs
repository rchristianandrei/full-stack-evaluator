using task_manager_api.DTOs;
using task_manager_api.Models;

namespace task_manager_api.Mapper;

public static class UserDtoMapper
{
    public static UserDto ToDto(this User user)
    {
        return new UserDto(user.Id, user.Email, []);
    }

    public static UserDto ToDtoIncludeAll(this User user)
    {
        return new UserDto(user.Id, user.Email, user.Tasks);
    }
}
