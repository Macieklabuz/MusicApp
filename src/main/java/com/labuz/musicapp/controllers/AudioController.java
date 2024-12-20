package com.labuz.musicapp.controllers;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.net.URI;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StreamUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/user/audio")
public class AudioController {
    @Value("${file.upload-dir}")
    private String uploadDir;

    // Metoda GET do pobierania pliku
    @GetMapping("/file")
    public ResponseEntity<byte[]> getAudioFile(@RequestParam String fileName) {
        // Walidacja nazwy pliku
        if (!fileName.matches("[a-zA-Z0-9_-]+\\.(mp3|wav|ogg)")) {
            return ResponseEntity.badRequest().body("Invalid file name".getBytes());
        }

        try {
            Path filePath = Paths.get(uploadDir).resolve(fileName);

            if (!Files.exists(filePath)) {
                return ResponseEntity.notFound().build();
            }

            byte[] fileBytes = Files.readAllBytes(filePath);

            if (fileBytes == null || fileBytes.length == 0) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body("The file is empty or could not be read".getBytes());
            }

            MediaType mediaType = determineMediaType(fileName);

            return ResponseEntity.ok()
                    .contentType(mediaType)
                    .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + fileName + "\"")
                    .body(fileBytes);

        } catch (IOException ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An error occurred while reading the file".getBytes());
        }
    }

    private MediaType determineMediaType(String fileName) {
        String extension = fileName.substring(fileName.lastIndexOf('.') + 1).toLowerCase();
        switch (extension) {
            case "mp3": return MediaType.valueOf("audio/mpeg");
            case "wav": return MediaType.valueOf("audio/wav");
            case "ogg": return MediaType.valueOf("audio/ogg");
            default: return MediaType.APPLICATION_OCTET_STREAM;
        }
    }

    // Metoda POST do uploadu pliku
    @PostMapping("/upload")
    public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file) {
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body("Please select a file to upload.");
        }

        try {
            String originalFileName = file.getOriginalFilename();
            if (originalFileName == null) {
                return ResponseEntity.badRequest().body("Invalid file name.");
            }


            String sanitizedFileName = originalFileName.replaceAll("\\s+", "_").replaceAll("[^a-zA-Z0-9._-]", "");
            String uniqueFileName = UUID.randomUUID().toString() + "_" + sanitizedFileName;


            Path uploadPath = Paths.get(uploadDir).resolve(uniqueFileName);
            Files.createDirectories(uploadPath.getParent());


            Files.write(uploadPath, file.getBytes());

            return ResponseEntity.ok(uniqueFileName);

        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An error occurred while uploading the file: " + e.getMessage());
        }
    }

}
