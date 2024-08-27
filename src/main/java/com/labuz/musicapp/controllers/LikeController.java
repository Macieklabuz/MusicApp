package com.labuz.musicapp.controllers;

import com.labuz.musicapp.services.LikeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;



@RestController
public class LikeController {
    LikeService likeService;
    public LikeController(LikeService likeService) {
        this.likeService = likeService;
    }

    @PostMapping("/user/like")
    public ResponseEntity<?> like(@RequestParam Long userId, @RequestParam Long musicId) {
        try{
            likeService.likeMusic(userId, musicId);
            return ResponseEntity.ok().build();
        } catch(IllegalArgumentException error) {
            return ResponseEntity.badRequest().body(error.getMessage());
        } catch(IllegalStateException error) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(error.getMessage());
        } catch(Exception error) {
            return ResponseEntity.internalServerError().body(error.getMessage());
        }
    }

    @PostMapping("user/unlike")
    public ResponseEntity<?> unlike(@RequestParam Long userId, @RequestParam Long musicId) {
        try {
            likeService.unlikeMusic(userId, musicId);
            return ResponseEntity.ok().build();
        } catch(IllegalArgumentException error) {
            return ResponseEntity.badRequest().body(error.getMessage());
        } catch(IllegalStateException error) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(error.getMessage());
        } catch(Exception error) {
            return ResponseEntity.internalServerError().body(error.getMessage());
        }
    }


    @GetMapping("/user/like/count")
    public ResponseEntity<?> count(@RequestParam Long musicId) {
        try {
            Long count = likeService.getMusicLikesCount(musicId);
            return ResponseEntity.ok(count);
        } catch(IllegalArgumentException error) {
            return ResponseEntity.badRequest().body(error.getMessage());
        } catch(IllegalStateException error) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(error.getMessage());
        } catch(Exception error) {
            return ResponseEntity.internalServerError().body(error.getMessage());
        }
    }
}