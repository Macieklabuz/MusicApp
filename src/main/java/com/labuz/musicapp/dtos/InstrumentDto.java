package com.labuz.musicapp.dtos;

import com.labuz.musicapp.entities.InstrumentEntity;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class InstrumentDto {

    private final long id;
    private final String name;
    private final String type;
    private final String description;

    public InstrumentDto(InstrumentEntity instrument) {
        this.id = instrument.getInstrumentId();
        this.name = instrument.getInstrumentName();
        this.type = instrument.getInstrumentType();
        this.description = instrument.getInstrumentDescription();
    }
}
