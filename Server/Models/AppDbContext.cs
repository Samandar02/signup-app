using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Server.Models;

public class AppDbContext:IdentityDbContext<UserIdentity>
{
    public AppDbContext(DbContextOptions<AppDbContext> options):base(options)
    {
        
    }
    
}
