package com.lista.tarefas.service;

import com.lista.tarefas.exception.ResourceNotFoundException;
import com.lista.tarefas.model.Task;
import com.lista.tarefas.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    public List<Task> getAllTasks() {
        return  taskRepository.findAll();
    }

    public Task addTask(Task task) {
        task.setCreatedDate(LocalDateTime.now());
        return taskRepository.save(task);
    }

    public Task updateTask(Long id, Task taskDetails) {
        Task task = taskRepository.findById(id).orElseThrow();
        task.setTitle(taskDetails.getTitle());
        task.setDescription(taskDetails.getDescription());
        task.setStatus(taskDetails.getStatus());
        return taskRepository.save(task);
    }

    public void deleteTask(Long id) {
        if(!taskRepository.existsById(id)) {
            throw new RuntimeException("Tarefa não encontrada com o ID" + id);
        }
        taskRepository.deleteById(id);
    }

    public List<Task> filterTasksByStatus(String status) {
        return taskRepository.findByStatus(status);
    }

    public Task getTaskById(Long id) {
        Optional<Task> taskOptional = taskRepository.findById(id); // Busca a tarefa no repositório
        if (taskOptional.isPresent()) {
            return taskOptional.get(); // Retorna a tarefa se encontrada
        } else {
            throw new ResourceNotFoundException("Task not found with id: " + id); // Lida com o caso onde a tarefa não é encontrada
        }
    }

}
