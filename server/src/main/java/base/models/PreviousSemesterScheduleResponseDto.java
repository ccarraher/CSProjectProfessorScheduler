package base.models;

public class PreviousSemesterScheduleResponseDto {
    private CourseDetail[] previousSemesterSchedule;

    public PreviousSemesterScheduleResponseDto(CourseDetail[] previousSemesterSchedule) {
        this.previousSemesterSchedule = previousSemesterSchedule;
    }

    public CourseDetail[] getPreviousSemesterSchedule() {
        return this.previousSemesterSchedule;
    }

    public void setPreviousSemesterSchedule(CourseDetail[] previousSemesterSchedule) {
        this.previousSemesterSchedule = previousSemesterSchedule;
    }
}
