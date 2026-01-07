using System.ComponentModel.DataAnnotations;
using System.Runtime.InteropServices;

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
    string Title,

    [Range(1, int.MaxValue)]
    int UserId
);

public record UpdateTaskItemDto
(
    [Required]
    [MinLength(1)]
    string Title,

    [Range(1, int.MaxValue)]
    int UserId,

    bool IsDone
);

public record PatchTaskItemDto
(
    [MinLength(1)]
    string? Title,

    [Range(1, int.MaxValue)]
    int? UserId,

    bool? IsDone
);