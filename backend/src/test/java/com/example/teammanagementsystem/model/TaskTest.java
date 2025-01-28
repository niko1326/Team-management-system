package com.example.teammanagementsystem.model;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class TaskTest {

    private Task task;
    private Project project;

    @BeforeEach
    void setUp() {
        task = new Task();
        project = new Project();
        project.setId(1L);
        project.setName("Test Project");
    }

    @Test
    void testTaskCreation() {
        task.setId(1L);
        task.setTitle("Test Task");
        task.setDescription("Test Description");
        task.setStatus(Task.TaskStatus.TODO);
        task.setProject(project);

        assertEquals(1L, task.getId());
        assertEquals("Test Task", task.getTitle());
        assertEquals("Test Description", task.getDescription());
        assertEquals(Task.TaskStatus.TODO, task.getStatus());
        assertEquals(project, task.getProject());
    }

    @Test
    void testStatusUpdate() {
        task.setStatus(Task.TaskStatus.DONE);
        assertEquals(Task.TaskStatus.DONE, task.getStatus());
    }

    @Test
    void testEqualsAndHashCode() {
        Task task1 = new Task();
        task1.setId(1L);
        task1.setTitle("Test Task");

        Task task2 = new Task();
        task2.setId(1L);
        task2.setTitle("Test Task");

        assertEquals(task1, task2);
        assertEquals(task1.hashCode(), task2.hashCode());
    }
} 