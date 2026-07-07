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
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("/api/todos")
public class TodoController {
    private final TodoRepository repository;
    private static final Logger logger = LoggerFactory.getLogger(TodoController.class);

    public TodoController(TodoRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<Todo> getAll() {
        logger.info("Getting all todos");
        return repository.findAll();
    }

    @PostMapping
    public ResponseEntity<Todo> create(@RequestBody Todo todo) {
        logger.info("Creating todo with title {}", todo.getTitle());
        Todo saved = repository.save(todo);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        logger.info("Deleting todo with id {}", id);
        repository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Todo> update(@PathVariable Long id, @RequestBody Todo updates) {
        logger.info("Updating todo with id {} to {} and is {}", id, updates.getTitle(), updates.isCompleted());
        Todo existing = repository.findById(id).orElseThrow();
        existing.setTitle(updates.getTitle());
        existing.setCompleted(updates.isCompleted());
        Todo saved = repository.save(existing);
        return ResponseEntity.ok(saved);
    }

}