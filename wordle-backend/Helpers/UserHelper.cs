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

    public async Task<UserModel> FindOne(int id)
    {
        return await _dbContext.User.FirstOrDefaultAsync(x => x.Id == id);
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
}