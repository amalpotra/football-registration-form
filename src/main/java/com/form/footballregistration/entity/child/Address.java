package com.form.footballregistration.entity.child;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Range;
import org.jsoup.Jsoup;
import org.jsoup.safety.Safelist;

import javax.validation.constraints.NotNull;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Address {
    private String address;

    @Range(min = 100000, max = 999999, message = "pincode is invalid")
    private int pincode;

    @NotNull
    @Range(min = 1, max = 999, message = "country is invalid")
    private int country;

    @NotNull
    @Range(min = 1, max = 99, message = "state is invalid")
    private int state;

    @NotNull
    @Range(min = 1, max = 99, message = "city is invalid")
    private int city;

    public void setAddress(String address) {
        // Sanitize untrusted HTML
        this.address = Jsoup.clean(address, Safelist.basic());
    }
}
