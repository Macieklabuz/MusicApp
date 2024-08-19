package com.labuz.musicapp.repositories;

import com.labuz.musicapp.entities.MusicEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MusicRepository extends JpaRepository<MusicEntity, Long> {
}
