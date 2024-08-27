package com.labuz.musicapp.services;

import com.labuz.musicapp.dtos.MusicDto;
import com.labuz.musicapp.dtos.UserDto;
import com.labuz.musicapp.entities.MusicEntity;
import com.labuz.musicapp.entities.UserEntity;
import com.labuz.musicapp.repositories.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<UserDto> getAllUsers() {
        List<UserEntity> userEntities = userRepository.findAll();
        return userEntities.stream().map(UserDto::new).toList();
    }
}
