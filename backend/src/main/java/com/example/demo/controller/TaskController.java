package com.example.demo.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.Task;
import com.example.demo.repository.TaskRepository;

@RestController
@RequestMapping("/tasks")
public class TaskController {

    @Autowired
    private TaskRepository taskRepository;

    @CrossOrigin
    @GetMapping
    public ResponseEntity<List<Task>> getAllTasks() {
        return ResponseEntity.ok(taskRepository.findAll());
    }

    @CrossOrigin
    @GetMapping("/{id}")
    public ResponseEntity<Task> getTaskById(@PathVariable Long id) {
        Optional<Task> t = taskRepository.findById(id);
        if (t.isPresent()) {
            return ResponseEntity.ok(t.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @CrossOrigin
    @PutMapping("/{id}")
    public ResponseEntity<String> updateTask(@PathVariable Long id, @RequestBody Task task) {
        Optional<Task> t = taskRepository.findById(id);

        if (t.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Task existingTask = t.get();
        existingTask.setTaskdescription(task.getTaskdescription());

        taskRepository.save(existingTask);
        return ResponseEntity.ok("Task updated successfully.");
    }

    @CrossOrigin
    @PostMapping
    public ResponseEntity<String> addTask(@RequestBody Task task) {
        Task t = taskRepository.save(task);

        System.out.println("API EP /tasks: " + t.getTaskdescription());
        return ResponseEntity.ok("Ok " + t.getTaskdescription());
    }

    @CrossOrigin
    @DeleteMapping("/{id}")
    public String deleteTask(@PathVariable Long id) {
        /*
         * taskRepository.deleteById(id);
         * return ResponseEntity.noContent().build()
         */
        taskRepository.deleteById(id);
        return "redirect:/";
    }

}
