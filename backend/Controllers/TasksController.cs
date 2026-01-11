using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using task_manager_api.Attribute;
using task_manager_api.DTOs;
using task_manager_api.Interfaces;
using task_manager_api.Mapper;
using task_manager_api.Models;
namespace task_manager_api.Controllers;

[ExtractUserData]
[Authorize]
[Route("api/[controller]")]
[ApiController]
public class TasksController(ITaskItemRepository taskItemRepo, IUserRepository userRepo) : ControllerBase
{
    private readonly ITaskItemRepository _taskItemRepo = taskItemRepo;
    private readonly IUserRepository _userRepo = userRepo;

    [HttpGet]
    public async Task<IActionResult> Get()
    {
        int userId = (int)(HttpContext.Items["UserId"] ?? 0);

        var tasks = await _taskItemRepo.GetAllByUserId(userId);
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
        int userId = (int)(HttpContext.Items["UserId"] ?? 0);

        var user = await _userRepo.GetById(userId);
        if (user == null) return NotFound();

        var task = new TaskItem
        {
            Title = dto.Title,
            Details = dto.Details,
            UserId = userId,
        };

        await _taskItemRepo.Add(task);

        return CreatedAtAction(nameof(Get), new { id = task.Id }, task.ToDto());
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, [FromBody] UpdateTaskItemDto updated)
    {
        int userId = (int)(HttpContext.Items["UserId"] ?? 0);

        var task = await _taskItemRepo.GetById(id);
        if (task == null) return NotFound();

        var user = await _userRepo.GetById(userId);
        if (user == null) return NotFound();

        task.Title = updated.Title;
        task.IsDone = updated.IsDone;

        await _taskItemRepo.SaveChanges();

        return Ok(task.ToDto());
    }

    [HttpPatch("{id}")]
    public async Task<IActionResult> Patch(int id, [FromBody] PatchTaskItemDto updated)
    {
        var task = await _taskItemRepo.GetById(id);
        if (task == null) return NotFound();

        if (updated.Title != null)
        {
            task.Title = updated.Title;
        }

        if (updated.IsDone != null)
        {
            task.IsDone = updated.IsDone.Value;
        }

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
