package com.labuz.musicapp.services;

import com.labuz.musicapp.entities.ArtistEntity;
import com.labuz.musicapp.repositories.ArtistRepository;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class ArtistService {
    private final ArtistRepository artistRepository;

    public ArtistService(ArtistRepository artistRepository) {
        this.artistRepository = artistRepository;
    }

    public List<ArtistEntity> getAllArtists() {
        return artistRepository.findAll();
    }
}
