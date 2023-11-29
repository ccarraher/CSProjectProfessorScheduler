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



@RestController
@RequestMapping("/availability")
public class AvailabilityController {

    @Autowired
    private AvailabilityService availabilityService;
    

    @PostMapping("/update")
    public ResponseEntity<?> handleAvailabilitySubmission(@RequestBody AvailabilityDto availabilityDTO) {
        availabilityService.processAndSaveAvailabilities(availabilityDTO);
        // error handling later on
        return ResponseEntity.ok("Response message: " + availabilityDTO);
    }
}
