package com.example.teammanagementsystem.controller;

import com.example.teammanagementsystem.model.Team;
import com.example.teammanagementsystem.service.TeamService;
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

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(TeamController.class)
class TeamControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private TeamService teamService;

    private Team testTeam;

    @BeforeEach
    void setUp() {
        testTeam = new Team();
        testTeam.setId(1L);
        testTeam.setName("Test Team");
    }

    @Test
    @WithMockUser
    void createTeam_Success() throws Exception {
        when(teamService.createTeam(any())).thenReturn(testTeam);

        mockMvc.perform(post("/api/teams")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(testTeam)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.name").value("Test Team"));
    }

    @Test
    @WithMockUser
    void getAllTeams_Success() throws Exception {
        when(teamService.getAllTeams()).thenReturn(Arrays.asList(testTeam));

        mockMvc.perform(get("/api/teams"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].name").value("Test Team"));
    }

    @Test
    @WithMockUser
    void getTeamById_Success() throws Exception {
        when(teamService.getTeamById(1L)).thenReturn(testTeam);

        mockMvc.perform(get("/api/teams/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Test Team"));
    }

    @Test
    @WithMockUser
    void getTeamById_NotFound() throws Exception {
        when(teamService.getTeamById(1L)).thenReturn(null);

        mockMvc.perform(get("/api/teams/1"))
                .andExpect(status().isNotFound());
    }

    @Test
    @WithMockUser
    void deleteTeam_Success() throws Exception {
        mockMvc.perform(delete("/api/teams/1"))
                .andExpect(status().isNoContent());
    }
} 