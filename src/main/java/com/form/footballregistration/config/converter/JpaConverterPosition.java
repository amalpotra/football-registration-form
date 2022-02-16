package com.form.footballregistration.config.converter;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.form.footballregistration.entity.child.Position;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;
import java.io.IOException;
import java.util.Objects;

@Converter
public class JpaConverterPosition implements AttributeConverter<Position[], String> {
    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public String convertToDatabaseColumn(Position[] meta) {
        try {
            if (Objects.isNull(meta)) {
                return null;
            }
            return objectMapper.configure(SerializationFeature.WRITE_ENUMS_USING_INDEX,true).writeValueAsString(meta);
        } catch (JsonProcessingException ex) {
            return null;
        }
    }

    @Override
    public Position[] convertToEntityAttribute(String dbData) {
        try {
            if (Objects.isNull(dbData)) {
                return null;
            }
            return objectMapper.readValue(dbData, Position[].class);
        } catch (IOException ex) {
            return null;
        }
    }
}

