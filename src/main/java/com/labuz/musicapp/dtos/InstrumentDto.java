package com.labuz.musicapp.dtos;

import com.labuz.musicapp.entities.InstrumentEntity;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class InstrumentDto {

    private  long id;
    private String name;
    private String type;
    private String description;

    public InstrumentDto(InstrumentEntity instrument) {
        this.id = instrument.getInstrumentId();
        this.name = instrument.getInstrumentName();
        this.type = instrument.getInstrumentType();
        this.description = instrument.getInstrumentDescription();
    }
}
