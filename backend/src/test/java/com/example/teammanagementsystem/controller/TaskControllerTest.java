package com.example.teammanagementsystem.controller;

import com.example.teammanagementsystem.model.Task;
import com.example.teammanagementsystem.model.Project;
import com.example.teammanagementsystem.service.TaskService;
import com.example.teammanagementsystem.service.AuthService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;
import java.util.Optional;
import java.util.HashMap;
import java.util.Map;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;

@WebMvcTest(TaskController.class)
class TaskControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private TaskService taskService;

    @MockBean
    private AuthService authService;

    private Task testTask;
    private Project testProject;

    @BeforeEach
    void setUp() {
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
    @WithMockUser
    void getAllTasks_Success() throws Exception {
        when(taskService.getAllTasks()).thenReturn(Arrays.asList(testTask));

        mockMvc.perform(get("/api/tasks")
                .with(csrf()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].title").value("Test Task"));
    }

    @Test
    @WithMockUser
    void getTasksByProjectId_Success() throws Exception {
        when(taskService.getTasksByProjectId(1L)).thenReturn(Arrays.asList(testTask));

        mockMvc.perform(get("/api/tasks/project/1")
                .with(csrf()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].title").value("Test Task"));
    }

    @Test
    @WithMockUser
    void saveTask_Success() throws Exception {
        when(taskService.saveTask(any(Task.class))).thenReturn(testTask);

        mockMvc.perform(post("/api/tasks")
                .with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(testTask)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.title").value("Test Task"));
    }

    @Test
    @WithMockUser
    void updateTaskStatus_Success() throws Exception {
        when(taskService.updateTaskStatus(1L, "DONE"))
            .thenReturn(Optional.of(testTask));

        Map<String, String> statusUpdate = new HashMap<>();
        statusUpdate.put("status", "DONE");

        mockMvc.perform(patch("/api/tasks/{id}", 1L)
                .with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(statusUpdate)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.title").value("Test Task"));
    }

    @Test
    @WithMockUser
    void getTaskById_Success() throws Exception {
        when(taskService.getTaskById(1L)).thenReturn(Optional.of(testTask));

        mockMvc.perform(get("/api/tasks/{id}", 1L)
                .with(csrf()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.title").value("Test Task"))
                .andExpect(jsonPath("$.status").value("TODO"));
    }
} 