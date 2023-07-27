using Microsoft.EntityFrameworkCore;
using Models;

public partial class MariaDbContext : Microsoft.EntityFrameworkCore.DbContext
{
    public MariaDbContext(DbContextOptions<MariaDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<UserModel> User { get; set; }
}