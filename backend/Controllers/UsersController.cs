using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using task_manager_api.Data;
using task_manager_api.Models;

namespace task_manager_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController(ApplicationDbContext context) : ControllerBase
    {
        private readonly ApplicationDbContext _context = context;

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var tasks = await _context.Users.ToListAsync();
            return Ok(tasks);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if(user == null) return NotFound();

            return Ok(user);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] User user)
        {
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(Get), new { id = user.Id }, user);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] User updated)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null) return NotFound();

            //user = updated.Title;
            //user.IsDone = updated.IsDone;
            await _context.SaveChangesAsync();

            return Ok(user);
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
