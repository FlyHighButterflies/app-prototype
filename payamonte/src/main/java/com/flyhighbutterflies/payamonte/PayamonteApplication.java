package com.flyhighbutterflies.payamonte;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class PayamonteApplication {

	public static void main(String[] args) {
		SpringApplication.run(PayamonteApplication.class, args);
	}

}
