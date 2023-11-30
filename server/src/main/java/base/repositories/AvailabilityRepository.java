package base.repositories;

import base.entities.Availability;
import jakarta.transaction.Transactional;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface AvailabilityRepository extends JpaRepository<Availability, Integer> {
    
    @Query(value = "SELECT * FROM availability a WHERE a.NetId = :NetId", nativeQuery = true)
    List<Availability> findAvailabilities(@Param("NetId") String NetId);

    
    boolean existsByNetID(@Param("NetID") String netId);

    @Modifying
    @Transactional
    void deleteByNetID(@Param("NetID")String netId);
   
    

}
