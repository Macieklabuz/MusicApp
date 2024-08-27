package com.labuz.musicapp.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.Set;

@Entity(name = "instruments")
@Setter
@Getter
public class InstrumentEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "instrument_id")
    private Integer instrumentId;

    @Column(name= "instrument_name")
    private String instrumentName;

    @Column(name = "instrument_type")
    private String instrumentType;

    @Column(name = "instrument_description")
    private String instrumentDescription;

    @ManyToMany(mappedBy = "instruments")
    private List<MusicEntity> music;
}
