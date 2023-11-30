package base.models;

import jakarta.persistence.*;

@Entity
@Table(name = "class_section")
public class ClassSection {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ClassNumber")
    private Integer classNumber;

    @Column(name = "CourseId")
    private Integer courseId;

    @Column(name = "SectionNumber")
    private String sectionNumber;

    @Column(name = "InstructorID")
    private String instructorID;

    @Column(name = "Days")
    private String days;

    @Column(name = "Time")
    private String time;

    // Getters and setters

    public Integer getClassNumber() {
        return classNumber;
    }

    public void setClassNumber(Integer classNumber) {
        this.classNumber = classNumber;
    }

    public Integer getCourseId() {
        return courseId;
    }

    public void setCourseId(Integer courseId) {
        this.courseId = courseId;
    }

    public String getSectionNumber() {
        return sectionNumber;
    }

    public void setSectionNumber(String sectionNumber) {
        this.sectionNumber = sectionNumber;
    }

    public String getInstructorID() {
        return instructorID;
    }

    public void setInstructorID(String instructorID) {
        this.instructorID = instructorID;
    }

    public String getDays() {
        return days;
    }

    public void setDays(String days) {
        this.days = days;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }
}
