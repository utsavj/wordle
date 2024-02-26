using System.Security.Cryptography;

namespace Helpers;
public class HashingHelper
{
    private IConfiguration _config;
    private static readonly HashAlgorithmName _algorithm = HashAlgorithmName.SHA256;
    private int _keySize;
    private int _iterations;
    private int _saltSize;

    public HashingHelper()
    {
        _keySize = 32;
        _iterations = 50000;
        _saltSize = 16;
    }

    public static string Hash(string input)
    {
        HashingHelper hs = new HashingHelper();
        byte[] salt = RandomNumberGenerator.GetBytes(hs._saltSize);
        byte[] hash = Rfc2898DeriveBytes.Pbkdf2(
            input,
            salt,
            hs._iterations,
            _algorithm,
            hs._keySize
        );
        return string.Join(
            Miscellaneous.segmentDelimiter,
            Convert.ToHexString(hash),
            Convert.ToHexString(salt),
            hs._iterations,
            _algorithm
        );
    }

    public static bool Verify(string input, string hashString)
    {
        string[] segments = hashString.Split(Miscellaneous.segmentDelimiter);
        byte[] hash = Convert.FromHexString(segments[0]);
        byte[] salt = Convert.FromHexString(segments[1]);
        int iterations = int.Parse(segments[2]);
        HashAlgorithmName algorithm = new HashAlgorithmName(segments[3]);
        byte[] inputHash = Rfc2898DeriveBytes.Pbkdf2(
            input,
            salt,
            iterations,
            algorithm,
            hash.Length
        );
        return CryptographicOperations.FixedTimeEquals(inputHash, hash);
    }
}