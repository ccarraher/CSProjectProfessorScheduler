package base.repositories;

import base.entities.Course;
import base.entities.CoursePreference;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface CoursePreferenceRepository extends JpaRepository<CoursePreference, Integer> {
    @Query(value = "SELECT * FROM course_preferences cp WHERE cp.NetID = :NetID", nativeQuery = true)
    List<CoursePreference> findCoursePreferencesByNetId(@Param("NetID") String NetID);

    @Modifying
    @Transactional
    @Query(value = "DELETE FROM course_preferences cp WHERE cp.NetID = :NetID AND cp.CourseId = :CourseId", nativeQuery = true)
    int deleteCoursePreferenceByNetIdAndCourseId(@Param("NetID") String NetID, @Param("CourseId") Integer CourseId);
}
