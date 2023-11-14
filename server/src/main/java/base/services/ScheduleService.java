package base.services;

import base.models.*;
import base.repositories.AvailabilityRepository;
import base.repositories.CoursePreferenceRepository;
import base.repositories.CourseRepository;
import base.repositories.PreviousSemesterScheduleRepository;
import org.jetbrains.annotations.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
public class ScheduleService {
    @Autowired
    private PreviousSemesterScheduleRepository previousSemesterScheduleRepository;

    @Autowired
    private CourseRepository courseRepository;
    public PreviousSemesterScheduleResponseDto getPreviousSemesterSchedule(String netId) {
        List<PreviousSemesterSchedule> previousSemesterSchedule = previousSemesterScheduleRepository.findPreviousSemesterByNetId(netId);
        CourseDetail[] courseDetails = previousSemesterSchedule.stream().map(x -> {
            Course course = courseRepository.findById(x.getCourseId()).get();
            String classNumber = course.getPrefix() + " " + course.getCourseNumber() + "." + x.getSectionNumber();
            String[] timeParts = x.getTime().split(" - ");
            LocalTime startTime = parseTime(timeParts[0].replace("am", "AM").replace("pm", "PM"));
            LocalTime endTime = parseTime(timeParts[1].replace("am", "AM").replace("pm", "PM"));

            return new CourseDetail(classNumber, course.getCourseName(), startTime, endTime, x.getDays().split(", "), netId);
        }).toArray(CourseDetail[]::new);
        PreviousSemesterScheduleResponseDto response = new PreviousSemesterScheduleResponseDto(courseDetails);
        return response;
    }

    private static LocalTime parseTime(String time) {
        // Create a formatter for parsing time with am/pm
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("h:mma", Locale.ENGLISH);

        // Parse the time string
        return LocalTime.parse(time, formatter);
    }
}