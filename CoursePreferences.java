package com.example.accessingdatamysql;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity // This tells Hibernate to make a table out of this class
public class CoursePreferences {
  @Id
  @GeneratedValue(strategy=GenerationType.AUTO)

  private String netID;

  private String prefix;

  private String courseNumber;

  public String getNetID() {
    return netID;
  }

  public void setNetID(String netID) {
    this.netID = netID;
  }

 public String getCourseNumber() {
    return prefix + " " + courseNumber;
  }

  public void setPrefix(Integer prefix) {
    this.prefix = prefix;
  }

  public void setCourseNumber(String courseNumber) {
    this.courseNumber = courseNumber;
  } 

}