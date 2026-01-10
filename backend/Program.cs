using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using task_manager_api.Data;
using task_manager_api.Extensions;
using task_manager_api.Interfaces;
using task_manager_api.Repositories;
using task_manager_api.Services;
using task_manager_api.Settings;

DotNetEnv.Env.Load();

var builder = WebApplication.CreateBuilder(args);

// JWT
builder.Services.AddJwt(builder.Configuration);

// Services
builder.Services.AddScoped<IHashPasswordService, HashPasswordService>();
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<ITaskItemRepository, TaskItemRepository>();

// CORS
var allowedOrigins = builder.Configuration
    .GetSection("Cors:AllowedOrigins")
    .Get<string[]>();
builder.Services.AddCors(options =>
{
    options.AddPolicy("AppCorsPolicy", policy =>
    {
        policy
            .WithOrigins(allowedOrigins!)
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

var app = builder.Build();


if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AppCorsPolicy");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();

