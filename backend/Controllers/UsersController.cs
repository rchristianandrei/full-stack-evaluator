using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Text.RegularExpressions;
using task_manager_api.DTOs;
using task_manager_api.Interfaces;
using task_manager_api.Mapper;
using task_manager_api.Models;

namespace task_manager_api.Controllers;

[Authorize]
[Route("api/[controller]")]
[ApiController]
public class UsersController(IHashPasswordService hashService, IUserRepository userRepo) : ControllerBase
{
    private readonly IHashPasswordService _hashService = hashService;
    private readonly IUserRepository _userRepo = userRepo;

    [HttpGet]
    public async Task<IActionResult> Get()
    {
        var users = await _userRepo.GetAll();
        return Ok(users.Select(u => u.ToDto()));
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var user = await _userRepo.GetById(id);
        if(user == null) return NotFound();

        return Ok(user.ToDto());
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateUserDto dto)
    {
        string pattern = @"^[^@\s]+@[^@\s]+\.[^@\s]+$";
        if(!Regex.IsMatch(dto.Email, pattern, RegexOptions.IgnoreCase))
        {
            return BadRequest(new { message = "Invalid email format" });
        }

        var existingUser = await _userRepo.GetByEmail(dto.Email);
        if (existingUser != null) return Conflict(new {message = "email already in use"});

        var user = new User
        {
            Email = dto.Email.ToLower(),
            PasswordHash = _hashService.HashPassword(dto.Password)
        };

        await _userRepo.Add(user);

        return CreatedAtAction(nameof(Get), new { id = user.Id }, user.ToDto());
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var user = await _userRepo.GetById(id);
        if (user == null) return NotFound();

        await _userRepo.Remove(user);

        return NoContent();
    }
}
