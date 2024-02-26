using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;

namespace Helpers;

public class JwtHelper
{
    private IConfiguration _config;
    private string JWTKey;
    private readonly UserHelper _userHelper;

    public JwtHelper(UserHelper userHelper, IConfiguration config)
    {
        _userHelper = userHelper;
        _config = config;
        JWTKey = _config["Jwt:Key"];
    }

    public bool CheckTokenIsValid(string token)
    {
        var tokenTicks = GetTokenExpirationTime(token);
        var tokenDate = DateTimeOffset.FromUnixTimeSeconds(tokenTicks).UtcDateTime;

        var now = DateTime.Now.ToUniversalTime();

        var valid = tokenDate >= now;

        return valid;
    }

    public long GetTokenExpirationTime(string token)
    {
        var handler = new JwtSecurityTokenHandler();
        var jwtSecurityToken = handler.ReadJwtToken(token);
        var tokenExp = jwtSecurityToken.Claims.First(claim => claim.Type.Equals("exp")).Value;
        var ticks = long.Parse(tokenExp);
        return ticks;
    }

    public string BuildToken(string userGuid)
    {
        SecurityKey key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(JWTKey));
        var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
        var claims = new[]
        {
            new Claim("id",userGuid)
        };
        var token = new JwtSecurityToken(_config["Jwt:Issuer"],
            _config["Jwt:Audience"],
            claims,
            expires: DateTime.Now.AddMinutes(15),
            signingCredentials: credentials);


        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}