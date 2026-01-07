using Microsoft.AspNetCore.Mvc;
using task_manager_api.DTOs;
using task_manager_api.Interfaces;
using task_manager_api.Mapper;
using task_manager_api.Models;
namespace task_manager_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TasksController(ITaskItemRepository taskItemRepo, IUserRepository userRepo) : ControllerBase
    {
        private readonly ITaskItemRepository _taskItemRepo = taskItemRepo;
        private readonly IUserRepository _userRepo = userRepo;

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var tasks = await _taskItemRepo.GetAll();
            return Ok(tasks.Select(t => t.ToDto()));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var task = await _taskItemRepo.GetByIdIncludeAll(id);

            if (task == null) return NotFound();

            return Ok(task.ToDtoIncludeAll());
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateTaskItemDto dto)
        {
            var user = await _userRepo.GetById(dto.UserId);
            if (user == null) return NotFound();

            var task = new TaskItem
            {
                Title = dto.Title,
                UserId = dto.UserId,
            };

            await _taskItemRepo.Add(task);

            return CreatedAtAction(nameof(Get), new { id = task.Id }, task.ToDto());
        }

        [HttpPut("{id}")] 
        public async Task<IActionResult> Update(int id, [FromBody] UpdateTaskItemDto updated)
        {
            var task = await _taskItemRepo.GetById(id);
            if (task == null) return NotFound();

            var user = await _userRepo.GetById(updated.UserId);
            if (user == null) return NotFound();

            task.Title = updated.Title;
            task.IsDone = updated.IsDone;
            task.UserId = updated.UserId;

            await _taskItemRepo.SaveChanges();

            return Ok(task.ToDto());
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var task = await _taskItemRepo.GetById(id);
            if (task == null) return NotFound();

            await _taskItemRepo.Remove(task);

            return NoContent();
        }
    }
}
