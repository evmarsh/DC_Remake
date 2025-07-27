using backend.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace backend.Data
{
    public class ApplicationContextDb : DbContext
    {
        protected readonly IConfiguration configuration;

        public ApplicationContextDb (IConfiguration configuration)
        {
            this.configuration = configuration;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder options)
        {
            options.UseNpgsql(configuration.GetConnectionString("default"));
        }

        public DbSet<PartyRequest> partyRequests { get; set; }
    }
}
