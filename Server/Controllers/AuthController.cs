using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Server.Controllers;

[ApiController]
[Route("[controller]")]
public class AuthController : ControllerBase
{
    private readonly UserManager<IdUser> userManager;
    private readonly IConfiguration cofiguration;

    public AuthController(UserManager<IdUser> userManager, IConfiguration configuration)
    {
        this.userManager = userManager;
        this.cofiguration = configuration;
    }
    [Authorize]
    [HttpGet("me")]
    public async Task<ActionResult<IdUser>> Me([FromHeader] string id)
    {
        var user = await userManager.FindByIdAsync(id);

        return Ok(user);
    }
    [Authorize]
    [HttpPut("update")]
    public async Task<ActionResult<bool>> Update(CredentialAdditional credential)
    {

        var user = new IdUser()
        {
            Id = credential.Id,
            UserName = credential.UserName,
            Email = credential.Email,
            Bio = credential.Bio,
            ImgUrl = credential.ImgUrl,
            PhoneNumber = credential.PhoneNumber,
        };
        var token = await userManager.GeneratePasswordResetTokenAsync(user);

        var resultPassword = await userManager.ResetPasswordAsync(user, token, credential.Password);

        var result = await userManager.UpdateAsync(user);


        if (result.Succeeded && resultPassword.Succeeded)
            return Ok(new { updatedError = result.Errors, PasswordEreor = resultPassword.Errors });

        return Ok(false);
    }
    [HttpPost("up")]
    public async Task<ActionResult<bool>> Up(Credential credential)
    {
        var user = await userManager.FindByEmailAsync(credential.Email);
        if (user != null)
            return StatusCode(500, "The user aleready exist");
        var IdUser = new IdUser()
        {
            Email = credential.Email,
            UserName = credential.UserName
        };

        var result = await userManager.CreateAsync(IdUser, credential.Password);
        if (!result.Succeeded)
            return Ok(result.Errors);

        return Ok(true);
    }
    [HttpPost("in")]
    public async Task<ActionResult<string>> In(Credential credential)
    {
        SymmetricSecurityKey securityToken = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(cofiguration["JwtConfig:IssuerSigningKey"]));
        var user = await userManager.FindByEmailAsync(credential.Email);
        if (user != null && await userManager.CheckPasswordAsync(user, credential.Password))
        {
            var claims = new List<Claim>{
                new Claim(ClaimTypes.NameIdentifier,user.Id),
                new Claim(ClaimTypes.Email,user.Email),
            };
            var jwt = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddHours(3),
                signingCredentials: new SigningCredentials(securityToken, SecurityAlgorithms.HmacSha256));
            return new JwtSecurityTokenHandler().WriteToken(jwt);
        }
        return Unauthorized();
    }
}
