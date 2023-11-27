package base.models;

import base.entities.Course;
import base.entities.PreviousSemesterSchedule;

import java.util.List;

public class AllProfessorSchedulesResponseDTO {
    private String firstName;
    private String lastName;
    private String netId;
    private List<Course> courses;

    private List<PreviousSemesterSchedule> schedule;

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

    public List<Course> getCourses() {
        return courses;
    }

    public void setCourses(List<Course> courses) {
        this.courses = courses;
    }

    public List<PreviousSemesterSchedule> getSchedule() {
        return schedule;
    }

    public void setSchedule(List<PreviousSemesterSchedule> schedule) {
        this.schedule = schedule;
    }

    public AllProfessorSchedulesResponseDTO(String firstName, String lastName, String netId, List<Course> courses, List<PreviousSemesterSchedule> schedule) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.netId = netId;
        this.courses = courses;
        this.schedule = schedule;
    }
}
