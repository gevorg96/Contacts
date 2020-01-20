using Microsoft.EntityFrameworkCore;

namespace SoftlineContacts.Models
{
    public class ContactsDbContext: DbContext
    {
        public ContactsDbContext(DbContextOptions<ContactsDbContext> options) : base(options)
        {
            Database.EnsureCreated();            
        }

        public DbSet<Contact> Contacts { get; set; }
    }
}
