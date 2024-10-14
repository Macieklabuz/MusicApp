package com.labuz.musicapp.controllers;

import com.labuz.musicapp.dtos.LongDto;
import com.labuz.musicapp.dtos.MusicDto;
import com.labuz.musicapp.dtos.UserDto;
import com.labuz.musicapp.entities.UserEntity;
import com.labuz.musicapp.services.UserService;
import jakarta.transaction.Transactional;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class UserController {
    UserService userService;
    UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/user")
    public List<UserDto> user(){
        return userService.getAllUsers();
    }

    @GetMapping("/user/me")
    public UserDto getUser(){
        return userService.getUser();
    }

    @Transactional
    @GetMapping("/user/likedIds")
    public List<Long> getLikedIds() {
        return userService.getLikedIds();
    }

    @GetMapping("/user/history")
    public List<MusicDto> getHistory () {
        return userService.getMusicHistory();
    }
    @PostMapping("/user/addhistory")
    public ResponseEntity<?> addHistory (@RequestBody LongDto musicId) {
        try{
            userService.addMusicHistory(musicId.getId());
            return ResponseEntity.ok().body("History succesfully added");
        }catch (Exception exception){
            return ResponseEntity.badRequest().body(exception.getMessage());
        }
    }
}
