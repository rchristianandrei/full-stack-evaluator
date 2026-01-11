using task_manager_api.DTOs;
using task_manager_api.Models;

namespace task_manager_api.Mapper;

public static class TaskItemDtoMapper
{
    public static TaskItemDto ToDto(this TaskItem item)
    {
        return new TaskItemDto(item.Id, item.Title, item.Details, item.IsDone, item.UserId, null);
    }

    public static TaskItemDto ToDtoIncludeAll(this TaskItem item)
    {
        return new TaskItemDto(item.Id, item.Title, item.Details, item.IsDone, item.UserId, item.User.ToDto());
    }
}
