package com.labuz.musicapp.controllers;

import com.labuz.musicapp.dtos.UserDto;
import com.labuz.musicapp.entities.UserEntity;
import com.labuz.musicapp.services.UserService;
import org.springframework.web.bind.annotation.GetMapping;
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

}
