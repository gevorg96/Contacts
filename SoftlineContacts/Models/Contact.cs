using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace SoftlineContacts
{
    public class Contact
    {
        [Key]
        public int Id { get; set; }
        public string Key { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public long Tel { get; set; }
        public string Email { get; set; }
    }
}
