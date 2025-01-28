package com.example.teammanagementsystem.service;

import com.example.teammanagementsystem.model.Team;
import com.example.teammanagementsystem.model.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

class AdminServiceTest {

    @Mock
    private TeamService teamService;

    @Mock
    private UserService userService;

    @InjectMocks
    private AdminService adminService;

    private Team testTeam;
    private User testUser;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        
        testTeam = new Team();
        testTeam.setId(1L);
        testTeam.setName("Test Team");

        testUser = new User();
        testUser.setId(1L);
        testUser.setUsername("testuser");
    }

    @Test
    void getAllTeams_Success() {
        when(teamService.getAllTeams()).thenReturn(Arrays.asList(testTeam));
        
        List<Team> results = adminService.getAllTeams();
        
        assertEquals(1, results.size());
        assertEquals("Test Team", results.get(0).getName());
        verify(teamService).getAllTeams();
    }

    @Test
    void getTeamById_Success() {
        when(teamService.getTeamById(1L)).thenReturn(testTeam);
        
        Team result = adminService.getTeamById(1L);
        
        assertNotNull(result);
        assertEquals("Test Team", result.getName());
        verify(teamService).getTeamById(1L);
    }

    @Test
    void createTeam_Success() {
        when(teamService.createTeam(any(Team.class))).thenReturn(testTeam);
        
        Team result = adminService.createTeam(testTeam);
        
        assertNotNull(result);
        assertEquals("Test Team", result.getName());
        verify(teamService).createTeam(testTeam);
    }

    @Test
    void updateTeam_Success() {
        when(teamService.updateTeam(any(Team.class))).thenReturn(testTeam);
        
        Team result = adminService.updateTeam(testTeam);
        
        assertNotNull(result);
        assertEquals("Test Team", result.getName());
        verify(teamService).updateTeam(testTeam);
    }

    @Test
    void deleteTeam_Success() {
        doNothing().when(teamService).deleteTeam(1L);
        
        adminService.deleteTeam(1L);
        
        verify(teamService).deleteTeam(1L);
    }

    @Test
    void getUsersByTeamId_Success() {
        when(userService.getUsersByTeamId(1L)).thenReturn(Arrays.asList(testUser));
        
        List<User> results = adminService.getUsersByTeamId(1L);
        
        assertEquals(1, results.size());
        assertEquals("testuser", results.get(0).getUsername());
        verify(userService).getUsersByTeamId(1L);
    }
} 