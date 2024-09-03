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

    private final int id;
    private final String name;
    private final String file;
    private final String description;

    private final List<InstrumentDto> instruments;
    private final List<GenreDto> genres;

}

