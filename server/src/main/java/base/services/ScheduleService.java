package base.services;

import base.models.CourseDetail;
import base.models.PreviousSemesterScheduleResponseDto;
import org.springframework.stereotype.Service;

import java.time.LocalTime;
import java.util.Arrays;
import java.util.Objects;

@Service
public class ScheduleService {
    public PreviousSemesterScheduleResponseDto getPreviousSemesterSchedule(String netId) {
        CourseDetail[] courseDetails = {
                new CourseDetail("CS 1337.001", "Computer Science I", LocalTime.of(11, 30), LocalTime.of(12, 45), new String[] {"Tuesday", "Thursday"}, "Chris Davis", "cid021000"),
                new CourseDetail("CS 1325.001", "Introduction to Programming", LocalTime.of(8, 30), LocalTime.of(9, 45), new String[] {"Tuesday", "Thursday"}, "Miguel Razo Razo", "mrazora"),
                new CourseDetail("CS 1325.002", "Introduction to Programming", LocalTime.of(16, 0), LocalTime.of(17, 15), new String[] {"Monday", "Wednesday"}, "Miguel Razo Razo", "mrazora"),
                new CourseDetail("CS 1325.003", "Introduction to Programming", LocalTime.of(14, 30), LocalTime.of(15, 45), new String[] {"Tuesday", "Thursday"}, "Miguel Razo Razo", "mrazora")
        };
        CourseDetail[] filteredByNetId = Arrays.stream(courseDetails).filter(x -> Objects.equals(x.getNetId(), netId)).toArray(CourseDetail[]::new);
        PreviousSemesterScheduleResponseDto response = new PreviousSemesterScheduleResponseDto(filteredByNetId);
        return response;
    }
}