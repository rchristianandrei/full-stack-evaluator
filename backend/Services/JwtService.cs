using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using task_manager_api.Interfaces;
using task_manager_api.Models;
using task_manager_api.Settings;

namespace task_manager_api.Services
{
    public class JwtService(JwtSettings jwtSettings) : IJwtService
    {
        private readonly JwtSettings jwtSettings = jwtSettings;

        public string GenerateToken(User user)
        {
            var key = jwtSettings.Key;
            var issuer = jwtSettings.Issuer;
            var audience = jwtSettings.Audience;
            var expiration = jwtSettings.ExpireMinutes ?? "60";

            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key ?? throw new InvalidOperationException("Missing JWT Key")));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
                new Claim(JwtRegisteredClaimNames.Email, user.Email)
            };

            var token = new JwtSecurityToken(
                issuer: issuer,
                audience: audience,
                claims: claims,
                expires: DateTime.Now.AddMinutes(Double.Parse(expiration)),
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
