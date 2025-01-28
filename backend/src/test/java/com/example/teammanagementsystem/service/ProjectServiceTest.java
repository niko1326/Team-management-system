package com.example.teammanagementsystem.service;

import com.example.teammanagementsystem.model.Project;
import com.example.teammanagementsystem.model.Team;
import com.example.teammanagementsystem.model.User;
import com.example.teammanagementsystem.repository.ProjectRepository;
import com.example.teammanagementsystem.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.web.server.ResponseStatusException;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.HashSet;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

class ProjectServiceTest {

    @Mock
    private ProjectRepository projectRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private TeamService teamService;

    @InjectMocks
    private ProjectService projectService;

    private Project testProject;
    private Team testTeam;
    private User testUser;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        
        testTeam = new Team();
        testTeam.setId(1L);
        testTeam.setName("Test Team");

        testProject = new Project();
        testProject.setId(1L);
        testProject.setName("Test Project");
        testProject.setTeam(testTeam);

        testUser = new User();
        testUser.setId(1L);
        testUser.setUsername("testuser");
        testUser.setAdmin(false);
        testUser.setTeams(new HashSet<>(Arrays.asList(testTeam)));
    }

    @Test
    void getAllProjects_Success() {
        when(projectRepository.findAll()).thenReturn(Arrays.asList(testProject));
        
        List<Project> results = projectService.getAllProjects();
        
        assertEquals(1, results.size());
        assertEquals("Test Project", results.get(0).getName());
    }

    @Test
    void getProjectsByUser_AdminUser() {
        testUser.setAdmin(true);
        when(userRepository.findByUsername("testuser")).thenReturn(Optional.of(testUser));
        when(projectRepository.findAll()).thenReturn(Arrays.asList(testProject));
        
        List<Project> results = projectService.getProjectsByUser("testuser");
        
        assertEquals(1, results.size());
        assertEquals("Test Project", results.get(0).getName());
    }

    @Test
    void getProjectsByUser_RegularUser() {
        when(userRepository.findByUsername("testuser")).thenReturn(Optional.of(testUser));
        when(projectRepository.findByTeam(testTeam)).thenReturn(Arrays.asList(testProject));
        
        List<Project> results = projectService.getProjectsByUser("testuser");
        
        assertEquals(1, results.size());
        assertEquals("Test Project", results.get(0).getName());
    }

    @Test
    void getProjectsByUser_UserNotFound() {
        when(userRepository.findByUsername("nonexistent")).thenReturn(Optional.empty());
        
        assertThrows(ResponseStatusException.class, () -> 
            projectService.getProjectsByUser("nonexistent"));
    }

    @Test
    void deleteProject_Success() {
        when(projectRepository.findById(1L)).thenReturn(Optional.of(testProject));
        doNothing().when(projectRepository).delete(any(Project.class));
        
        projectService.deleteProject(1L);
        
        verify(projectRepository).delete(any(Project.class));
    }
} 