package com.form.footballregistration.repository;

import com.form.footballregistration.entity.Form;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FormRepository extends JpaRepository<Form, Long> {
    Form findByUserName(String userName);
}
