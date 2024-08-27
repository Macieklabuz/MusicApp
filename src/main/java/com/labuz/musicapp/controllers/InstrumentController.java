package com.labuz.musicapp.controllers;

import com.labuz.musicapp.dtos.InstrumentDto;
import com.labuz.musicapp.entities.InstrumentEntity;
import com.labuz.musicapp.services.InstrumentService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class InstrumentController {

    InstrumentService instrumentService;
    InstrumentController(InstrumentService instrumentService) {
        this.instrumentService = instrumentService;
    }

    @GetMapping("/user/instrument")
    public List<InstrumentDto> instrument(){
        return instrumentService.getAllInstruments();
    }
}
