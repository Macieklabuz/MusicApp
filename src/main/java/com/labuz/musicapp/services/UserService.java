package com.labuz.musicapp.services;

import com.labuz.musicapp.dtos.MusicDto;
import com.labuz.musicapp.dtos.UserDto;
import com.labuz.musicapp.entities.LikeEntity;
import com.labuz.musicapp.entities.MusicEntity;
import com.labuz.musicapp.entities.UserEntity;
import com.labuz.musicapp.repositories.LikeRepository;
import com.labuz.musicapp.repositories.MusicRepository;
import com.labuz.musicapp.repositories.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Collections;
import java.util.List;
@Service
public class UserService {
    private final UserRepository userRepository;
    private final LikeRepository likeRepository;
    private final MusicRepository musicRepository;

    public UserService(UserRepository userRepository, LikeRepository likeRepository, MusicRepository musicRepository) {
        this.userRepository = userRepository;
        this.likeRepository = likeRepository;
        this.musicRepository = musicRepository;
    }

    public List<UserDto> getAllUsers() {
        List<UserEntity> userEntities = userRepository.findAll();
        return userEntities.stream().map(UserDto::new).toList();
    }
    public List<Long> getLikedIds() {
        UserEntity user = getUserEntity();
        List<LikeEntity> likeEntities = likeRepository.findAllByUser(user);
        List<Long> likedIds = likeEntities.stream().map(likeEntity -> likeEntity.getMusic().getId()).toList();
        return likedIds;
    }

    private UserEntity getUserEntity() throws ResponseStatusException, IllegalArgumentException{

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication instanceof AnonymousAuthenticationToken) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User Not Logged In");
        }
        String username= authentication.getName();;
        UserEntity user = userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("User Not Found"));

        return user;
    }
    public UserDto getUser() throws ResponseStatusException, IllegalArgumentException{
        UserEntity user = getUserEntity();
        return new UserDto(user);
    }

    public List<MusicDto> getMusicHistory() {
        UserEntity user = getUserEntity();
        List<MusicEntity> musicHistory = musicRepository.findAllByUsersHistory(user);

        if (musicHistory == null || musicHistory.isEmpty()) {
            return Collections.emptyList(); // Zwróć pustą listę, jeśli nie ma historii
        }

        // Pobierz obiekty MusicEntity na podstawie ID
        List<MusicDto> musicHistoryDto = musicHistory.stream().map(MusicDto::new).toList();
        return musicHistoryDto; // Zwróć listę utworów
    }
    public void addMusicHistory(long musicId) {
        System.out.println(musicId);
        UserEntity user = getUserEntity();

        // Pobierz encję muzyki na podstawie musicId
        MusicEntity musicEntity = musicRepository.findById(musicId)
                .orElseThrow(() -> new IllegalArgumentException("Music Not Found"));

        // Sprawdź, czy utwór już istnieje w historii użytkownika
        if (user.getMusicHistory().contains(musicEntity)) {
            System.out.println("Muzyka już istnieje w historii użytkownika.");
            return; // Jeśli istnieje, zakończ działanie metody
        }

        // Jeśli nie istnieje, dodaj do historii i zapisz
        user.getMusicHistory().add(musicEntity);
        userRepository.save(user);

        System.out.println("Muzyka dodana do historii.");
    }


}
