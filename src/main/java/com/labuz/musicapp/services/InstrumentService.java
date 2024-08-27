package com.labuz.musicapp.services;

import com.labuz.musicapp.dtos.InstrumentDto;
import com.labuz.musicapp.dtos.MusicDto;
import com.labuz.musicapp.entities.InstrumentEntity;
import com.labuz.musicapp.entities.MusicEntity;
import com.labuz.musicapp.repositories.InstrumentRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InstrumentService {
    private final InstrumentRepository instrumentRepository;

    public InstrumentService(InstrumentRepository instrumentRepository) {
        this.instrumentRepository = instrumentRepository;
    }

    public List<InstrumentDto> getAllInstruments() {
        List<InstrumentEntity> instrumentEntities = instrumentRepository.findAll();
        return instrumentEntities.stream().map(InstrumentDto::new).toList();
    }
}
