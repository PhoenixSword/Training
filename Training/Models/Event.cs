using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;

namespace Training.Models
{
    public class Event
    {
        public string Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Url { get; set; }
        [Required]
        public string CountLevels { get; set; }
        [JsonProperty]
        public string Settings { get; set; }

        [ForeignKey("User")]
        public string TeacherId { get; set; }
        public virtual User Teacher { get; set; }

    }
}
