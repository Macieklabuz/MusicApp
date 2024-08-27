package com.labuz.musicapp.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Entity(name = "albums")
@Setter
@Getter
public class AlbumEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "album_id")
    private int albumId;

    @Column(name = "album_name")
    private String albumName;

    @Column(name = "album_description")
    private String albumDescription;

    @Column(name = "album_image")
    private String albumImage;

    @Column(name = "album_date")
    private int albumDate;

    @OneToMany(mappedBy = "album")
    private List<MusicEntity> music;
}
