using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Server.Controllers;

[ApiController]
[Route("[controller]")]
public class UploadController : ControllerBase
{

    private readonly IWebHostEnvironment _appEnvironment;

    public UploadController(IWebHostEnvironment appEnvironment)
    {
        _appEnvironment = appEnvironment;
    }
    
    [HttpPost]
    public async Task<string> Upload(IFormFile file)
    {
        string fileName;

        fileName = DateTime.Now.Ticks + file.FileName;
        var path = Path.Combine(_appEnvironment.WebRootPath,"UserPhotos", fileName);
        using (var stream = new FileStream(path, FileMode.Create))
        {
            await file.CopyToAsync(stream);
        }

        return fileName;
    }
}