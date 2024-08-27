package com.labuz.musicapp.dtos;

import com.labuz.musicapp.entities.AlbumEntity;
import lombok.Getter;

@Getter
public class AlbumDto {
    private int id;
    private String name;
    private String description;
    private String image;
    private int date;

    public AlbumDto(AlbumEntity album){
        this.id = album.getAlbumId();
        this.name = album.getAlbumName();
        this.description = album.getAlbumDescription();
        this.image = album.getAlbumImage();
        this.date = album.getAlbumDate();
    }
}
