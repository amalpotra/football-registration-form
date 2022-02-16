package com.form.footballregistration.config.converter;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.form.footballregistration.entity.child.Address;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;
import java.io.IOException;
import java.util.Objects;

@Converter
public class JpaConverterAddress implements AttributeConverter<Address, String> {
    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public String convertToDatabaseColumn(Address meta) {
        try {
            if (Objects.isNull(meta)) {
                return null;
            }
            return objectMapper.writeValueAsString(meta);
        } catch (JsonProcessingException ex) {
            return null;
        }
    }

    @Override
    public Address convertToEntityAttribute(String dbData) {
        try {
            if (Objects.isNull(dbData)) {
                return null;
            }
            return objectMapper.readValue(dbData, Address.class);
        } catch (IOException ex) {
            return null;
        }
    }
}

