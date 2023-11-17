package base.repositories;

import base.entities.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CourseRepository extends JpaRepository<Course, Integer> {
    @Query(value = "SELECT DISTINCT c.* FROM course_preferences cp JOIN course c ON cp.CourseId = c.CourseId WHERE cp.NetID = :NetID", nativeQuery = true)
    List<Course> findByNetId(@Param("NetID") String NetID);
}
