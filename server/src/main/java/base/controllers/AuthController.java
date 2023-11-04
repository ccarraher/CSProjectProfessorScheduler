package base.controllers;

import base.models.LoginRequestDto;
import base.models.LoginResponseDto;
import base.models.RegistrationRequestDto;
import base.models.User;
import base.services.AuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")        // https://localhost:8080/auth/register
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class AuthController {
    @Autowired
    private AuthenticationService authenticationService;

    @PostMapping("/register")
    public User registerUser(@RequestBody RegistrationRequestDto body) {
        return authenticationService.registerUser(body.getUsername(), body.getPassword(), body.getFirstName(), body.getLastName());
    }

    @PostMapping("/login")
    public LoginResponseDto login(@RequestBody LoginRequestDto body) {
        return authenticationService.login(body.getUsername(), body.getPassword());
    }
}
