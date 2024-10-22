package com.labuz.musicapp.services;

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


@Service
public class LikeService {

    private final LikeRepository likeRepository;
    private final UserRepository userRepository;
    private final MusicRepository musicRepository;

    public LikeService(
            LikeRepository likeRepository,
            UserRepository userRepository,
            MusicRepository musicRepository
    ) {
        this.likeRepository = likeRepository;
        this.userRepository = userRepository;
        this.musicRepository = musicRepository;
    }

    public void likeMusic(Long musicId) throws IllegalArgumentException, IllegalStateException {
        UserEntity user = getUserEntity();

        MusicEntity music = musicRepository.findById(musicId)
                .orElseThrow(() -> new IllegalArgumentException("Music Not Found"));

        if (likeRepository.findByUserAndMusic(user, music).isPresent()) {
            throw new IllegalStateException("User Already Liked This Music");
        }

        LikeEntity like = new LikeEntity();
        like.setMusic(music);
        like.setUser(user);
        likeRepository.save(like);
    }

    public void unlikeMusic(Long musicId) throws IllegalArgumentException, IllegalStateException {
        UserEntity user = getUserEntity();

        MusicEntity music = musicRepository.findById(musicId)
                .orElseThrow(() -> new IllegalArgumentException("Music Not Found"));

        LikeEntity like = likeRepository.findByUserAndMusic(user, music)
                .orElseThrow(() -> new IllegalStateException("Like Not Found"));

        likeRepository.delete(like);
    }

    public Long getMusicLikesCount(Long musicId) throws IllegalArgumentException {
        MusicEntity music = musicRepository.findById(musicId)
                .orElseThrow(() -> new IllegalArgumentException("Music Not Found"));

        return likeRepository.countByMusic(music);

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

}
