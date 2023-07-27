using System.ComponentModel.DataAnnotations;

namespace Models
{
    public class UserModel
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string? Name { get; set; }
        [Required]
        public string? EmailId { get; set; }
        [Required]
        public string? Password { get; set; }
    }
}