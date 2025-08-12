using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class hours : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "TimeSlots",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    OpenTime = table.Column<string>(type: "text", nullable: false),
                    CloseTime = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TimeSlots", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Hours",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false),
                    SundayId = table.Column<int>(type: "integer", nullable: false),
                    MondayId = table.Column<int>(type: "integer", nullable: false),
                    TuesdayId = table.Column<int>(type: "integer", nullable: false),
                    WednesdayId = table.Column<int>(type: "integer", nullable: false),
                    ThursdayId = table.Column<int>(type: "integer", nullable: false),
                    FridayId = table.Column<int>(type: "integer", nullable: false),
                    SaturdayId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Hours", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Hours_TimeSlots_FridayId",
                        column: x => x.FridayId,
                        principalTable: "TimeSlots",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Hours_TimeSlots_MondayId",
                        column: x => x.MondayId,
                        principalTable: "TimeSlots",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Hours_TimeSlots_SaturdayId",
                        column: x => x.SaturdayId,
                        principalTable: "TimeSlots",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Hours_TimeSlots_SundayId",
                        column: x => x.SundayId,
                        principalTable: "TimeSlots",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Hours_TimeSlots_ThursdayId",
                        column: x => x.ThursdayId,
                        principalTable: "TimeSlots",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Hours_TimeSlots_TuesdayId",
                        column: x => x.TuesdayId,
                        principalTable: "TimeSlots",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Hours_TimeSlots_WednesdayId",
                        column: x => x.WednesdayId,
                        principalTable: "TimeSlots",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Hours_FridayId",
                table: "Hours",
                column: "FridayId");

            migrationBuilder.CreateIndex(
                name: "IX_Hours_MondayId",
                table: "Hours",
                column: "MondayId");

            migrationBuilder.CreateIndex(
                name: "IX_Hours_SaturdayId",
                table: "Hours",
                column: "SaturdayId");

            migrationBuilder.CreateIndex(
                name: "IX_Hours_SundayId",
                table: "Hours",
                column: "SundayId");

            migrationBuilder.CreateIndex(
                name: "IX_Hours_ThursdayId",
                table: "Hours",
                column: "ThursdayId");

            migrationBuilder.CreateIndex(
                name: "IX_Hours_TuesdayId",
                table: "Hours",
                column: "TuesdayId");

            migrationBuilder.CreateIndex(
                name: "IX_Hours_WednesdayId",
                table: "Hours",
                column: "WednesdayId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Hours");

            migrationBuilder.DropTable(
                name: "TimeSlots");
        }
    }
}
