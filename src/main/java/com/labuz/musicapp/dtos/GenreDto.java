package com.labuz.musicapp.dtos;

import com.labuz.musicapp.entities.GenreEntity;
import com.labuz.musicapp.entities.MusicEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class GenreDto {

    private final long id;
    private final String name;

    public GenreDto(GenreEntity genre) {
        this.id = genre.getGenreId();
        this.name = genre.getGenreName();

    }
}
