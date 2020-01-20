using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SoftlineContacts.Models;

namespace SoftlineContacts.Controllers
{
    [Route("api/[controller]")]
    public class ContactsController : Controller
    {
        private readonly ContactsDbContext _db;

        public ContactsController(ContactsDbContext db)
        {
            _db = db;
        }

        [HttpGet]
        public IEnumerable<Contact> Get()
        {
            return _db.Contacts.ToList();
        }

        [HttpGet("{id}")]
        public async Task<Contact> Get(int id)
        {
            return await _db.Contacts.FirstOrDefaultAsync(p => p.Id == id);
        }

        [HttpPost]
        public async Task<IActionResult> Post(Contact contact)
        {
            try
            {
                if (_db.Contacts.FirstOrDefault() != null)
                {
                    var cont = await _db.Contacts.FirstOrDefaultAsync(p => p.Key == contact.Key);
                    if (cont != null)
                    {
                        return BadRequest();
                    }
                }

                await _db.Contacts.AddAsync(contact);
                await _db.SaveChangesAsync();
                return Ok();
            }
            catch
            {
                throw;
            }
        }

        [HttpPut]
        public async Task<IActionResult> Put(Contact contact)
        {
            try
            {
                var cont = _db.Contacts.Where(p => p.Key == contact.Key).ToList();
                if (cont != null && cont.Count > 0 && cont.Any(p => p.Id != contact.Id))
                {
                    return BadRequest();
                }
                _db.Contacts.Update(contact);
                await _db.SaveChangesAsync();
                return Ok();
            }
            catch  
            {
                throw;
            }
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var contact = await _db.Contacts.FirstOrDefaultAsync(p => p.Id == id);
                _db.Contacts.Remove(contact);
                await _db.SaveChangesAsync();
                return Ok();
            }
            catch
            {
                throw;
            }
        }

    }
}