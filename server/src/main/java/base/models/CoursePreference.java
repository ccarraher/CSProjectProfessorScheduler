package base.models;

import jakarta.persistence.*;

@Entity
@Table(name = "course_preferences")
public class CoursePreference {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "CoursePreferenceId")
    public Integer coursePreferenceId;

    @Column(name = "NetID")
    public String netId;

    @Column(name = "CourseId")
    public Integer courseId;

    public Integer getCoursePreferenceId() {
        return coursePreferenceId;
    }

    public void setCoursePreferenceId(Integer coursePreferenceId) {
        this.coursePreferenceId = coursePreferenceId;
    }

    public Integer getCourseId() {
        return courseId;
    }

    public void setCourseId(Integer courseId) {
        this.courseId = courseId;
    }

    public String getNetId() {
        return netId;
    }

    public void setNetId(String netId) {
        this.netId = netId;
    }

    @Override
    public String toString() {
        return "Course Preference: netId = " + getNetId() + " courseId = " + getCourseId();
    }
}
