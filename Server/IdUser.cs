using Microsoft.AspNetCore.Identity;

public class IdUser:IdentityUser
{
    public string? Bio { get; set; }
    public string? ImgUrl { get; set; }
}