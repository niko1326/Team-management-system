package com.example.teammanagementsystem.service;

import com.example.teammanagementsystem.model.User;
import com.example.teammanagementsystem.repository.UserRepository;
import com.example.teammanagementsystem.security.JwtTokenProvider;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

class AuthServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private JwtTokenProvider jwtTokenProvider;

    @Mock
    private AuthenticationManager authenticationManager;

    @InjectMocks
    private AuthService authService;

    private User testUser;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        
        testUser = new User();
        testUser.setId(1L);
        testUser.setUsername("testuser");
        testUser.setPassword("encodedPassword");
        testUser.setEmail("test@example.com");
    }

    @Test
    void validateUser_Success() {
        when(userRepository.findByUsername("testuser")).thenReturn(Optional.of(testUser));
        when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class)))
                .thenReturn(new UsernamePasswordAuthenticationToken(testUser, null));

        User result = authService.validateUser("testuser", "password");

        assertNotNull(result);
        assertEquals("testuser", result.getUsername());
    }

    @Test
    void createUser_Success() {
        when(passwordEncoder.encode("password")).thenReturn("encodedPassword");
        when(userRepository.save(any(User.class))).thenReturn(testUser);

        User newUser = new User();
        newUser.setUsername("testuser");
        newUser.setPassword("password");
        newUser.setEmail("test@example.com");

        User result = authService.createUser(newUser);

        assertNotNull(result);
        assertEquals("testuser", result.getUsername());
        verify(passwordEncoder).encode("password");
    }

    @Test
    void generateToken_Success() {
        when(jwtTokenProvider.generateToken(testUser)).thenReturn("test-token");

        String token = authService.generateToken(testUser);

        assertEquals("test-token", token);
        verify(jwtTokenProvider).generateToken(testUser);
    }

    @Test
    void validateUser_InvalidCredentials() {
        when(userRepository.findByUsername("testuser")).thenReturn(Optional.of(testUser));
        when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class)))
                .thenThrow(new RuntimeException("Invalid credentials"));

        assertThrows(RuntimeException.class, () -> 
            authService.validateUser("testuser", "wrongpassword"));
    }

    @Test
    void createUser_DuplicateUsername() {
        when(userRepository.findByUsername("testuser")).thenReturn(Optional.of(testUser));

        User newUser = new User();
        newUser.setUsername("testuser");
        newUser.setPassword("password");

        assertThrows(RuntimeException.class, () -> 
            authService.createUser(newUser));
    }
} 