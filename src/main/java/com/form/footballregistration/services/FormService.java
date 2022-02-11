package com.form.footballregistration.services;

import com.form.footballregistration.entity.Form;
import com.form.footballregistration.exception.ResourceConflictException;
import com.form.footballregistration.exception.ResourceNotFoundException;
import com.form.footballregistration.repository.FormRepository;
import com.form.footballregistration.response.ResponseHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import javax.validation.Valid;
import java.util.Optional;

@Service
public class FormService {
    private final FormRepository formRepository;

    @Autowired
    public FormService(FormRepository formRepository) {
        this.formRepository = formRepository;
    }

    public ResponseEntity<?> getUser(@RequestParam String userName) {
        Optional<Form> formOptional = Optional.ofNullable(formRepository.findByUserName(userName));
        if (formOptional.isPresent()) {
            return ResponseEntity.ok(formOptional);
        }
        throw new ResourceNotFoundException("User not found!");
    }

    public ResponseEntity<?> registerUser(@RequestBody Form form) {
        Optional<Form> formOptional = Optional.ofNullable(formRepository.findByUserName(form.getUserName()));
        if (formOptional.isPresent()) {
            throw new ResourceConflictException("User already exists!");
        }
        formRepository.save(form);
        return ResponseHandler.generateResponse("Registered successfully!", HttpStatus.CREATED);
    }

    public ResponseEntity<?> updateUser(@RequestParam String userName, @RequestBody @Valid Form form) {
        Optional<Form> formOptional = Optional.ofNullable(formRepository.findByUserName(userName));
        if (formOptional.isPresent()) {
            formRepository.save(new Form(
                    formOptional.get().getId(),
                    userName,
                    form.getFirstName(),
                    form.getLastName(),
                    form.getCountryCode(),
                    form.getPhone(),
                    form.getEmail(),
                    form.getAgeGroup(),
                    form.getDesiredTeam(),
                    form.getDesiredPosition(),
                    form.getAddress()
            ));
            return ResponseHandler.generateResponse("Updated successfully!", HttpStatus.OK);
        }
        throw new ResourceNotFoundException("User not found!");
    }
}
