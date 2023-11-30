package base.services;

import base.models.LoginResponseDto;
import base.entities.Role;
import base.entities.User;
import base.repositories.RoleRepository;
import base.repositories.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


import java.util.HashSet;
import java.util.Set;

@Service
@Transactional
public class AuthenticationService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private TokenService tokenService;

    public User registerUser(String username, String password, String firstName, String lastName, boolean isAdmin) {
        String encodedPassword = passwordEncoder.encode(password);
        Role userRole = roleRepository.findByAuthority(isAdmin ? "ADMIN" : "USER").get();

        Set<Role> authorities = new HashSet<>();

        authorities.add(userRole);

        return userRepository.save(new User(username, encodedPassword, authorities, firstName, lastName, isAdmin ? "Admin" : "Instructor"));
    }

    public LoginResponseDto login(String username, String password) {
        try {
            Authentication auth = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));

            String token = tokenService.generateJwt(auth);
            User user = userRepository.findByUsername(username).get();
            return new LoginResponseDto(user.getUsername(), user.getFirstName(), user.getLastName(), user.getAuthorities(), token);
        } catch (AuthenticationException e) {
            return new LoginResponseDto(null, null, null, null, "");
        }
    }
}
