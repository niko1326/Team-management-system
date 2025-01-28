package com.example.teammanagementsystem.service;

import com.example.teammanagementsystem.model.User;
import com.example.teammanagementsystem.model.Team;
import com.example.teammanagementsystem.repository.UserRepository;
import com.example.teammanagementsystem.repository.TeamRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.server.ResponseStatusException;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private TeamRepository teamRepository;

    @Mock
    private TeamService teamService;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private UserService userService;

    private User testUser;
    private Team testTeam;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        
        testUser = new User();
        testUser.setId(1L);
        testUser.setUsername("testuser");
        testUser.setEmail("test@example.com");
        
        testTeam = new Team();
        testTeam.setId(1L);
        testTeam.setName("Test Team");
    }

    @Test
    void getAllUsers_Success() {
        when(userRepository.findAll()).thenReturn(Arrays.asList(testUser));
        
        List<User> results = userService.getAllUsers();
        
        assertEquals(1, results.size());
        assertEquals("testuser", results.get(0).getUsername());
    }

    @Test
    void getUserById_Success() {
        when(userRepository.findById(1L)).thenReturn(Optional.of(testUser));
        
        User result = userService.getUserById(1L);
        
        assertNotNull(result);
        assertEquals("testuser", result.getUsername());
    }

    @Test
    void getUserById_NotFound() {
        when(userRepository.findById(1L)).thenReturn(Optional.empty());
        
        assertThrows(RuntimeException.class, () -> userService.getUserById(1L));
    }

    @Test
    void createUser_Success() {
        when(userRepository.save(any(User.class))).thenReturn(testUser);
        
        User result = userService.createUser(testUser);
        
        assertNotNull(result);
        assertEquals("testuser", result.getUsername());
    }

    @Test
    void updateUser_Success() {
        when(userRepository.findById(1L)).thenReturn(Optional.of(testUser));
        when(userRepository.save(any(User.class))).thenReturn(testUser);
        
        User updatedUser = new User();
        updatedUser.setId(1L);
        updatedUser.setUsername("updateduser");
        updatedUser.setEmail("updated@example.com");
        
        User result = userService.updateUser(updatedUser);
        
        assertNotNull(result);
        assertEquals("updateduser", result.getUsername());
    }

    @Test
    void assignUserToTeam_Success() {
        when(userRepository.findById(1L)).thenReturn(Optional.of(testUser));
        when(teamRepository.findById(1L)).thenReturn(Optional.of(testTeam));
        when(userRepository.save(any(User.class))).thenReturn(testUser);
        
        userService.assignUserToTeam(1L, 1L);
        
        verify(userRepository).save(any(User.class));
    }

    @Test
    void assignUserToTeam_UserNotFound() {
        when(userRepository.findById(1L)).thenReturn(Optional.empty());
        
        assertThrows(ResponseStatusException.class, () -> 
            userService.assignUserToTeam(1L, 1L));
    }
} 