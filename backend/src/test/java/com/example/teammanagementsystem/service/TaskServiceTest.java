package com.example.teammanagementsystem.service;

import com.example.teammanagementsystem.model.Task;
import com.example.teammanagementsystem.model.Project;
import com.example.teammanagementsystem.repository.TaskRepository;
import com.example.teammanagementsystem.repository.ProjectRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

class TaskServiceTest {

    @Mock
    private TaskRepository taskRepository;

    @Mock
    private ProjectRepository projectRepository;

    @InjectMocks
    private TaskService taskService;

    private Task testTask;
    private Project testProject;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        
        testProject = new Project();
        testProject.setId(1L);
        testProject.setName("Test Project");
        
        testTask = new Task();
        testTask.setId(1L);
        testTask.setTitle("Test Task");
        testTask.setStatus(Task.TaskStatus.TODO);
        testTask.setProject(testProject);
    }

    @Test
    void getAllTasks_Success() {
        when(taskRepository.findAll()).thenReturn(Arrays.asList(testTask));
        
        List<Task> results = taskService.getAllTasks();
        
        assertEquals(1, results.size());
        assertEquals("Test Task", results.get(0).getTitle());
    }

    @Test
    void getTasksByProjectId_Success() {
        when(taskRepository.findByProject_Id(1L)).thenReturn(Arrays.asList(testTask));
        
        List<Task> results = taskService.getTasksByProjectId(1L);
        
        assertEquals(1, results.size());
        assertEquals("Test Task", results.get(0).getTitle());
    }

    @Test
    void saveTask_Success() {
        when(projectRepository.findById(1L)).thenReturn(Optional.of(testProject));
        when(taskRepository.save(any(Task.class))).thenReturn(testTask);
        
        Task result = taskService.saveTask(testTask);
        
        assertNotNull(result);
        assertEquals("Test Task", result.getTitle());
        assertEquals(testProject, result.getProject());
    }

    @Test
    void updateTaskStatus_Success() {
        when(taskRepository.findById(1L)).thenReturn(Optional.of(testTask));
        when(taskRepository.save(any(Task.class))).thenReturn(testTask);
        
        Optional<Task> result = taskService.updateTaskStatus(1L, "DONE");
        
        assertTrue(result.isPresent());
        assertEquals(Task.TaskStatus.DONE, result.get().getStatus());
    }
} 