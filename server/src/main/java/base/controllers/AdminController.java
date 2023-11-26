package base.controllers;

import base.models.AllProfessorSchedulesRequestDTO;
import base.models.AllProfessorSchedulesResponseDTO;
import base.services.ScheduleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/admin")
public class AdminController {
    @Autowired
    private ScheduleService scheduleService;

    @GetMapping("/allProfessorSchedules")
    public List<AllProfessorSchedulesResponseDTO> allProfessorSchedules() {
        return scheduleService.allProfessorsSchedules();
    }
}
