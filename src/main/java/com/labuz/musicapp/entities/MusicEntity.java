package com.labuz.musicapp.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.userdetails.User;

import java.util.HashSet;
import java.util.Set;


@Entity(name = "music")
@Setter
@Getter
public class MusicEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "music_id")
    private int id;

    @Column(name = "music_name")
    private String name;

    @Column(name = "music_description")
    private String description;

    @Column(name = "music_file")
    private String file;

    @ManyToMany(mappedBy = "music")
    private Set<UserEntity> users;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(
            name = "music_instruments",
            joinColumns = { @JoinColumn(name = "music_id")},
            inverseJoinColumns = {@JoinColumn(name = "instrument_id")}
    )
    Set<InstrumentEntity> instruments = new HashSet<>();

    @ManyToMany(mappedBy = "music")
    private Set<GenreEntity> genres;


    @ManyToMany(mappedBy = "music")
    private Set<ArtistEntity> artists;
}
