package com.example.teammanagementsystem.model;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class TeamTest {

    private Team team;
    private User user;
    private Project project;

    @BeforeEach
    void setUp() {
        team = new Team();
        user = new User();
        user.setId(1L);
        user.setUsername("testuser");
        project = new Project();
        project.setId(1L);
        project.setName("Test Project");
    }

    @Test
    void testTeamCreation() {
        team.setId(1L);
        team.setName("Test Team");
        team.setUsers(new ArrayList<>());
        team.setProjects(new ArrayList<>());

        assertEquals(1L, team.getId());
        assertEquals("Test Team", team.getName());
        assertTrue(team.getUsers().isEmpty());
        assertTrue(team.getProjects().isEmpty());
    }

    @Test
    void testUserAssignment() {
        List<User> users = new ArrayList<>();
        users.add(user);
        team.setUsers(users);

        assertEquals(1, team.getUsers().size());
        assertTrue(team.getUsers().contains(user));
    }

    @Test
    void testProjectAssignment() {
        List<Project> projects = new ArrayList<>();
        projects.add(project);
        team.setProjects(projects);

        assertEquals(1, team.getProjects().size());
        assertTrue(team.getProjects().contains(project));
    }

    @Test
    void testEqualsAndHashCode() {
        Team team1 = new Team();
        team1.setId(1L);
        team1.setName("Test Team");

        Team team2 = new Team();
        team2.setId(1L);
        team2.setName("Test Team");

        assertEquals(team1, team2);
        assertEquals(team1.hashCode(), team2.hashCode());
    }
} 