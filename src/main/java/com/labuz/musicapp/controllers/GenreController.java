package com.labuz.musicapp.controllers;

import com.labuz.musicapp.dtos.GenreDto;
import com.labuz.musicapp.entities.GenreEntity;
import com.labuz.musicapp.entities.InstrumentEntity;
import com.labuz.musicapp.services.GenreService;
import com.labuz.musicapp.services.InstrumentService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class GenreController {

    GenreService genreService;
    GenreController(GenreService genreService) {
        this.genreService = genreService;
    }

    @GetMapping("/user/genre")
    public List<GenreDto> genre(){
        return genreService.getAllGenres();
    }
}
