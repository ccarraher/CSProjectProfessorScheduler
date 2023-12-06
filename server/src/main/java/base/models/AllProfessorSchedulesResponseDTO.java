package base.models;

import base.entities.Course;
import base.entities.PreviousSemesterSchedule;

import java.util.List;

public class AllProfessorSchedulesResponseDTO {
    private String firstName;
    private String lastName;
    private String netId;
    private Course course;

    private PreviousSemesterSchedule schedule;

    public AllProfessorSchedulesResponseDTO() {
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getNetId() {
        return netId;
    }

    public void setNetId(String netId) {
        this.netId = netId;
    }

    public Course getCourses() {
        return this.course;
    }

    public void setCourses(Course course) {
        this.course = course;
    }

    public PreviousSemesterSchedule getSchedule() {
        return schedule;
    }

    public void setSchedule(PreviousSemesterSchedule schedule) {
        this.schedule = schedule;
    }

    public AllProfessorSchedulesResponseDTO(String firstName, String lastName, String netId, Course course, PreviousSemesterSchedule schedule) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.netId = netId;
        this.course = course;
        this.schedule = schedule;
    }
}
