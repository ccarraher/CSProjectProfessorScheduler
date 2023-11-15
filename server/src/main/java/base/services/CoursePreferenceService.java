package base.services;

import base.models.CoursePreference;
import base.repositories.CoursePreferenceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class CoursePreferenceService {

    private final CoursePreferenceRepository coursePreferenceRepository;

    @Autowired
    public CoursePreferenceService(CoursePreferenceRepository coursePreferenceRepository) {
        this.coursePreferenceRepository = coursePreferenceRepository;
    }

    public void savePreferences(String netId, List<Integer> selectedCourses) {
        for (Integer courseId : selectedCourses) {
            CoursePreference coursePreference = new CoursePreference();
            coursePreference.setNetId(netId);
            coursePreference.setCourseId(courseId);
            // set CoursePreferenceId if not auto-generated
            // coursePreference.setCoursePreferenceId(...);
            coursePreferenceRepository.save(coursePreference);
        }
    }
}
