package com.labuz.musicapp;

import com.labuz.musicapp.dtos.GenreDto;
import com.labuz.musicapp.dtos.InstrumentDto;
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
import com.labuz.musicapp.services.MusicService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class MusicServiceTest {

    @Mock
    private MusicRepository musicRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private GenreRepository genreRepository;

    @Mock
    private InstrumentRepository instrumentRepository;

    @Mock
    private SecurityContext securityContext;

    @Mock
    private Authentication authentication;

    @InjectMocks
    private MusicService musicService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        SecurityContextHolder.setContext(securityContext);
    }

    @Test
    void testGetAllMusic() {
        // Arrange
        MusicEntity musicEntity = new MusicEntity();
        musicEntity.setId(1);
        musicEntity.setName("Test Music");
        when(musicRepository.findAll()).thenReturn(List.of(musicEntity));

        // Act
        List<MusicDto> result = musicService.getAllMusic();

        // Assert
        assertEquals(1, result.size());
        assertEquals("Test Music", result.get(0).getName());
        verify(musicRepository, times(1)).findAll();
    }

    @Test
    void testAddMusic() {
        // Arrange
        MusicFormDto musicFormDto = new MusicFormDto();
        musicFormDto.setName("New Music");
        musicFormDto.setDescription("Description");
        InstrumentDto instrumentDto = new InstrumentDto(1, "Guitar", "string", "One of the most famous instruments");
        GenreDto genreDto = new GenreDto(1, "Rock");
        musicFormDto.setInstruments(List.of(instrumentDto));
        musicFormDto.setGenres(List.of(genreDto));

        InstrumentEntity instrumentEntity = new InstrumentEntity();
        instrumentEntity.setInstrumentId(1);
        GenreEntity genreEntity = new GenreEntity();
        genreEntity.setGenreId(1);

        UserEntity user = new UserEntity();
        user.setUsername("testUser");

        when(instrumentRepository.findById(1L)).thenReturn(Optional.of(instrumentEntity));
        when(genreRepository.findById(1L)).thenReturn(Optional.of(genreEntity));
        when(userRepository.findByUsername("testUser")).thenReturn(Optional.of(user));
        when(authentication.getName()).thenReturn("testUser");
        when(securityContext.getAuthentication()).thenReturn(authentication);
        // Act
        musicService.AddMusic(musicFormDto);
        // Assert
        verify(musicRepository, times(1)).save(any(MusicEntity.class));
    }

    @Test
    void testUpdateMusic() {
        // Arrange
        MusicFormDto musicFormDto = new MusicFormDto();
        musicFormDto.setId(1);
        musicFormDto.setName("Updated Music");
        InstrumentDto instrumentDto = new InstrumentDto(1, "Piano", "aaa", "aaa");
        GenreDto genreDto = new GenreDto(1, "Classical");
        musicFormDto.setInstruments(List.of(instrumentDto));
        musicFormDto.setGenres(List.of(genreDto));

        MusicEntity musicEntity = new MusicEntity();
        musicEntity.setId(1);

        InstrumentEntity instrumentEntity = new InstrumentEntity();
        instrumentEntity.setInstrumentId(1);
        GenreEntity genreEntity = new GenreEntity();
        genreEntity.setGenreId(1);

        when(musicRepository.findById(1L)).thenReturn(Optional.of(musicEntity));
        when(instrumentRepository.findById(1L)).thenReturn(Optional.of(instrumentEntity));
        when(genreRepository.findById(1L)).thenReturn(Optional.of(genreEntity));
        when(authentication.getName()).thenReturn("testUser");
        when(securityContext.getAuthentication()).thenReturn(authentication);

        // Act
        musicService.updateMusic(musicFormDto);

        // Assert
        verify(musicRepository, times(1)).save(musicEntity);
        assertEquals("Updated Music", musicEntity.getName());
        assertEquals(1, musicEntity.getInstruments().size());
        assertEquals(1, musicEntity.getGenres().size());
    }

}
