package com.labuz.musicapp.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Entity(name = "artists")
@Getter
@Setter
public class ArtistEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "artist_id")
    private int artistId;

    @Column(name = "artist_name")
    private String artistName;

    @Column(name = "artist_description")
    private String artistDescription;

    @ManyToMany(cascade = CascadeType.ALL)
    @JsonIgnore
    @JoinTable(
            name = "artist_music",
            joinColumns = { @JoinColumn(name = "artist_id")},
            inverseJoinColumns = {@JoinColumn(name = "music_id")}
    )
    Set<MusicEntity> music = new HashSet<>();
}
