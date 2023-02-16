---
title: EntityFramework 流式配置接口
tags:
  - EntityFramework
  - CSharp
  - Fluent API
categories:
  - EntityFramework
date: 2023-02-16 15:51:25
---

fluent api 使得 ef 能`链式`配置。

```c#
public class SchoolDBContext: DbContext
{
  public DbSet<Student> Students { get; set; }
  public DbSet<Course> Courses { get; set; }
  public DbSet<StudentCourse> StudentCourses { get; set; }
  public DbSet<StudentAddress> StudentAddress { get; set; }

  protected override void OnConfiguring(DbContextOptionsBuilder builder)
  {
  }

  protected override void OnModelCreating(ModelBuilder builder)
  {
    // 字段
    builder.Entity<Student>().Property(s => s.Id).HasColumnName("Id").HasDefaultValue(0).IsRequired();

    // 索引
    builder.Entity<Student>().HasIndex(x => x.Name);

    // 初始数据（data-seeding）
    builder.Entity<Student>().HasData(new Student
    {
      Id = "0",
        Name = "小明",
    });

    // Student n : 1 Grade
    builder.Entity<Student>().HasOne<Grade>(s => s.Grade).WithMany(g => g.Students).HasForeignKey(s => s.GradeId);

    // Student 1 : 1 StudentAddress
    builder.Entity<Student>().HasOne<StudentAddress>(s => s.Address).WithOne(ad => ad.Student).HasForeignKey<StudentAddress>(ad => ad.StudentId);

    // n : n
    // Student 1 : n StudentCourse
    builder.Entity<StudentCourse>().HasOne<Student>(sc => sc.Student).WithMany(s => s.StudentCourses).HasForeignKey(sc => sc.StudentId);
    // Course 1 : n StudentCourse
    builder.Entity<StudentCourse>().HasOne<Course>(sc => sc.Course).WithMany(s => s.StudentCourses).HasForeignKey(sc => sc.CourseId);
  }
}
```
