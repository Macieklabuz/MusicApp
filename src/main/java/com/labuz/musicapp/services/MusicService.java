package com.labuz.musicapp.services;

import com.labuz.musicapp.dtos.ArtistDto;
import com.labuz.musicapp.dtos.MusicDto;
import com.labuz.musicapp.entities.MusicEntity;
import com.labuz.musicapp.repositories.MusicRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MusicService {
    private final MusicRepository musicRepository;

    public MusicService(MusicRepository musicRepository) {
        this.musicRepository = musicRepository;
    }

    public List<MusicDto> getAllMusic(){
        List<MusicEntity> musicEntities = musicRepository.findAll();
        return musicEntities.stream().map(MusicDto::new).toList();
    }
}
