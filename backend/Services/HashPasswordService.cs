using System.Security.Cryptography;
using task_manager_api.Interfaces;

namespace task_manager_api.Services;

public class HashPasswordService : IHashPasswordService
{
    private const int SaltSize = 16;
    private const int HashSize = 32;
    private const int Iterations = 210_000;

    public string HashPassword(string password)
    {
        byte[] salt = RandomNumberGenerator.GetBytes(SaltSize);

        using var pbkdf2 = new Rfc2898DeriveBytes(
            password,
            salt,
            Iterations,
            HashAlgorithmName.SHA256);

        byte[] hash = pbkdf2.GetBytes(HashSize);

        return $"{Iterations}:{Convert.ToBase64String(salt)}:{Convert.ToBase64String(hash)}";
    }

    public bool VerifyPassword(string password, string storedHash)
    {
        var parts = storedHash.Split(':');
        if (parts.Length != 3)
            return false;

        if (!int.TryParse(parts[0], out int iterations))
            return false;

        byte[] salt, hash;
        try
        {
            salt = Convert.FromBase64String(parts[1]);
            hash = Convert.FromBase64String(parts[2]);
        }
        catch
        {
            return false;
        }

        using var pbkdf2 = new Rfc2898DeriveBytes(
            password,
            salt,
            iterations,
            HashAlgorithmName.SHA256);

        byte[] computed = pbkdf2.GetBytes(hash.Length);

        return CryptographicOperations.FixedTimeEquals(computed, hash);
    }
}
