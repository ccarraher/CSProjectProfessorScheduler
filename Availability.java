package com.example.accessingdatamysql;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity // This tells Hibernate to make a table out of this class
public class Availability {
  @Id
  @GeneratedValue(strategy=GenerationType.AUTO)

  private String netID;

  private String day;

  private String timeSlot;

  public String getNetID() {
    return netID;
  }

  public void setNetID(String netID) {
    this.netID = netID;
  }

 public String getTime() {
    return day + " " + timeSlot;
  }

  public void setDay(Integer day) {
    this.day = day;
  }

  public void setTimeSlot(String timeSlot) {
    this.timeSlot = timeSlot;
  } 

}