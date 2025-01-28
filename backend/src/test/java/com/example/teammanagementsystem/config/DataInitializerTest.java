package com.example.teammanagementsystem.config;

import com.example.teammanagementsystem.repository.*;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@ActiveProfiles("test")
class DataInitializerTest {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TeamRepository teamRepository;

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private TaskRepository taskRepository;

    @Test
    void testDataInitialization() {
        // Verify teams were created
        assertEquals(2, teamRepository.count(), "Should have created two teams");
        
        // Verify projects were created
        assertEquals(2, projectRepository.count(), "Should have created two projects");
        
        // Verify tasks were created
        assertEquals(2, taskRepository.count(), "Should have created two tasks");

        // Verify admin user was created
        var adminUser = userRepository.findByUsername("admin").get();
        assertTrue(adminUser.isAdmin(), "Admin user should have admin privileges");
        assertEquals(1, adminUser.getTeams().size(), "Admin should be in one team");
    }
} 