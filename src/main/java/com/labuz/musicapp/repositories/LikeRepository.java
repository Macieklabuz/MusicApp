package com.labuz.musicapp.repositories;

import java.util.Optional;

import com.labuz.musicapp.entities.LikeEntity;
import com.labuz.musicapp.entities.MusicEntity;
import com.labuz.musicapp.entities.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface LikeRepository extends JpaRepository<LikeEntity, Long> {
    Optional<LikeEntity> findByUserAndMusic(UserEntity user, MusicEntity music);

    long countByMusic(MusicEntity music);
}
