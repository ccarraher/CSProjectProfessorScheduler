package base.services;

import base.entities.Course;
import base.entities.CoursePreference;
import base.entities.PreviousSemesterSchedule;
import base.entities.User;
import base.models.*;
import base.repositories.CoursePreferenceRepository;
import base.repositories.CourseRepository;
import base.repositories.PreviousSemesterScheduleRepository;
import base.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class ScheduleService {
    @Autowired
    private PreviousSemesterScheduleRepository previousSemesterScheduleRepository;

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private UserRepository userRepository;

    public PreviousSemesterScheduleResponseDto getPreviousSemesterSchedule(String netId) {
        List<PreviousSemesterSchedule> previousSemesterSchedule = previousSemesterScheduleRepository.findPreviousSemesterByNetId(netId);
        CourseDetailDto[] courseDetails = previousSemesterSchedule.stream().map(x -> {
            Course course = courseRepository.findById(x.getCourseId()).get();
            String classNumber = course.getPrefix() + " " + course.getCourseNumber() + "." + x.getSectionNumber();
            String[] timeParts = x.getTime().split(" - ");
            LocalTime startTime = parseTime(timeParts[0].replace("am", "AM").replace("pm", "PM"));
            LocalTime endTime = parseTime(timeParts[1].replace("am", "AM").replace("pm", "PM"));

            return new CourseDetailDto(classNumber, course.getCourseName(), startTime, endTime, x.getDays().split(", "), netId);
        }).toArray(CourseDetailDto[]::new);
        PreviousSemesterScheduleResponseDto response = new PreviousSemesterScheduleResponseDto(courseDetails);
        return response;
    }

    public List<AllProfessorSchedulesResponseDTO> allProfessorsSchedules() {
        List<PreviousSemesterSchedule> previousSemesterSchedule = previousSemesterScheduleRepository.findAll();
        Map<String, List<PreviousSemesterSchedule>> groupedByInstructor = previousSemesterSchedule.stream()
                .filter(schedule -> schedule.getInstructorId() != null)
                .collect(Collectors.groupingBy(PreviousSemesterSchedule::getInstructorId));
        return groupedByInstructor.entrySet().stream().map(entry -> {
            String netId = entry.getKey();
            List<PreviousSemesterSchedule> schedule = entry.getValue();
            List<Course> courses = courseRepository.findByNetId(netId);
            User user = userRepository.findByUsername(netId).get();

            return new AllProfessorSchedulesResponseDTO(user != null ? user.getFirstName() : null, user != null ? user.getLastName() : null, netId, courses, schedule);
        }).collect(Collectors.toList());
    }

    private static LocalTime parseTime(String time) {
        // Create a formatter for parsing time with am/pm
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("h:mma", Locale.ENGLISH);

        // Parse the time string
        return LocalTime.parse(time, formatter);
    }
}