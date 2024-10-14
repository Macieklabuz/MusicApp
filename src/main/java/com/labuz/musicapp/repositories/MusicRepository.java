package com.labuz.musicapp.repositories;

import com.labuz.musicapp.entities.MusicEntity;
import com.labuz.musicapp.entities.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MusicRepository extends JpaRepository<MusicEntity, Long> {
    List<MusicEntity> findAllByUsersHistory(UserEntity userEntity);
}
