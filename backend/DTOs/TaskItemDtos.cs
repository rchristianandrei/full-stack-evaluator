using System.ComponentModel.DataAnnotations;

namespace task_manager_api.DTOs;

public record TaskItemDto
(
    int Id,
    string Title,
    string Details,
    bool IsDone,
    int UserId,
    UserDto? User
);

public record CreateTaskItemDto
(
    [Required]
    [MinLength(1)]
    [MaxLength(25)]
    string Title,

    [Required]
    [MinLength(1)]
    [MaxLength(100)]
    string Details
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