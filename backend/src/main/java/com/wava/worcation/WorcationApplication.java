package com.wava.worcation;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class WorcationApplication {

	public static void main(String[] args) {
		SpringApplication.run(WorcationApplication.class, args);
	}
/////
}
