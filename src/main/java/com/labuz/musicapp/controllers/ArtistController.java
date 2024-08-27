package com.labuz.musicapp.controllers;

import com.labuz.musicapp.dtos.ArtistDto;
import com.labuz.musicapp.entities.ArtistEntity;

import com.labuz.musicapp.services.ArtistService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ArtistController {

    ArtistService artistService;
    ArtistController(ArtistService artistService) {
        this.artistService = artistService;
    }

    @GetMapping("/user/artist")
    public List<ArtistDto> artist(){
        return artistService.getAllArtists();
    }
}
