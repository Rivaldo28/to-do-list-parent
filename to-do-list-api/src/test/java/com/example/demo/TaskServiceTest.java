package com.example.demo;

import com.lista.tarefas.model.Task;
import com.lista.tarefas.repository.TaskRepository;
import com.lista.tarefas.service.TaskService;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

class TaskServiceTest {

    @Mock
    private TaskRepository taskRepository;

    @InjectMocks
    private TaskService taskService;

    public TaskServiceTest() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void getAllTasks_ShouldReturnListOfTasks() {
        // Arrange
        Task task1 = new Task(1L, "Task 1", "Description 1", "Pending", LocalDateTime.now());
        Task task2 = new Task(2L, "Task 2", "Description 2", "Completed", LocalDateTime.now());
        List<Task> tasks = Arrays.asList(task1, task2);

        when(taskRepository.findAll()).thenReturn(tasks);

        // Act
        List<Task> result = taskService.getAllTasks();

        // Assert
        assertEquals(2, result.size());
        assertEquals("Task 1", result.get(0).getTitle());
        assertEquals("Task 2", result.get(1).getTitle());

        // Print results
        System.out.println("Tasks retrieved: " + result);
    }

    @Test
    void getAllTasks_ShouldReturnSingleTask() {
        // Arrange
        Task task = new Task(1L, "Single Task", "Single Description", "Pending", LocalDateTime.now());
        List<Task> tasks = Arrays.asList(task);
        when(taskRepository.findAll()).thenReturn(tasks);

        // Act
        List<Task> result = taskService.getAllTasks();

        // Assert
        assertEquals(1, result.size());
        assertEquals("Single Task", result.get(0).getTitle());

        // Print result
        System.out.println("Single task retrieved: " + result.get(0));
    }

    @Test
    void getAllTasks_ShouldReturnEmptyList_WhenNoTasks() {
        // Arrange
        when(taskRepository.findAll()).thenReturn(Arrays.asList());

        // Act
        List<Task> result = taskService.getAllTasks();

        // Assert
        assertEquals(0, result.size());

        // Print result
        System.out.println("No tasks retrieved. Size: " + result.size());
    }

    @Test
    void getAllTasks_ShouldReturnTasksWithDifferentStatuses() {
        // Arrange
        Task task1 = new Task(1L, "Task 1", "Description 1", "Pending", LocalDateTime.now());
        Task task2 = new Task(2L, "Task 2", "Description 2", "In Progress", LocalDateTime.now());
        Task task3 = new Task(3L, "Task 3", "Description 3", "Completed", LocalDateTime.now());
        List<Task> tasks = Arrays.asList(task1, task2, task3);
        when(taskRepository.findAll()).thenReturn(tasks);

        // Act
        List<Task> result = taskService.getAllTasks();

        // Assert
        assertEquals(3, result.size());
        assertEquals("Task 1", result.get(0).getTitle());
        assertEquals("In Progress", result.get(1).getStatus());
        assertEquals("Task 3", result.get(2).getTitle());

        // Print results
        System.out.println("Tasks retrieved with different statuses: " + result);
    }
}