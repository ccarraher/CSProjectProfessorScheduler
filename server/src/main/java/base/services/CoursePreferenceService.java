package base.services;

import base.entities.Course;
import base.entities.CoursePreference;
import base.models.GetCoursePreferencesRequestDto;
import base.repositories.CoursePreferenceRepository;
import base.repositories.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class CoursePreferenceService {

    private final CoursePreferenceRepository coursePreferenceRepository;
    private final CourseRepository courseRepository;

    @Autowired
    public CoursePreferenceService(CoursePreferenceRepository coursePreferenceRepository, CourseRepository courseRepository) {
        this.coursePreferenceRepository = coursePreferenceRepository;
        this.courseRepository = courseRepository;
    }

    public void savePreferences(String netId, List<Integer> selectedCourses) {
        for (Integer courseId : selectedCourses) {
            CoursePreference coursePreference = new CoursePreference();
            coursePreference.setNetId(netId);
            coursePreference.setCourseId(courseId);
            coursePreferenceRepository.save(coursePreference);
        }
    }

    public List<Course> getCoursePreferences(String netId) {
        List<Course> courses = courseRepository.findByNetId(netId);
        return courses;
    }

    public ResponseEntity<String> deleteCoursePreference(String NetID, Integer CourseId) {
        int deletedRows = coursePreferenceRepository.deleteCoursePreferenceByNetIdAndCourseId(NetID, CourseId);

        if (deletedRows > 0) {
            return ResponseEntity.ok("Deletion successful");
        } else {
            return ResponseEntity.badRequest().body("Deletion failed");
        }
    }
}
