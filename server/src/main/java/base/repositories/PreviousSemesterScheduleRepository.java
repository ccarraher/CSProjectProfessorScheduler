package base.repositories;

import base.entities.PreviousSemesterSchedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PreviousSemesterScheduleRepository extends JpaRepository<PreviousSemesterSchedule, Integer> {
    @Query(value = "SELECT * FROM prev_schedule ps WHERE ps.InstructorId = :InstructorId", nativeQuery = true)
    List<PreviousSemesterSchedule> findPreviousSemesterByNetId(@Param("InstructorId") String InstructorId);
}
