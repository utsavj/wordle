using Microsoft.AspNetCore.Mvc;
using Models;

namespace wordle_backend.Controllers
{
    [ApiController]
    [Route("user")]
    public class UserController : ControllerBase
    {
        private readonly ILogger<UserController> _logger;
        private readonly UserHelper _userHelper;

        public UserController(ILogger<UserController> logger, UserHelper userHelper)
        {
            _logger = logger;
            _userHelper = userHelper;
        }

        [HttpGet("Users")]
        public async Task<ActionResult<UserModel>> GetAllUsers()
        {
            List<UserModel> result = await _userHelper.FindAll();
            return Ok(result);
        }

        [HttpPost("User")]
        public async Task<ActionResult> CreateUser(UserModel user)
        {
            await _userHelper.Insert(user);
            return Ok();
        }
    }
}