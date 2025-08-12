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

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Configure Hours -> TimeSlot relationships for each day
            modelBuilder.Entity<Hours>()
                .HasOne(h => h.Sunday)
                .WithMany()
                .HasForeignKey(h => h.SundayId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Hours>()
                .HasOne(h => h.Monday)
                .WithMany()
                .HasForeignKey(h => h.MondayId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Hours>()
                .HasOne(h => h.Tuesday)
                .WithMany()
                .HasForeignKey(h => h.TuesdayId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Hours>()
                .HasOne(h => h.Wednesday)
                .WithMany()
                .HasForeignKey(h => h.WednesdayId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Hours>()
                .HasOne(h => h.Thursday)
                .WithMany()
                .HasForeignKey(h => h.ThursdayId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Hours>()
                .HasOne(h => h.Friday)
                .WithMany()
                .HasForeignKey(h => h.FridayId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Hours>()
                .HasOne(h => h.Saturday)
                .WithMany()
                .HasForeignKey(h => h.SaturdayId)
                .OnDelete(DeleteBehavior.Restrict);
        }

        public DbSet<PartyRequest> partyRequests { get; set; }
		public DbSet<User> Users { get; set; }
        public DbSet<TimeSlot> TimeSlots { get; set; }
        public DbSet<Hours> Hours { get; set; }
	}
}
