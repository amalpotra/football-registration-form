package com.form.footballregistration.controller;

import com.form.footballregistration.entity.Form;
import com.form.footballregistration.service.FormService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Pattern;

@RestController
@RequestMapping("api/v1")
@Validated
public class FormController {

    private final FormService formService;

    @Autowired
    public FormController(FormService formService) {
        this.formService = formService;
    }

    @GetMapping("/form/{userName}")
    public ResponseEntity<?> getUser(@PathVariable("userName") @Pattern(regexp = "^[a-zA-Z]+$", message = "userName is invalid") String userName) {
        return formService.getUser(userName);
    }

    @PostMapping(value = "/form", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> registerUser(@Valid @RequestBody Form form) {
        return formService.registerUser(form);
    }

    @PutMapping(value = "/form/{userName}", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> updateUser(
            @PathVariable("userName") @Pattern(regexp = "^[a-zA-Z]+$",
                    message = "userName is invalid") String userName, @Valid @RequestBody Form form) {
        return formService.updateUser(userName, form);
    }
}
