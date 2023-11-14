package base.models;

import java.time.LocalTime;

public class CourseDetail {
    private String classNumber;
    private String className;
    private LocalTime startTime;
    private LocalTime endTime;
    private String[] days;
    private String netId;

    public CourseDetail(String classNumber, String className, LocalTime startTime, LocalTime endTime, String[] days, String netId) {
        this.classNumber = classNumber;
        this.className = className;
        this.startTime = startTime;
        this.endTime = endTime;
        this.days = days;
        this.netId = netId;
    }

    public String getClassNumber() {
        return classNumber;
    }

    public void setClassNumber(String classNumber) {
        this.classNumber = classNumber;
    }

    public String getClassName() {
        return className;
    }

    public void setClassName(String className) {
        this.className = className;
    }

    public LocalTime getStartTime() {
        return startTime;
    }

    public void setStartTime(LocalTime startTime) {
        this.startTime = startTime;
    }

    public LocalTime getEndTime() {
        return endTime;
    }

    public void setEndTime(LocalTime endTime) {
        this.endTime = endTime;
    }

    public String[] getDays() {
        return days;
    }

    public void setDays(String[] days) {
        this.days = days;
    }

    public String getNetId() {
        return netId;
    }

    public void setUserId(String netId) {
        this.netId = netId;
    }
}
