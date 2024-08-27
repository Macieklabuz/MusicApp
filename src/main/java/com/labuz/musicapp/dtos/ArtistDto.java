package com.labuz.musicapp.dtos;

import com.labuz.musicapp.entities.ArtistEntity;
import com.labuz.musicapp.entities.MusicEntity;
import lombok.Getter;

@Getter
public class ArtistDto {

    private final int id;
    private final String name;
    private final String description;

    public ArtistDto(ArtistEntity artist) {
        this.id = artist.getArtistId();
        this.name = artist.getArtistName();
        this.description = artist.getArtistDescription();
    }
}
