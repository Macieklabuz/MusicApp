package com.labuz.musicapp.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity(name = "genres")
@Setter
@Getter
public class GenreEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "genre_id")
    private int genreId;

    @Column(name = "genre_name")
    private String genreName;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(
            name = "genre_music",
            joinColumns = { @JoinColumn(name = "genre_id")},
            inverseJoinColumns = {@JoinColumn(name = "music_id")}
    )
    List<MusicEntity> music = new ArrayList<>();
}
