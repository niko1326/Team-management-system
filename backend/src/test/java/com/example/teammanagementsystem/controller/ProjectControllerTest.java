package com.example.teammanagementsystem.controller;

import com.example.teammanagementsystem.model.Project;
import com.example.teammanagementsystem.model.Team;
import com.example.teammanagementsystem.service.ProjectService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.server.ResponseStatusException;

import java.util.Arrays;
import java.util.Collections;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(ProjectController.class)
class ProjectControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private ProjectService projectService;

    private Project testProject;
    private Team testTeam;

    @BeforeEach
    void setUp() {
        testTeam = new Team();
        testTeam.setId(1L);
        testTeam.setName("Test Team");

        testProject = new Project();
        testProject.setId(1L);
        testProject.setName("Test Project");
        testProject.setDescription("Test Description");
        testProject.setTeam(testTeam);
    }

    @Test
    @WithMockUser
    void getProjects_Success() throws Exception {
        when(projectService.getProjectsByUser("testuser"))
                .thenReturn(Arrays.asList(testProject));

        mockMvc.perform(get("/api/projects")
                .param("username", "testuser"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].name").value("Test Project"))
                .andExpect(jsonPath("$[0].description").value("Test Description"));
    }

    @Test
    @WithMockUser
    void getProjects_EmptyList() throws Exception {
        when(projectService.getProjectsByUser("testuser"))
                .thenReturn(Collections.emptyList());

        mockMvc.perform(get("/api/projects")
                .param("username", "testuser"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$").isEmpty());
    }

    @Test
    @WithMockUser
    void getProjects_UserNotFound() throws Exception {
        when(projectService.getProjectsByUser("nonexistent"))
                .thenThrow(new ResponseStatusException(org.springframework.http.HttpStatus.NOT_FOUND));

        mockMvc.perform(get("/api/projects")
                .param("username", "nonexistent"))
                .andExpect(status().isBadRequest());
    }

    @Test
    @WithMockUser
    void createProject_Success() throws Exception {
        when(projectService.createProject(any(Project.class)))
                .thenReturn(testProject);

        mockMvc.perform(post("/api/projects")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(testProject)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.name").value("Test Project"))
                .andExpect(jsonPath("$.description").value("Test Description"));
    }

    @Test
    @WithMockUser
    void updateProject_Success() throws Exception {
        Project updatedProject = new Project();
        updatedProject.setId(1L);
        updatedProject.setName("Updated Project");
        updatedProject.setDescription("Updated Description");
        updatedProject.setTeam(testTeam);

        when(projectService.updateProject(eq(1L), any(Project.class)))
                .thenReturn(updatedProject);

        mockMvc.perform(put("/api/projects/1")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(updatedProject)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Updated Project"))
                .andExpect(jsonPath("$.description").value("Updated Description"));
    }

    @Test
    @WithMockUser
    void deleteProject_Success() throws Exception {
        mockMvc.perform(delete("/api/projects/1"))
                .andExpect(status().isNoContent());
    }

    @Test
    void unauthorized_Access() throws Exception {
        mockMvc.perform(get("/api/projects")
                .param("username", "testuser"))
                .andExpect(status().isUnauthorized());
    }
} 