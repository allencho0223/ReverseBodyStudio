﻿// <auto-generated />
using System;
using API.RBS.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace API.RBS.Migrations
{
    [DbContext(typeof(DataContext))]
    partial class DataContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.1.1-rtm-30846");

            modelBuilder.Entity("API.RBS.Models.Experience", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Description");

                    b.Property<int>("InstructorId");

                    b.HasKey("Id");

                    b.HasIndex("InstructorId");

                    b.ToTable("Experiences");
                });

            modelBuilder.Entity("API.RBS.Models.Image", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Description");

                    b.Property<string>("ImageSrc");

                    b.Property<string>("Name");

                    b.Property<string>("Type");

                    b.HasKey("Id");

                    b.ToTable("Images");
                });

            modelBuilder.Entity("API.RBS.Models.Programme", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Description");

                    b.Property<string>("ProgrammeEnglishName");

                    b.Property<string>("ProgrammeName");

                    b.Property<string>("ProgrammeType");

                    b.HasKey("Id");

                    b.ToTable("Programmes");
                });

            modelBuilder.Entity("API.RBS.Models.Symptom", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("CustomerId");

                    b.Property<string>("Details");

                    b.Property<string>("SymptomName");

                    b.HasKey("Id");

                    b.HasIndex("CustomerId");

                    b.ToTable("Symptoms");
                });

            modelBuilder.Entity("API.RBS.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Discriminator")
                        .IsRequired();

                    b.Property<string>("ImagePath");

                    b.Property<string>("Name");

                    b.Property<byte[]>("PasswordHash");

                    b.Property<byte[]>("PasswordSalt");

                    b.Property<string>("UserName");

                    b.Property<string>("UserType");

                    b.HasKey("Id");

                    b.ToTable("Users");

                    b.HasDiscriminator<string>("Discriminator").HasValue("User");
                });

            modelBuilder.Entity("API.RBS.Models.Customer", b =>
                {
                    b.HasBaseType("API.RBS.Models.User");

                    b.Property<string>("Address");

                    b.Property<DateTime>("DateOfBirth");

                    b.Property<string>("Email");

                    b.Property<string>("Gender");

                    b.Property<int>("Height");

                    b.Property<int?>("InstructorId");

                    b.Property<string>("Phone");

                    b.Property<string>("Purpose");

                    b.Property<int>("Weight");

                    b.HasIndex("InstructorId");

                    b.ToTable("Customer");

                    b.HasDiscriminator().HasValue("Customer");
                });

            modelBuilder.Entity("API.RBS.Models.Instructor", b =>
                {
                    b.HasBaseType("API.RBS.Models.User");


                    b.ToTable("Instructor");

                    b.HasDiscriminator().HasValue("Instructor");
                });

            modelBuilder.Entity("API.RBS.Models.Experience", b =>
                {
                    b.HasOne("API.RBS.Models.Instructor", "Instructor")
                        .WithMany("Experiences")
                        .HasForeignKey("InstructorId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("API.RBS.Models.Symptom", b =>
                {
                    b.HasOne("API.RBS.Models.Customer", "Customer")
                        .WithMany("Symptoms")
                        .HasForeignKey("CustomerId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("API.RBS.Models.Customer", b =>
                {
                    b.HasOne("API.RBS.Models.Instructor", "Instructor")
                        .WithMany("Customers")
                        .HasForeignKey("InstructorId");
                });
#pragma warning restore 612, 618
        }
    }
}
