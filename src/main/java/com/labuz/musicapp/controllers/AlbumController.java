package com.labuz.musicapp.controllers;

import com.labuz.musicapp.dtos.AlbumArtistDto;
import com.labuz.musicapp.dtos.AlbumDto;
import com.labuz.musicapp.services.AlbumService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class AlbumController {

    AlbumService albumService;
    AlbumController(AlbumService albumService){
        this.albumService = albumService;
    }

    @GetMapping("/user/album")
    public List<AlbumDto> album(){
        return albumService.getAllAlbums();
    }


    @GetMapping("/user/album/artist")
    public List<AlbumArtistDto> albumArtist(){
        return albumService.getAllAlbumArtists();
    }
}
