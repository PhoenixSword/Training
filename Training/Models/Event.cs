using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace Training.Models
{
    public class Event
    {
        public string Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string CountLevels { get; set; }

        [ForeignKey("User")]
        public string TeacherId { get; set; }
        public virtual User Teacher { get; set; }

    }
}
