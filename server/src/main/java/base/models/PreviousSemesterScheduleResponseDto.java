package base.models;

public class PreviousSemesterScheduleResponseDto {
    private CourseDetailDto[] previousSemesterSchedule;

    public PreviousSemesterScheduleResponseDto(CourseDetailDto[] previousSemesterSchedule) {
        this.previousSemesterSchedule = previousSemesterSchedule;
    }

    public CourseDetailDto[] getPreviousSemesterSchedule() {
        return this.previousSemesterSchedule;
    }

    public void setPreviousSemesterSchedule(CourseDetailDto[] previousSemesterSchedule) {
        this.previousSemesterSchedule = previousSemesterSchedule;
    }
}
