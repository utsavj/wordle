using System.ComponentModel.DataAnnotations;

namespace Models
{
    public class UserModel
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        [Required]
        public string? EmailId { get; set; }
        [Required]
        public string? Password { get; set; }
        [Key]
        public string? GUID { get; set; }
    }
}