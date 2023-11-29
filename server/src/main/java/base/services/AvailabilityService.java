// AvailabilityService.java
package base.services;

import base.entities.Availability;
import base.repositories.AvailabilityRepository;
import jakarta.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Service;
import base.models.AvailabilityDto;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;



@Service
public class AvailabilityService {

    private final AvailabilityRepository availabilityRepository;

    @Autowired
    public AvailabilityService(AvailabilityRepository availabilityRepository) {
        this.availabilityRepository = availabilityRepository;
    }

   
    public boolean checkIfNetIdExists(String netId) {
        return availabilityRepository.existsByNetID(netId);
    }

    
    public void deleteAllAvailabilitiesForNetID(String netId) {
        availabilityRepository.deleteByNetID(netId);
    }
    

    @Modifying
    @Transactional
    public void processAndSaveAvailabilities(AvailabilityDto availabilityDTO) {

      
        String netId = availabilityDTO.getNetID();
        var timeSlots = availabilityDTO.getTimeSlots(); // Map of days to time slots
    
        // Check if netId already exists and delete existing records
        if (checkIfNetIdExists(netId)) {
            deleteAllAvailabilitiesForNetID(netId);
        }
        
        
    
        // Convert each entry in the Map to Availability entities
        for (Map.Entry<String, List<String>> entry : timeSlots.entrySet()) {
            String day = entry.getKey();
            List<String> slots = entry.getValue();
    
            for (String slot : slots) {
                Availability availability = new Availability();
                availability.setNetID(netId);
                availability.setDay(day);
                availability.setTimeSlot(slot);
                availabilityRepository.save(availability);

              
            }
        }
       
        
    }
}
