namespace Server.Models
{
    public class CredentialSignIn
    {
        public string? Email { get; set; }
        public string? Password { get; set; }
    }
    public class CredentialSignUp:CredentialSignIn
    {
        public string? UserName { get; set; }
        public string? Bio { get; set; }
        public string? PhoneNumber { get; set; }
    }
    public class CredentialVM:CredentialSignUp
    {
        public string? ImgUrl { get; set; }
        public string? Id { get; set; }
    }

}