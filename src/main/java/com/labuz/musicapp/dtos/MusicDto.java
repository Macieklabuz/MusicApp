package com.labuz.musicapp.dtos;

import com.labuz.musicapp.entities.*;
import lombok.Getter;

import java.util.ArrayList;
import java.util.List;

@Getter
public class MusicDto {

    private final int id;
    private final String name;
    private final String file;
    private final String description;
    private final int likes;
    private final List<UserDto> users;
    private final List<InstrumentDto> instruments;
    private final List<ArtistDto> artists;
    private final List<GenreDto> genres;
    private final AlbumDto album;


    public MusicDto(MusicEntity music) {
        this.id = music.getId();
        this.name = music.getName();
        this.file = music.getFile();
        this.description = music.getDescription();
        this.likes = music.countLikes();

        List<UserEntity> users = music.getUsers();
        this.users = users.stream().map(UserDto::new).toList();
        List<InstrumentEntity> instruments = music.getInstruments();
        this.instruments = instruments.stream().map(InstrumentDto::new).toList();
        List<GenreEntity> genres = music.getGenres();
        this.genres = genres.stream().map(GenreDto::new).toList();
        List<ArtistEntity> artists = music.getArtists();
        this.artists = artists.stream().map(ArtistDto::new).toList();
        AlbumEntity album = music.getAlbum();
        if(album != null) {
            this.album = new AlbumDto(album);
        }else{
            this.album = null;
        }
    }

}
