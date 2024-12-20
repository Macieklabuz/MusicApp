package com.labuz.musicapp.dtos;

import com.labuz.musicapp.entities.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@AllArgsConstructor
@Setter
public class MusicFormDto {

    private long id;
    private String name;
    private String file;
    private String description;

    private List<InstrumentDto> instruments;
    private List<GenreDto> genres;

    public MusicFormDto() {

    }

}

