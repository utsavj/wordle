using Helpers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace wordle_backend.Controllers
{
    [ApiController]
    [Route("user")]
    public class UserController : ControllerBase
    {
        private IConfiguration _config;
        private string JWTKey;
        private readonly UserHelper _userHelper;
        private readonly JwtHelper _jwtHelper;

        public UserController(UserHelper userHelper, IConfiguration config)
        {
            _userHelper = userHelper;
            _config = config;
            _jwtHelper = new JwtHelper(userHelper, config);
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
            await _userHelper.CreateUser(user);
            var tokenString = _jwtHelper.BuildToken(user.GUID);
            HttpContext.Response.Cookies.Append("access_token", tokenString, new CookieOptions { HttpOnly = true });
            return Ok(new {name = user.Name});
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] UserModel claimedUser)
        {
            IActionResult response = Unauthorized();
            UserModel actualUser = await _userHelper.Authenticate(claimedUser);
            if (actualUser.GUID != null)
            {
                var tokenString = _jwtHelper.BuildToken(actualUser.GUID);
                HttpContext.Response.Cookies.Append("access_token", tokenString, new CookieOptions { HttpOnly = true });
                response = Ok(new {name = actualUser.Name});
            }

            return response;
        }

        [HttpGet("is-user-loggedin")]
        public async Task<IActionResult> IsUserLoggedIn()
        {
            string? jwtToken = HttpContext.Request.Cookies["access_token"];
            if(!string.IsNullOrEmpty(jwtToken) && _jwtHelper.CheckTokenIsValid(jwtToken))
            {
                var token = new JwtSecurityTokenHandler().ReadJwtToken(jwtToken);
                var claim = token.Claims.First(c => c.Type == "id").Value;
                UserModel user = await _userHelper.GetUserFromGUID(claim);
                return Ok(new {name = user.Name});
            }

            return Unauthorized();
        }

        [HttpGet("logout")]
        public IActionResult LogoutUser()
        {
            try
            {
                HttpContext.Response.Cookies.Append("access_token", string.Empty, new CookieOptions { HttpOnly = true });
            }
            catch
            {
                return ValidationProblem();
            }
           return Ok();
        }

        [HttpPost("score")]
        public IActionResult SaveScore()
        {
            ScoringHelper scoringHelper = new ScoringHelper();
            scoringHelper.SaveScore();
            return Ok();
        }
    }
}