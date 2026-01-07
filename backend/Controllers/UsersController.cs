using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using task_manager_api.Data;
using task_manager_api.DTOs;
using task_manager_api.Interfaces;
using task_manager_api.Mapper;
using task_manager_api.Models;

namespace task_manager_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController(ApplicationDbContext context, IHashPasswordService hashService) : ControllerBase
    {
        private readonly ApplicationDbContext _context = context;
        private readonly IHashPasswordService _hashService = hashService;

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var users = await _context.Users.ToListAsync();
            return Ok(users.Select(u => u.ToDto()));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if(user == null) return NotFound();

            return Ok(user.ToDto());
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateUserDto dto)
        {
            var existingUser = await _context.Users.SingleOrDefaultAsync(u => EF.Functions.ILike(u.Email, dto.Email));
            if (existingUser != null) return Conflict(new {message = "email already in use"});

            var user = new User
            {
                Email = dto.Email.ToLower(),
                PasswordHash = _hashService.HashPassword(dto.Password)
            };

            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(Get), new { id = user.Id }, user.ToDto());
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null) return NotFound();

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
