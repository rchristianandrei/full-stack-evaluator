using System.ComponentModel.DataAnnotations;

namespace task_manager_api.DTOs;

public class RegisterDto
{
    [Required]
    public string Email { get; set; } = string.Empty;

    [Required]
    public string Password { get; set; } = string.Empty;
}
