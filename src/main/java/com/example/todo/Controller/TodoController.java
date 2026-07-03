package com.example.todo.Controller;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import com.example.todo.repository.TodoRepository;
import com.example.todo.entity.Todo;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PutMapping;

@RestController
@RequestMapping("/api/todos")
public class TodoController {
    private final TodoRepository repository;

    public TodoController(TodoRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<Todo> getAll() {
        return repository.findAll();
    }

    @PostMapping
    public ResponseEntity<Todo> create(@RequestBody Todo todo) {
        Todo saved = repository.save(todo);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        repository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Todo> update(@PathVariable Long id, @RequestBody Todo updates) {
        Todo existing = repository.findById(id).orElseThrow();
        existing.setTitle(updates.getTitle());
        existing.setCompleted(updates.isCompleted());
        Todo saved = repository.save(existing);
        return ResponseEntity.ok(saved);
    }

}