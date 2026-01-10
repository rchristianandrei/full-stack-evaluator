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
    [HttpPost("/login")]
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
            Secure = false,
            SameSite = SameSiteMode.Lax,
            Expires = DateTime.UtcNow.AddMinutes(Convert.ToInt32(jwtSettings.ExpireMinutes))
        });

        return Ok();
    }

    // GET api/<AuthController>/5
    [HttpGet("{id}")]
    public string Get(int id)
    {
        return "value";
    }

    // POST api/<AuthController>
    [HttpPost]
    public void Post([FromBody] string value)
    {
    }

    // PUT api/<AuthController>/5
    [HttpPut("{id}")]
    public void Put(int id, [FromBody] string value)
    {
    }

    // DELETE api/<AuthController>/5
    [HttpDelete("{id}")]
    public void Delete(int id)
    {
    }
}
