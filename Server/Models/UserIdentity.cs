using Microsoft.AspNetCore.Identity;
namespace Server.Models;
public class UserIdentity:IdentityUser
{
    [PersonalData]
    public string? Bio { get; set; }
    [PersonalData]
    public string? ImgUrl { get; set; }
}