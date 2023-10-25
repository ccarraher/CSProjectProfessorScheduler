package com.example.accessingdatamysql;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity // This tells Hibernate to make a table out of this class
public class Course {
  @Id
  @GeneratedValue(strategy=GenerationType.AUTO)

  private String prefix;

  private String courseNumber;

  private String courseName;

  private String school;

  private String department;

  public String getCourseNumber() {
    return prefix + " " + courseNumber;
  }

  public void setPrefix(Integer prefix) {
    this.prefix = prefix;
  }

  public void setCourseNumber(String courseNumber) {
    this.courseNumber = courseNumber;
  }
  
  public String getCourseName() {
    return courseName;
  }

  public void setCourseName(String courseName) {
    this.courseName = courseName;
  }

  public String getSchool() {
    return school;
  }

  public void setSchool(String school) {
    this.school = school;
  }

  public String getDepartment() {
    return department;
  }

  public void setDepartment(String department) {
    this.department = department;
  }

}