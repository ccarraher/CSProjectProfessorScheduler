// AvailabilityService.java
package base.services;

import base.entities.Availability;
import base.repositories.AvailabilityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AvailabilityService {

    private final AvailabilityRepository availabilityRepository;

    @Autowired
    public AvailabilityService(AvailabilityRepository availabilityRepository) {
        this.availabilityRepository = availabilityRepository;
    }

    public List<Availability> getAllAvailability() {
        return availabilityRepository.findAll();
    }
}
    // will be updating this soon
    //public String savePreferences(List<Long> courseIds) {
        //Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        //String netID = authentication.getName();

        // availabilityRepository.savePreferences(netID, courseIds);
        // return "Preferences saved successfully";
    //}
//}
