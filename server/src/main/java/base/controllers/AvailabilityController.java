package base.controllers;

import base.models.Availability;
import base.services.AvailabilityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/availability")
public class AvailabilityController {

    private final AvailabilityService availabilityService;

    @Autowired
    public AvailabilityController(AvailabilityService availabilityService) {
        this.availabilityService = availabilityService;
    }


    // will be updating this soon
    // @PostMapping("/save-preferences")
   // public ResponseEntity<String> savePreferences(@RequestBody List<Long> courseIds) {
    //    String responseMessage = availabilityService.savePreferences(courseIds);

    //    return new ResponseEntity<>(responseMessage, HttpStatus.OK);
   // }
}
