package com.labuz.musicapp.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.userdetails.User;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;


@Entity(name = "music")
@Setter
@Getter
public class MusicEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "music_id")
    private long id;

    @Column(name = "music_name")
    private String name;

    @Column(name = "music_description")
    private String description;

    @Column(name = "music_file")
    private String file;

    @ManyToMany(mappedBy = "music")
    private List<UserEntity> users;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(
            name = "music_instruments",
            joinColumns = { @JoinColumn(name = "music_id")},
            inverseJoinColumns = {@JoinColumn(name = "instrument_id")}
    )
    List<InstrumentEntity> instruments = new ArrayList<>();

    @ManyToMany(mappedBy = "music")
    private List<GenreEntity> genres;


    @ManyToMany(mappedBy = "music")
    private List<ArtistEntity> artists;

    @ManyToOne(cascade = {CascadeType.ALL})
    @JoinColumn(name = "album_id", nullable = true)
    private AlbumEntity album;

    @OneToMany(mappedBy = "music", orphanRemoval = true)
    private List<LikeEntity> likes = new ArrayList<>();

    public int countLikes(){
        return likes.size();
    }

    @ManyToMany(mappedBy = "musicHistory")
    private List<UserEntity> usersHistory = new ArrayList<>();
}
