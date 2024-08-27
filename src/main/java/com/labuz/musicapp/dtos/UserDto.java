package com.labuz.musicapp.dtos;
import com.labuz.musicapp.entities.UserEntity;
import lombok.Getter;

@Getter
public class UserDto {

    private final Long id;
    private final String username;
    private final String role;

    public UserDto(UserEntity userEntity) {
        this.id = userEntity.getId();
        this.username = userEntity.getUsername();
        this.role = userEntity.getRole();
    }
}

