using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Server.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Server.Controllers;

[ApiController]
[Route("[controller]")]
public class AuthController : ControllerBase
{
    private readonly UserManager<UserIdentity> userManager;
    private readonly IConfiguration cofiguration;
    private readonly AppDbContext appDbContext;

    public AuthController(UserManager<UserIdentity> userManager, IConfiguration configuration, AppDbContext appDbContext)
    {
        this.userManager = userManager;
        this.cofiguration = configuration;
        this.appDbContext = appDbContext;
    }
    [HttpGet("{id}")]
    public async Task<ActionResult<UserIdentity>> Me([FromRoute] string id)
    {
        var user = await userManager.FindByIdAsync(id);
        return Ok(user);
    }
    
    [HttpPost("up")]
    public async Task<ActionResult<bool>> Up(CredentialSignUp credential)
    {
        var user = await userManager.FindByEmailAsync(credential.Email);
        if (user != null)
            return StatusCode(500, "The user aleready exist");
        var IdUser = new UserIdentity()
        {
            Email = credential.Email,
            UserName = credential.UserName,
            Bio = credential.Bio,
            PhoneNumber = credential.PhoneNumber
        };

        var result = await userManager.CreateAsync(IdUser, credential.Password);
        if (!result.Succeeded)
            return Ok(result.Errors);

        return Ok(true);
    }
    [HttpPost]
    public async Task<ActionResult<string>> In(CredentialSignIn credential)
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
    [HttpPut("{id}")]
    public async Task<ActionResult<bool>> Update([FromRoute] string id, CredentialVM credential)
    {
        if (id != credential.Id)
            return BadRequest();
        var user = await userManager.FindByIdAsync(id);
        user.UserName = credential.UserName;
        user.Email = credential.Email;
        user.Bio = credential.Bio;
        user.ImgUrl = credential.ImgUrl;
        user.PhoneNumber = credential.ImgUrl;
        appDbContext.Entry(user).State = EntityState.Modified;
        await appDbContext.SaveChangesAsync();

        return Ok(true);
    }
}
