package com.labuz.musicapp.services;

import com.labuz.musicapp.entities.GenreEntity;
import com.labuz.musicapp.repositories.GenreRepository;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class GenreService {
    private final GenreRepository genreRepository;

    public GenreService(GenreRepository genreRepository) {
        this.genreRepository = genreRepository;
    }

    public List<GenreEntity> getAllGenres() {
        return genreRepository.findAll();
    }
}