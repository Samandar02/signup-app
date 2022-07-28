namespace Server.Controllers
{
    public class Credential
    {
        public string? Id { get; set; }
        public string? Email { get; set; }
        public string? UserName { get; set; }
        public string? Password { get; set; }
    }
    public class CredentialAdditional:Credential
    {
        public string? Bio { get; set; }
        public string? ImgUrl { get; set; }
        public string? PhoneNumber { get; set; }
    }

}