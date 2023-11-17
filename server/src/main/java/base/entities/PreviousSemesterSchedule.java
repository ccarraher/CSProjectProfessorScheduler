package base.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "prev_schedule")
public class PreviousSemesterSchedule {
   @Id
   @Column(name = "ClassNumber")
   private Integer classNumber;

   @Column(name = "CourseId")
   private Integer courseId;

   @Column(name = "SectionNumber")
   private String sectionNumber;

   @Column(name = "InstructorId")
   private String instructorId;

   @Column(name = "Days")
   private String days;

   @Column(name = "Time")
   private String time;

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

    public String getInstructorId() {
        return instructorId;
    }

    public void setInstructorId(String instructorId) {
        this.instructorId = instructorId;
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

    @Override
    public String toString() {
        return "Previous Semester: NetID = " + getInstructorId() + " courseId = " + getCourseId() + " days = " + getDays() + " times = " + getTime();
    }
}
