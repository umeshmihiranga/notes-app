package com.example.notes.controller;

import com.example.notes.model.Note;
import com.example.notes.service.NoteService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/notes")
@CrossOrigin(origins = "http://localhost:3000")
public class NoteController {

    private final NoteService service;

    public NoteController(NoteService service) {
        this.service = service;
    }

    @GetMapping
    public List<Note> getAll() {
        return service.findAll();
    }

    // Explicitly name the path variable to avoid parameter-name issues
    @GetMapping("/{id}")
    public ResponseEntity<Note> getOne(@PathVariable("id") Long id) {
        Optional<Note> opt = service.findById(id);
        return opt.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Note> create(@RequestBody Note note) {
        Note created = service.create(note);
        return ResponseEntity.created(URI.create("/api/notes/" + created.getId())).body(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Note> update(@PathVariable("id") Long id, @RequestBody Note note) {
        Optional<Note> updated = service.update(id, note);
        return updated.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable("id") Long id) {
        Optional<Note> opt = service.findById(id);
        if (opt.isEmpty()) return ResponseEntity.notFound().build();
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}