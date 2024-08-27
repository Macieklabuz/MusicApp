package com.labuz.musicapp.dtos;



import com.labuz.musicapp.entities.LikeEntity;
import com.labuz.musicapp.entities.MusicEntity;
import com.labuz.musicapp.entities.UserEntity;
import lombok.Getter;

@Getter
public class LikeDto {

    private Long id;
    private UserDto user;
    private MusicDto music;

    public LikeDto(LikeEntity likeEntity) {
        this.id = likeEntity.getId();

        UserEntity userEntity = likeEntity.getUser();
        this.user = new UserDto(userEntity);

        MusicEntity musicEntity = likeEntity.getMusic();
        this.music = new MusicDto(musicEntity);

    }

}