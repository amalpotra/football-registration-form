package com.form.footballregistration.config;

import com.form.footballregistration.entity.*;
import com.form.footballregistration.entity.child.Address;
import com.form.footballregistration.entity.child.AgeGroup;
import com.form.footballregistration.entity.child.Position;
import com.form.footballregistration.entity.child.Team;
import com.form.footballregistration.repository.FormRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class FormConfig {
    @Bean
    CommandLineRunner commandLineRunner(FormRepository formRepository) {
        return args -> {
            formRepository.save(new Form(
                    1,
                    "admin",
                    "Admin",
                    "Admin",
                    90,
                    1234567890,
                    "mail@admin.com",
                    AgeGroup.GROUP_21_30,
                    Team.CHELSEA,
                    new Position[] {Position.GOAL_KEEPER, Position.OFFENSIVE},
                    new Address(
                            "Lane 1, Street A",
                            123456,
                            90,
                            1,
                            1
                    )
            ));
        };
    }
}
