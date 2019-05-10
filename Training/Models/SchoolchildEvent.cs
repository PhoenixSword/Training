using System;
using System.ComponentModel.DataAnnotations.Schema;
namespace Training.Models
{
    public class SchoolchildEvent
    {
        public string Id { get; set; }
        public int Score { get; set; }
        public DateTime Date { get; set; }

        [ForeignKey("Event")]
        public string EventId { get; set; }
        public virtual Event Event { get; set; }

        [ForeignKey("User")]
        public string UserId { get; set; }
        public virtual User User { get; set; }

    }
}
