using System.ComponentModel.DataAnnotations;

namespace task_manager_api.DTOs;

public record TaskItemDto
(
    int Id,
    string Title,
    bool IsDone,
    int UserId,
    UserDto? User
);

public record CreateTaskItemDto
(
    [Required]
    [MinLength(1)]
    string Title
);

public record UpdateTaskItemDto
(
    [Required]
    [MinLength(1)]
    string Title,

    bool IsDone
);

public record PatchTaskItemDto
(
    [MinLength(1)]
    string? Title,

    bool? IsDone
);