package base.controllers;

import base.models.*;
import base.services.ScheduleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/schedule")
@CrossOrigin
public class ScheduleController {
    @Autowired
    private ScheduleService scheduleService;

    @PostMapping("/previousSemesterSchedule")
    public PreviousSemesterScheduleResponseDto getPreviousSemesterSchedule(@RequestBody PreviousSemesterScheduleRequestDto request) {
        String netId = request.getNetId();
        return scheduleService.getPreviousSemesterSchedule(netId);
    }

    @GetMapping("/createSchedule")
	    public void createSchedule() {
	        scheduleService.createSchedule();
    }
}
