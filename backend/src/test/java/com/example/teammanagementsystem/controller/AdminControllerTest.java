package com.example.teammanagementsystem.controller;

import com.example.teammanagementsystem.model.Team;
import com.example.teammanagementsystem.model.User;
import com.example.teammanagementsystem.model.Project;
import com.example.teammanagementsystem.service.TeamService;
import com.example.teammanagementsystem.service.UserService;
import com.example.teammanagementsystem.service.ProjectService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(AdminController.class)
class AdminControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private TeamService teamService;

    @MockBean
    private UserService userService;

    @MockBean
    private ProjectService projectService;

    private Team testTeam;
    private User testUser;
    private Project testProject;

    @BeforeEach
    void setUp() {
        testTeam = new Team();
        testTeam.setId(1L);
        testTeam.setName("Test Team");

        testUser = new User();
        testUser.setId(1L);
        testUser.setUsername("testuser");
        testUser.setAdmin(true);

        testProject = new Project();
        testProject.setId(1L);
        testProject.setName("Test Project");
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void getAllTeams_Success() throws Exception {
        when(teamService.getAllTeams()).thenReturn(Arrays.asList(testTeam));

        mockMvc.perform(get("/api/admin/teams"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].name").value("Test Team"));
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void getAllUsers_Success() throws Exception {
        when(userService.getAllUsers()).thenReturn(Arrays.asList(testUser));

        mockMvc.perform(get("/api/admin/users"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].username").value("testuser"));
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void getAllProjects_Success() throws Exception {
        when(projectService.getAllProjects()).thenReturn(Arrays.asList(testProject));

        mockMvc.perform(get("/api/admin/projects"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].name").value("Test Project"));
    }

    @Test
    @WithMockUser(roles = "USER")
    void getAllTeams_Forbidden() throws Exception {
        mockMvc.perform(get("/api/admin/teams"))
                .andExpect(status().isForbidden());
    }

    @Test
    void getAllTeams_Unauthorized() throws Exception {
        mockMvc.perform(get("/api/admin/teams"))
                .andExpect(status().isUnauthorized());
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void assignUserToTeam_Success() throws Exception {
        doNothing().when(userService).assignUserToTeam(1L, 1L);

        mockMvc.perform(post("/api/admin/users/1/teams/1"))
                .andExpect(status().isOk());
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void removeUserFromTeam_Success() throws Exception {
        doNothing().when(userService).removeUserFromTeam(1L, 1L);

        mockMvc.perform(delete("/api/admin/users/1/teams/1"))
                .andExpect(status().isOk());
    }
} 