package com.labuz.musicapp.services;

import com.labuz.musicapp.dtos.ArtistDto;
import com.labuz.musicapp.dtos.MusicDto;
import com.labuz.musicapp.entities.ArtistEntity;
import com.labuz.musicapp.entities.MusicEntity;
import com.labuz.musicapp.repositories.ArtistRepository;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class ArtistService {
    private final ArtistRepository artistRepository;

    public ArtistService(ArtistRepository artistRepository) {
        this.artistRepository = artistRepository;
    }

    public List<ArtistDto> getAllArtists() {
        List<ArtistEntity> artistEntities = artistRepository.findAll();
        return artistEntities.stream().map(ArtistDto::new).toList();
    }
}
