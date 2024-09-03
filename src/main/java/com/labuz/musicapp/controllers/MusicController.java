package com.labuz.musicapp.controllers;


import com.labuz.musicapp.dtos.MusicDto;
import com.labuz.musicapp.dtos.MusicFormDto;
import com.labuz.musicapp.entities.MusicEntity;
import com.labuz.musicapp.services.MusicService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class MusicController {

    MusicService musicService;
    MusicController(MusicService musicService) {
        this.musicService = musicService;
    }

    @GetMapping("/user/music")
    public List<MusicDto> music(){
        return musicService.getAllMusic();
    }

    @PostMapping("/user/addmusic")
    public ResponseEntity<?> addMusic(@RequestBody MusicFormDto musicDto){
        try{
            musicService.AddMusic(musicDto);
           return ResponseEntity.ok().body("Music created");
        }catch(Exception error){
            return ResponseEntity.badRequest().body(error.getMessage());
        }
    }
}
