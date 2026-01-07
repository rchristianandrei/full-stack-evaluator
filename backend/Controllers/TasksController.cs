using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using task_manager_api.Data;
using task_manager_api.DTOs;
using task_manager_api.Mapper;
using task_manager_api.Models;
namespace task_manager_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TasksController(ApplicationDbContext context) : ControllerBase
    {
        private readonly ApplicationDbContext _context = context;

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            
            var tasks = await _context.Tasks.ToListAsync();
            return Ok(tasks.Select(t => t.ToDto()));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var task = await _context.Tasks.Include(t => t.User).FirstOrDefaultAsync(t => t.Id == id);

            if (task == null) return NotFound();

            return Ok(task.ToDtoIncludeAll());
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateTaskItemDto dto)
        {
            var user = await _context.Users.FindAsync(dto.UserId);
            if (user == null) return NotFound();

            var task = new TaskItem
            {
                Title = dto.Title,
                UserId = dto.UserId,
            };
            _context.Tasks.Add(task);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(Get), new { id = task.Id }, task.ToDto());
        }

        [HttpPut("{id}")] 
        public async Task<IActionResult> Update(int id, [FromBody] UpdateTaskItemDto updated)
        {
            var task = await _context.Tasks.FindAsync(id);
            if (task == null) return NotFound();

            var user = await _context.Users.FindAsync(updated.UserId);
            if (user == null) return NotFound();

            task.Title = updated.Title;
            task.IsDone = updated.IsDone;
            task.UserId = updated.UserId;
            await _context.SaveChangesAsync();

            return Ok(task.ToDto());
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var task = await _context.Tasks.FindAsync(id);
            if (task == null) return NotFound();

            _context.Tasks.Remove(task);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
