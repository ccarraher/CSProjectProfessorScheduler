package base.controllers;

import base.entities.User;
import base.models.AvailabilityDto;
import base.models.RegistrationRequestDto;
import base.services.AvailabilityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


@RestController
@RequestMapping("/availability")
public class AvailabilityController {


    private static final Logger logger = LoggerFactory.getLogger(AvailabilityService.class);

    @Autowired
    private AvailabilityService availabilityService;
    

    @PostMapping("/update")
    public ResponseEntity<?> handleAvailabilitySubmission(@RequestBody AvailabilityDto availabilityDTO) {
    try{
        availabilityService.processAndSaveAvailabilities(availabilityDTO);
    }
    catch(Exception e){
        logger.error("Error in controller: {}", availabilityDTO.getNetID(), e);
    }
    
    // error handling later on
    return ResponseEntity.ok("Response message: " + availabilityDTO);
}
}