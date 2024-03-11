using System.IdentityModel.Tokens.Jwt;
using System.Text.Json;
using Helpers;
using Models;
using MongoDB.Bson;
using MongoDB.Driver;

namespace Middleware;

public class AuthenticationMiddleware
{
    private readonly RequestDelegate _next;

    public AuthenticationMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task InvokeAsync(HttpContext context, UserHelper userHelper, JwtHelper jwtHelper)
    {
        bool isVerified = await VerifyUser(context, userHelper, jwtHelper);

        if (isVerified)
        {
            await _next(context);
        }
        else
        {
            throw new UnauthorizedAccessException();
        }
    }

    public async Task<bool> VerifyUser(HttpContext context, UserHelper userHelper, JwtHelper jwtHelper)
    {
        bool isAuthenticated = await AuthenticateUser(context, userHelper, jwtHelper);
        bool isAuthorized = AuthorizeUser(context, isAuthenticated);

        return isAuthorized;
    }

    public async Task<bool> AuthenticateUser(HttpContext context, UserHelper userHelper, JwtHelper jwtHelper)
    {
        string? jwtToken = context.Request.Cookies["access_token"];
        if(!string.IsNullOrEmpty(jwtToken) && jwtHelper.CheckTokenIsValid(jwtToken))
        {
            var token = new JwtSecurityTokenHandler().ReadJwtToken(jwtToken);
            var claim = token.Claims.First(c => c.Type == "id").Value;
            UserModel user = await userHelper.GetUserFromGUID(claim);
            if (string.IsNullOrEmpty(user.GUID))
            {
                return false;
            }

            return true;
        }

        return false;
    }

    public bool AuthorizeUser(HttpContext context, bool isAuthenticated)
    {
        if (isAuthenticated)
        {
            return true;
        }
        else
        {
            IMongoCollection<Routes> collection = MongoDBConnector.client.GetDatabase("Routes").GetCollection<Routes>("RestrictedRoutes");
            var routes = collection.Find(c => c.routeType == "allowedRoutes").FirstOrDefault();
            string endpoint = context.Request.Path;
            if (!routes.routes.Contains(endpoint))
            {
                return true;
            }

            return false;
        }
    }
}

public static class AuthenticationMiddlewareExtensions
{
    public static IApplicationBuilder UseAuthenticationMiddleware(
        this IApplicationBuilder builder)
    {
        return builder.UseMiddleware<AuthenticationMiddleware>();
    }
}