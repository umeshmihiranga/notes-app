package com.example.notes.service;

import com.example.notes.model.Note;
import com.example.notes.repository.NoteRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class NoteService {
    private final NoteRepository repo;

    public NoteService(NoteRepository repo) {
        this.repo = repo;
    }

    public List<Note> findAll() {
        return repo.findAll();
    }

    public Optional<Note> findById(Long id) {
        return repo.findById(id);
    }

    public Note create(Note note) {
        return repo.save(note);
    }

    public Optional<Note> update(Long id, Note updated) {
        return repo.findById(id).map(existing -> {
            existing.setTitle(updated.getTitle());
            existing.setContent(updated.getContent());
            return repo.save(existing);
        });
    }

    public void delete(Long id) {
        repo.deleteById(id);
    }
}