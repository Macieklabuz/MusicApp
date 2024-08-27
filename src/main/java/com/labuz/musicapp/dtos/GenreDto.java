package com.labuz.musicapp.dtos;

import com.labuz.musicapp.entities.GenreEntity;
import com.labuz.musicapp.entities.MusicEntity;
import lombok.Getter;

@Getter
public class GenreDto {

    private final int id;
    private final String name;

    public GenreDto(GenreEntity genre) {
        this.id = genre.getGenreId();
        this.name = genre.getGenreName();

    }
}
