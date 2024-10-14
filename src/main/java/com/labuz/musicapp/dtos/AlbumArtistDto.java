package com.labuz.musicapp.dtos;

import com.labuz.musicapp.entities.AlbumEntity;
import com.labuz.musicapp.entities.ArtistEntity;
import com.labuz.musicapp.entities.MusicEntity;
import lombok.Getter;

import java.util.ArrayList;
import java.util.List;

@Getter
public class AlbumArtistDto {
    private int id;
    private String name;
    private String description;
    private String image;
    private int date;
    List<ArtistDto> artists;
    List<MusicDto> music;

    public AlbumArtistDto(AlbumEntity album){
        this.id = album.getAlbumId();
        this.name = album.getAlbumName();
        this.description = album.getAlbumDescription();
        this.image = album.getAlbumImage();
        this.date = album.getAlbumDate();
        List<ArtistEntity> artists = album.getArtists();
        this.artists = artists.stream().map(ArtistDto::new).toList();
        List<MusicEntity> music = album.getMusic();
        this.music = music.stream().map(MusicDto::new).toList();
    }
}
