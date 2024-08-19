package com.labuz.musicapp.repositories;

import com.labuz.musicapp.entities.InstrumentEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InstrumentRepository extends JpaRepository<InstrumentEntity, Long> {
}
