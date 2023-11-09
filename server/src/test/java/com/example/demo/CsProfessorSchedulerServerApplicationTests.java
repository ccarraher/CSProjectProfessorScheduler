package com.example.demo;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import base.CsProfessorSchedulerServerApplication; //added

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT, classes = CsProfessorSchedulerServerApplication.class)
public class CsProfessorSchedulerServerApplicationTests {

	@Test
	void contextLoads() {
	}
}
