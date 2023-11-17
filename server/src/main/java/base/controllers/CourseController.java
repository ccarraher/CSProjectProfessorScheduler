package base.controllers;

import base.entities.Course;
import base.models.DeleteCoursePreferenceRequestDto;
import base.models.GetCoursePreferencesRequestDto;
import base.models.PreferencesRequestDto;
import base.services.CoursePreferenceService;
import base.services.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/course")
public class CourseController {
    private final CourseService courseService;
    private final CoursePreferenceService coursePreferenceService;

    @Autowired
    public CourseController(CourseService courseService, CoursePreferenceService coursePreferenceService) {
        this.courseService = courseService;
        this.coursePreferenceService = coursePreferenceService;
    }
    @GetMapping ("/get-courses")
    public List<Course> getAllCourses() {
        return courseService.getAllCourses();
    }
    @PostMapping("/submit-preferences")
    public String submitPreferences(@RequestBody PreferencesRequestDto preferencesRequestDto) {
        String netId = preferencesRequestDto.getNetId();
        List<Integer> selectedCourses = preferencesRequestDto.getSelectedCourses();

        if (netId != null && selectedCourses != null) {
            coursePreferenceService.savePreferences(netId, selectedCourses);
            return "Preferences Saved Successfully!";
        } else {
            return "Invalid request data";
        }
    }

    @PostMapping("/getCoursePreferences")
    public List<Course> getCoursePreferences(@RequestBody GetCoursePreferencesRequestDto requestDto) {
        String netId = requestDto.getNetId();
        return coursePreferenceService.getCoursePreferences(netId);
    }

    @PostMapping("/deleteCoursePreference")
    public ResponseEntity<String> deleteCoursePreference(@RequestBody DeleteCoursePreferenceRequestDto requestDto) {
        String netId = requestDto.getNetId();
        Integer courseId = requestDto.getCourseId();
        return coursePreferenceService.deleteCoursePreference(netId, courseId);
    }
}


