package com.labuz.musicapp.services;

import com.labuz.musicapp.dtos.AlbumDto;
import com.labuz.musicapp.dtos.ArtistDto;
import com.labuz.musicapp.entities.AlbumEntity;
import com.labuz.musicapp.entities.ArtistEntity;
import com.labuz.musicapp.repositories.AlbumRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AlbumService {
    private final AlbumRepository albumRepository;

    public AlbumService(AlbumRepository albumRepository) {
        this.albumRepository = albumRepository;
    }

    public List<AlbumDto> getAllAlbums() {
        List<AlbumEntity> albumEntities = albumRepository.findAll();
        return albumEntities.stream().map(AlbumDto::new).toList();
    }
}
