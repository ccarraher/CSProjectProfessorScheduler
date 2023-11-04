package base.repositories;

import base.models.CoursePreference;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CoursePreferenceRepository extends JpaRepository<CoursePreference, Integer> {
    @Query(value = "SELECT * FROM course_preferences cp WHERE cp.NetID = :NetID", nativeQuery = true)
    List<CoursePreference> findCoursePreferencesByNetId(@Param("NetID") String NetID);
}
