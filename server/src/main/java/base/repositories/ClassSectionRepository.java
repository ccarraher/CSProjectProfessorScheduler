package base.repositories;

import base.models.ClassSection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClassSectionRepository extends JpaRepository<ClassSection, Integer> {

}
