package com.labuz.musicapp.services;

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

    public List<MusicEntity> getAllMusic(){
        return musicRepository.findAll();
    }
}
