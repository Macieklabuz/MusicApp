package com.labuz.musicapp.services;

import com.labuz.musicapp.entities.InstrumentEntity;
import com.labuz.musicapp.repositories.InstrumentRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InstrumentService {
    private final InstrumentRepository instrumentRepository;

    public InstrumentService(InstrumentRepository instrumentRepository) {
        this.instrumentRepository = instrumentRepository;
    }

    public List<InstrumentEntity> getAllInstruments() {
        return instrumentRepository.findAll();
    }
}
