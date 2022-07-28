using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

public class AppDbContext:IdentityDbContext<IdUser>
{
    public AppDbContext(DbContextOptions options):base(options)
    {
        
    }
}
