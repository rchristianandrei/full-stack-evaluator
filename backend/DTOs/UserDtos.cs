using System.ComponentModel.DataAnnotations;
using task_manager_api.Models;

namespace task_manager_api.DTOs;

public record UserDto
(
    int Id,

    string Email,

    ICollection<TaskItem> Tasks
);

public record CreateUserDto
(
    [Required]
    string Email,

    [Required]
    string Password
);
