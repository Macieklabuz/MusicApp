package com.labuz.musicapp.controllers;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.UUID;

import org.springframework.core.io.ClassPathResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StreamUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/user/audio")
public class AudioController {

    // Metoda GET do pobierania pliku
    @GetMapping("/file/{fileName}")
    public ResponseEntity<byte[]> getAudioFile(@PathVariable String fileName) {
        // Walidacja nazwy pliku
        if (!fileName.matches("[a-zA-Z0-9_-]+\\.(mp3)")) {
            return ResponseEntity.badRequest().body("Invalid file name".getBytes());
        }

        try {
            // Wczytanie pliku MP3 z folderu mp3 w zasobach
            ClassPathResource audioFile = new ClassPathResource("mp3/" + fileName);

            // Sprawdzenie, czy plik istnieje
            if (!audioFile.exists()) {
                return ResponseEntity.notFound().build();
            }

            // Odczytanie pliku do tablicy bajtów
            byte[] audioBytes = StreamUtils.copyToByteArray(audioFile.getInputStream());

            // Zwrócenie odpowiedzi z zawartością pliku MP3
            return ResponseEntity.ok()
                    .contentType(MediaType.APPLICATION_OCTET_STREAM)
                    .body(audioBytes);

        } catch (IOException error) {
            // Obsługa błędów IO
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An error occurred while reading the file".getBytes());
        }
    }

    // Metoda POST do uploadu pliku
    @PostMapping("/upload")
    public ResponseEntity<String> uploadAudioFile(@RequestParam("file") MultipartFile file) {
        // Sprawdzenie, czy plik jest pusty
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body("No file selected to upload.");
        }

        String uniqueFileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();

        // Walidacja formatu pliku
        if (!uniqueFileName.matches("[a-zA-Z0-9_-]+\\.(mp3)")) {
            return ResponseEntity.badRequest().body("Invalid file name. Only .mp3 files are allowed.");
        }

        try {
            // Określenie ścieżki, gdzie plik zostanie zapisany
            File uploadDir = new File("src/main/resources/mp3/");
            if (!uploadDir.exists()) {
                uploadDir.mkdirs();
            }

            // Zapisanie pliku na serwerze
            File uploadedFile = new File(uploadDir, uniqueFileName);
            try (FileOutputStream fos = new FileOutputStream(uploadedFile)) {
                fos.write(file.getBytes());
            }

            // Zwrócenie odpowiedzi, że upload się powiódł
            return ResponseEntity.ok("File uploaded successfully.");

        } catch (IOException error) {
            // Obsługa błędów IO
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An error occurred while uploading the file.");
        }
    }
}
