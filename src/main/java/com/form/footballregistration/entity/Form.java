package com.form.footballregistration.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.form.footballregistration.config.converter.JpaConverterAddress;
import com.form.footballregistration.config.converter.JpaConverterPosition;
import com.form.footballregistration.entity.child.Address;
import com.form.footballregistration.entity.child.AgeGroup;
import com.form.footballregistration.entity.child.Position;
import com.form.footballregistration.entity.child.Team;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Range;

import javax.persistence.*;
import javax.validation.Valid;
import javax.validation.constraints.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Form {
    @Id
    @GeneratedValue
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private long id;

    @NotBlank(message = "userName is required")
    @Pattern(
            regexp = "^[a-zA-Z]+$",
            message = "userName is invalid"
    )
    @Column(updatable = false)
    private String userName;

    @NotBlank(message = "firstName is required")
    @Pattern(
            regexp = "^[a-zA-Z]+$",
            message = "firstName is invalid"
    )
    private String firstName;

    @Pattern(
            regexp = "^[a-zA-Z\\s]*$",
            message = "lastName is invalid"
    )
    private String lastName;

    @NotNull(message = "countryCode is required")
    @Range(min = 1, max = 999, message = "countryCode is invalid")
    private int countryCode;

    @NotNull(message = "phone is required")
    @Range(min = 1000000000L, max = 9999999999L, message = "phone is invalid")
    private long phone;

    @NotNull(message = "email is required")
    @Email(message = "email is invalid")
    private String email;

    @NotNull(message = "ageGroup is required")
    private AgeGroup ageGroup;

    @NotNull(message = "desiredTeam is required")
    private Team desiredTeam;

    @Convert(converter = JpaConverterPosition.class)
    @Size(min = 1, max = 4, message = "desiredPosition must be between 1 and 4")
    private Position[] desiredPosition;

    @Convert(converter = JpaConverterAddress.class)
    @NotNull(message = "address is required")
    @Valid
    private Address address;
}
