package com.labuz.musicapp.repositories;

import com.labuz.musicapp.entities.ArtistEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ArtistRepository extends JpaRepository<ArtistEntity, Long> {
}
