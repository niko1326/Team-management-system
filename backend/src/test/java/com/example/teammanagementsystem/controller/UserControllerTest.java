package com.example.teammanagementsystem.controller;

import com.example.teammanagementsystem.config.SecurityConfig;
import com.example.teammanagementsystem.model.User;
import com.example.teammanagementsystem.security.JwtAuthenticationFilter;
import com.example.teammanagementsystem.service.AuthService;
import com.example.teammanagementsystem.service.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;
import java.util.HashSet;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;

@WebMvcTest(UserController.class)
@Import(SecurityConfig.class)
class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private UserService userService;

    @MockBean
    private AuthService authService;

    @MockBean
    private JwtAuthenticationFilter jwtAuthenticationFilter;

    private User testUser;

    @BeforeEach
    void setUp() {
        testUser = new User();
        testUser.setId(1L);
        testUser.setUsername("testuser");
        testUser.setEmail("test@example.com");
        testUser.setTeams(new HashSet<>());
        testUser.setPassword("password");
    }

    @Test
    @WithMockUser
    void getAllUsers_Success() throws Exception {
        when(userService.getAllUsers()).thenReturn(Arrays.asList(testUser));

        mockMvc.perform(get("/api/users")
                .with(csrf())
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$[0].username").value("testuser"));
    }

    @Test
    @WithMockUser
    void getUserById_Success() throws Exception {
        when(userService.getUserById(1L)).thenReturn(testUser);

        mockMvc.perform(get("/api/users/1")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.username").value("testuser"));
    }

    @Test
    @WithMockUser
    void getUserById_NotFound() throws Exception {
        when(userService.getUserById(999L)).thenThrow(new RuntimeException("User not found"));

        mockMvc.perform(get("/api/users/999"))
                .andExpect(status().isInternalServerError());
    }

    @Test
    @WithMockUser
    void createUser_Success() throws Exception {
        when(userService.createUser(any(User.class))).thenReturn(testUser);

        mockMvc.perform(post("/api/users")
                .with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(testUser)))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.username").value("testuser"));
    }

    @Test
    @WithMockUser
    void updateUser_Success() throws Exception {
        User updatedUser = new User();
        updatedUser.setId(1L);
        updatedUser.setUsername("updateduser");
        updatedUser.setEmail("updated@example.com");

        when(userService.updateUser(any(User.class))).thenReturn(updatedUser);

        mockMvc.perform(put("/api/users/1")
                .with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(updatedUser)))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.username").value("updateduser"));
    }

    @Test
    @WithMockUser
    void updateUser_IdMismatch() throws Exception {
        User updatedUser = new User();
        updatedUser.setId(2L); // Different from path variable
        updatedUser.setUsername("updateduser");

        mockMvc.perform(put("/api/users/1")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(updatedUser)))
                .andExpect(status().isOk()); // The controller sets the ID from the path
    }

    @Test
    void unauthorized_Access() throws Exception {
        mockMvc.perform(get("/api/users"))
                .andExpect(status().isUnauthorized());
    }
} 