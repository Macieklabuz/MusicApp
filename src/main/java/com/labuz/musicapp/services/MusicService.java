package com.labuz.musicapp.services;

import com.labuz.musicapp.dtos.ArtistDto;
import com.labuz.musicapp.dtos.MusicDto;
import com.labuz.musicapp.dtos.MusicFormDto;
import com.labuz.musicapp.entities.GenreEntity;
import com.labuz.musicapp.entities.InstrumentEntity;
import com.labuz.musicapp.entities.MusicEntity;
import com.labuz.musicapp.entities.UserEntity;
import com.labuz.musicapp.repositories.GenreRepository;
import com.labuz.musicapp.repositories.InstrumentRepository;
import com.labuz.musicapp.repositories.MusicRepository;
import com.labuz.musicapp.repositories.UserRepository;
import org.springframework.boot.autoconfigure.jdbc.DataSourceTransactionManagerAutoConfiguration;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class MusicService {
    private final MusicRepository musicRepository;
    private final UserRepository userRepository;
    private final GenreRepository genreRepository;
    private final InstrumentRepository instrumentRepository;
    private final DataSourceTransactionManagerAutoConfiguration dataSourceTransactionManagerAutoConfiguration;

    public MusicService(MusicRepository musicRepository, UserRepository userRepository, InstrumentRepository instrumentRepository, GenreRepository genreRepository, DataSourceTransactionManagerAutoConfiguration dataSourceTransactionManagerAutoConfiguration) {
        this.musicRepository = musicRepository;
        this.userRepository = userRepository;
        this.instrumentRepository = instrumentRepository;
        this.genreRepository = genreRepository;
        this.dataSourceTransactionManagerAutoConfiguration = dataSourceTransactionManagerAutoConfiguration;
    }

    public List<MusicDto> getAllMusic(){
        List<MusicEntity> musicEntities = musicRepository.findAll();
        return musicEntities.stream().map(MusicDto::new).toList();
    }

    private UserEntity getCurrentUser() throws ResponseStatusException, IllegalArgumentException{

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication instanceof AnonymousAuthenticationToken) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User Not Logged In");
        }
        String username= authentication.getName();;
        UserEntity user = userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("User Not Found"));

        return user;
    }

    public void AddMusic(MusicFormDto musicDto) {
        MusicEntity musicEntity = new MusicEntity();
        UserEntity user = getCurrentUser();

        List<InstrumentEntity> instrumentEntities = musicDto.getInstruments().stream().map(instrumentDto -> {
            InstrumentEntity instrumentEntity = instrumentRepository.findById(instrumentDto.getId())
                    .orElseThrow(() -> new IllegalArgumentException("Instrument not found"));
            return instrumentEntity;
        }).toList();

        List<GenreEntity> genreEntities= musicDto.getGenres().stream().map(genreDto -> {
            GenreEntity genreEntity = genreRepository.findById(genreDto.getId())
                    .orElseThrow(() -> new IllegalArgumentException("Genre not found"));
            return genreEntity;
        }).toList();
        System.out.println(genreEntities);
        musicEntity.setId(0);
        musicEntity.setName(musicDto.getName());
        musicEntity.setDescription(musicDto.getDescription());
        musicEntity.setFile(musicDto.getFile());

        musicEntity.setGenres(genreEntities);
        musicEntity.setInstruments(instrumentEntities);
        musicRepository.save(musicEntity);
    }
}
