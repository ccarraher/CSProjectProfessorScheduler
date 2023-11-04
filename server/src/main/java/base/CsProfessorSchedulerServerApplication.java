package base;

import base.models.Role;
import base.models.User;
import base.repositories.RoleRepository;
import base.repositories.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.HashSet;
import java.util.Set;

@SpringBootApplication
@Configuration
@EnableAutoConfiguration
@ComponentScan
public class CsProfessorSchedulerServerApplication {

	public static void main(String[] args) {
		SpringApplication.run(CsProfessorSchedulerServerApplication.class, args);
	}
}
