package com.example.teammanagementsystem.model;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.HashSet;

import static org.junit.jupiter.api.Assertions.*;

class UserTest {

    private User user;
    private Team team;

    @BeforeEach
    void setUp() {
        user = new User();
        team = new Team();
        team.setId(1L);
        team.setName("Test Team");
    }

    @Test
    void testUserCreation() {
        user.setId(1L);
        user.setUsername("testuser");
        user.setEmail("test@example.com");
        user.setPassword("password");
        user.setAdmin(false);
        user.setTeams(new HashSet<>());

        assertEquals(1L, user.getId());
        assertEquals("testuser", user.getUsername());
        assertEquals("test@example.com", user.getEmail());
        assertEquals("password", user.getPassword());
        assertFalse(user.isAdmin());
        assertTrue(user.getTeams().isEmpty());
    }

    @Test
    void testTeamAssignment() {
        user.setTeams(new HashSet<>());
        user.getTeams().add(team);

        assertEquals(1, user.getTeams().size());
        assertTrue(user.getTeams().contains(team));
    }

    @Test
    void testEqualsAndHashCode() {
        User user1 = new User();
        user1.setId(1L);
        user1.setUsername("testuser");

        User user2 = new User();
        user2.setId(1L);
        user2.setUsername("testuser");

        assertEquals(user1, user2);
        assertEquals(user1.hashCode(), user2.hashCode());
    }
} 