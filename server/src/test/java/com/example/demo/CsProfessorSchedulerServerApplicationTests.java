package com.example.demo;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import base.CsProfessorSchedulerServerApplication; //added

@SpringBootTest(classes = CsProfessorSchedulerServerApplication.class) //() added within parenthesis
public class CsProfessorSchedulerServerApplicationTests {

	@Test
	void contextLoads() {
	}
}
