using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Models;
using Newtonsoft.Json.Linq;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Text.Json;

namespace wordle_backend.Controllers
{
    [ApiController]
    [Route("user")]
    public class UserController : ControllerBase
    {
        private IConfiguration _config;
        private string JWTKey;
        private readonly ILogger<UserController> _logger;
        private readonly UserHelper _userHelper;

        public UserController(ILogger<UserController> logger, UserHelper userHelper, IConfiguration config)
        {
            _logger = logger;
            _userHelper = userHelper;
            _config = config;
            JWTKey = _config["Jwt:Key"];
        }

        [HttpGet("Users")]
        public async Task<ActionResult<UserModel>> GetAllUsers()
        {
            List<UserModel> result = await _userHelper.FindAll();
            return Ok(result);
        }

        [HttpPost("signup")]
        public async Task<IActionResult> CreateUser(UserModel user)
        {
            user.GUID = Guid.NewGuid().ToString();
            await _userHelper.Insert(user);
            var tokenString = BuildToken(user.GUID);
            return Ok(tokenString);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] UserModel claimedUser)
        {
            IActionResult response = Unauthorized();
            UserModel actualUser = await Authenticate(claimedUser);
            if (actualUser.GUID != null)
            {
                var tokenString = BuildToken(actualUser.GUID);
                response = Ok(new {token = tokenString, name = actualUser.Name});
            }
            return response;
        }

        [HttpGet("is-user-loggedin")]
        private IActionResult IsUserLoggedIn(string token)
        {
            return Ok(CheckTokenIsValid(token));
        }

        public static long GetTokenExpirationTime(string token)
        {
            var handler = new JwtSecurityTokenHandler();
            var jwtSecurityToken = handler.ReadJwtToken(token);
            var tokenExp = jwtSecurityToken.Claims.First(claim => claim.Type.Equals("exp")).Value;
            var ticks = long.Parse(tokenExp);
            return ticks;
        }

        public static bool CheckTokenIsValid(string token)
        {
            var tokenTicks = GetTokenExpirationTime(token);
            var tokenDate = DateTimeOffset.FromUnixTimeSeconds(tokenTicks).UtcDateTime;

            var now = DateTime.Now.ToUniversalTime();

            var valid = tokenDate >= now;

            return valid;
        }

        private string BuildToken(string userGuid)
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
        private async Task<UserModel> Authenticate(UserModel claimedUser)
        {
            UserModel actualUser = new UserModel();
            actualUser = await _userHelper.GetUser(claimedUser.EmailId);

            if (actualUser.EmailId == claimedUser.EmailId && actualUser.Password == claimedUser.Password)
            {
                return actualUser;
            }
            return null;
        }
    }
}