package com.example.teammanagementsystem.service;

import com.example.teammanagementsystem.model.Team;
import com.example.teammanagementsystem.model.User;
import com.example.teammanagementsystem.repository.TeamRepository;
import com.example.teammanagementsystem.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.web.server.ResponseStatusException;

import java.util.*;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

class TeamServiceTest {

    @Mock
    private TeamRepository teamRepository;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private TeamService teamService;

    private Team testTeam;
    private User testUser;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        
        testTeam = new Team();
        testTeam.setId(1L);
        testTeam.setName("Test Team");
        testTeam.setUsers(new ArrayList<>());
        testTeam.setProjects(new ArrayList<>());
        
        testUser = new User();
        testUser.setId(1L);
        testUser.setUsername("testuser");
        testUser.setTeams(new HashSet<>());
    }

    @Test
    void getAllTeams_Success() {
        when(teamRepository.findAll()).thenReturn(Arrays.asList(testTeam));
        
        List<Team> results = teamService.getAllTeams();
        
        assertEquals(1, results.size());
        assertEquals("Test Team", results.get(0).getName());
    }

    @Test
    void getTeamById_Success() {
        when(teamRepository.findById(1L)).thenReturn(Optional.of(testTeam));
        
        Team result = teamService.getTeamById(1L);
        
        assertNotNull(result);
        assertEquals("Test Team", result.getName());
    }

    @Test
    void getTeamById_NotFound() {
        when(teamRepository.findById(1L)).thenReturn(Optional.empty());
        
        assertThrows(ResponseStatusException.class, () -> teamService.getTeamById(1L));
    }

    @Test
    void createTeam_Success() {
        when(teamRepository.save(any(Team.class))).thenReturn(testTeam);
        
        Team result = teamService.createTeam(testTeam);
        
        assertNotNull(result);
        assertEquals("Test Team", result.getName());
    }

    @Test
    void updateTeam_Success() {
        when(teamRepository.findById(1L)).thenReturn(Optional.of(testTeam));
        when(teamRepository.save(any(Team.class))).thenReturn(testTeam);
        
        Team result = teamService.updateTeam(testTeam);
        
        assertNotNull(result);
        assertEquals("Test Team", result.getName());
    }

    @Test
    void deleteTeam_Success() {
        when(teamRepository.findById(1L)).thenReturn(Optional.of(testTeam));
        doNothing().when(teamRepository).delete(any(Team.class));
        
        teamService.deleteTeam(1L);
        
        verify(teamRepository).delete(testTeam);
    }
} 