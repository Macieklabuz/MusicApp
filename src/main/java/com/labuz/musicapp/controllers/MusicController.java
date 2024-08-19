package com.labuz.musicapp.controllers;


import com.labuz.musicapp.entities.MusicEntity;
import com.labuz.musicapp.services.MusicService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class MusicController {

    MusicService musicService;
    MusicController(MusicService musicService) {
        this.musicService = musicService;
    }

    @GetMapping("/user/music")
    public List<MusicEntity> music(){
        return musicService.getAllMusic();
    }
}
