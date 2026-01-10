using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using task_manager_api.Interfaces;
using task_manager_api.Services;
using task_manager_api.Settings;

namespace task_manager_api.Extensions;

public static class ProgramJwtExtension
{
    public static IServiceCollection AddJwt(this IServiceCollection services, IConfiguration configuration)
    {
        var jwtSettings = configuration.GetSection(nameof(JwtSettings)).Get<JwtSettings>() ?? throw new InvalidOperationException("JwtSettings section is missing or invalid");
        services.AddSingleton(jwtSettings);
        services.AddScoped<IJwtService, JwtService>();

        services.AddAuthentication(options =>
        {
            options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
        })
        .AddJwtBearer(options =>
        {
            options.TokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,
                ValidIssuer = jwtSettings.Issuer,
                ValidAudience = jwtSettings.Audience,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings.Key!))
            };

            options.Events = new JwtBearerEvents
            {
                OnMessageReceived = context =>
                {
                    if (context.Request.Cookies.ContainsKey("Authorization"))
                    {
                        context.Token = context.Request.Cookies["Authorization"];
                    }
                    return Task.CompletedTask;
                }
            };
        });

        return services;
    }
}
