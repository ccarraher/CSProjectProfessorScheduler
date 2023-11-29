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
//importing logger for debugging purposes
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


@Service
public class AvailabilityService {

    private static final Logger logger = LoggerFactory.getLogger(AvailabilityService.class);
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

        logger.info("Processing availability for netID: {}", availabilityDTO.getNetID());
        try {
        String netId = availabilityDTO.getNetID();
        var timeSlots = availabilityDTO.getTimeSlots(); // Map of days to time slots
    
        // Check if netId already exists and delete existing records
        
        if (checkIfNetIdExists(netId)) {
            List<Availability> availabilities = availabilityRepository.findAvailabilities(netId);
            logger.info("all availabilities with netid: {}", netId);

            for (Availability availability : availabilities) {
                logger.info("Availability - NetID: {}, Day: {}, TimeSlot: {}", 
                            availability.getNetID(), availability.getDay(), availability.getTimeSlot());
            }

            logger.info("netID exists in database: {}", availabilityDTO.getNetID());
            deleteAllAvailabilitiesForNetID(netId);
        }
        else{
            logger.info("netI does not exist in database: {}", availabilityDTO.getNetID());
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

                logger.info("Saving availability object: {}", availability.toString());
                availabilityRepository.save(availability);
                logger.info("adding following day and timeslot for netid: {}", availability.getNetID());
                logger.info("day: {}", availability.getDay());
                logger.info("timeslot: {}", availability.getTimeSlot());
            }
        }
        } catch (Exception e) {
            logger.error("Error processing availabilities for netID: {}", availabilityDTO.getNetID(), e);
        }
        
    }
}
