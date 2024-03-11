using Helpers;
using Microsoft.EntityFrameworkCore;
using Models;
public sealed class UserHelper
{
    private readonly MariaDbContext _dbContext;

    public UserHelper(MariaDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<int> Delete(int id)
    {
        try
        {
            _dbContext.User.Remove(
                new UserModel
                {
                    Id = id
                }
            );

            return await _dbContext.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            return 0;
        }
    }

    public async Task<List<UserModel>> FindAll()
    {
        return await _dbContext.User.ToListAsync();
    }

    public async Task<UserModel> GetUser(string EmailId)
    {
        return await _dbContext.User.FirstOrDefaultAsync(x => x.EmailId == EmailId);
    }

    public async Task<UserModel> GetUserFromGUID(string GUID)
    {
        return await _dbContext.User.FirstOrDefaultAsync(x => x.GUID == GUID);
    }

    public async Task<int> Insert(UserModel user)
    {
        _dbContext.Add(user);
        return await _dbContext.SaveChangesAsync();
    }

    public async Task<int> Update(UserModel user)
    {
        try
        {
            _dbContext.Update(user);
            return await _dbContext.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            return 0;
        }
    }

    public async Task CreateUser(UserModel user)
    {
        user.Password = HashingHelper.Hash(user.Password);
        await Insert(user);
        ScoringHelper _scoringHelper = new ScoringHelper();
        _scoringHelper.CreateScoreCollection(user.GUID);
    }

    public async Task<UserModel> Authenticate(UserModel claimedUser)
        {
            UserModel actualUser = new UserModel();
            actualUser = await GetUser(claimedUser.EmailId);

            if (actualUser.EmailId == claimedUser.EmailId
                && HashingHelper.Verify(claimedUser.Password, actualUser.Password))
            {
                return actualUser;
            }

            return null;
        }
}