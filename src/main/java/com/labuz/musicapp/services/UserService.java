package com.labuz.musicapp.services;

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

    public List<UserEntity> getAllUsers() {
        return userRepository.findAll();
    }
}
