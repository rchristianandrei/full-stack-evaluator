using Microsoft.AspNetCore.Mvc;
using task_manager_api.DTOs;
using task_manager_api.Interfaces;
using task_manager_api.Settings;

namespace task_manager_api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AuthController(
        IUserRepository userRepo,
        IHashPasswordService hashService,
        IJwtService jwtService,
        JwtSettings jwtSettings
) : ControllerBase
{
    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginDto dto)
    {
        var user = await userRepo.GetByEmail(dto.Email);

        if (user == null) return BadRequest("Invalid Credentials");

        if (!hashService.VerifyPassword(dto.Password, user.PasswordHash))
        {
            return BadRequest("Invalid Credentials");
        }

        var token = jwtService.GenerateToken(user);

        Response.Cookies.Append("Authorization", token, new CookieOptions
        {
            HttpOnly = true,
            Secure = true,
            SameSite = SameSiteMode.None,
            Expires = DateTime.UtcNow.AddMinutes(Convert.ToInt32(jwtSettings.ExpireMinutes))
        });

        return Ok();
    }

    [HttpGet("me")]
    public IActionResult GetUser()
    {
        var userId = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
        var email = User.FindFirst(System.Security.Claims.ClaimTypes.Email)?.Value;

        if (userId == null) return BadRequest("No credentials found");

        return Ok(new { Id = userId, Email = email});
    }
}
