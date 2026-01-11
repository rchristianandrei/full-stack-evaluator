using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Text.RegularExpressions;
using task_manager_api.DTOs;
using task_manager_api.Interfaces;
using task_manager_api.Models;
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

        if (user == null || !hashService.VerifyPassword(dto.Password, user.PasswordHash)) 
            return BadRequest("Invalid Credentials");

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

    [Authorize]
    [HttpPost("logout")]
    public IActionResult Logout()
    {
        Response.Cookies.Append("Authorization", "", new CookieOptions
        {
            HttpOnly = true,
            Secure = true,
            SameSite = SameSiteMode.None,
            Expires = DateTime.UtcNow.AddDays(-1)
        });

        return Ok();
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterDto dto)
    {
        string pattern = @"^[^@\s]+@[^@\s]+\.[^@\s]+$";
        if (!Regex.IsMatch(dto.Email, pattern, RegexOptions.IgnoreCase))
            return BadRequest("Invalid email format");
        
        var existingUser = await userRepo.GetByEmail(dto.Email);
        if (existingUser != null) return BadRequest("Email is already in use");

        var user = new User
        {
            Email = dto.Email.ToLower(),
            PasswordHash = hashService.HashPassword(dto.Password)
        };

        await userRepo.Add(user);

        return Ok();
    }

    [Authorize]
    [HttpGet("me")]
    public IActionResult GetUser()
    {
        var userId = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
        var email = User.FindFirst(System.Security.Claims.ClaimTypes.Email)?.Value;

        if (userId == null) return BadRequest("No credentials found");

        return Ok(new { Id = userId, Email = email});
    }
}
