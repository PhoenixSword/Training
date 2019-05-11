using System;

namespace Training.Models.ViewModel
{
    public class SchoolchildEventViewModel : Event
    {
        public bool Completed { get; set; }
        public int Score { get; set; }
        public string Date { get; set; }
    }
}
