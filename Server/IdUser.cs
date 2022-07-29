using Microsoft.AspNetCore.Identity;

public class IdUser:IdentityUser
{
    [PersonalData]
    public string? Bio { get; set; }
    [PersonalData]
    public string? ImgUrl { get; set; }
}