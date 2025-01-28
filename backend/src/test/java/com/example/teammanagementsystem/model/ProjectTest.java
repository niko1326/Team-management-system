package com.example.teammanagementsystem.model;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.HashSet;

import static org.junit.jupiter.api.Assertions.*;

class ProjectTest {

    private Project project;
    private Team team;
    private Task task;

    @BeforeEach
    void setUp() {
        project = new Project();
        team = new Team();
        team.setId(1L);
        team.setName("Test Team");
        task = new Task();
        task.setId(1L);
        task.setTitle("Test Task");
    }

    @Test
    void testProjectCreation() {
        project.setId(1L);
        project.setName("Test Project");
        project.setDescription("Test Description");
        project.setTeam(team);
        project.setTasks(new HashSet<>());

        assertEquals(1L, project.getId());
        assertEquals("Test Project", project.getName());
        assertEquals("Test Description", project.getDescription());
        assertEquals(team, project.getTeam());
        assertTrue(project.getTasks().isEmpty());
    }

    @Test
    void testTaskAssignment() {
        project.setTasks(new HashSet<>());
        project.getTasks().add(task);

        assertEquals(1, project.getTasks().size());
        assertTrue(project.getTasks().contains(task));
    }

    @Test
    void testEqualsAndHashCode() {
        Project project1 = new Project();
        project1.setId(1L);
        project1.setName("Test Project");

        Project project2 = new Project();
        project2.setId(1L);
        project2.setName("Test Project");

        assertEquals(project1, project2);
        assertEquals(project1.hashCode(), project2.hashCode());
    }
} 