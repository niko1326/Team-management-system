package com.example.teammanagementsystem.config;

import com.example.teammanagementsystem.model.*;
import com.example.teammanagementsystem.repository.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DataInitializer {
    private static final Logger logger = LoggerFactory.getLogger(DataInitializer.class);

    @Autowired
    private ProjectRepository projectRepository;
    
    @Autowired
    private TaskRepository taskRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private TeamRepository teamRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Bean
    CommandLineRunner initDatabase() {
        return args -> {
            // Only initialize if the database is empty
            if (userRepository.count() == 0) {
                logger.info("Starting data initialization...");
                
                // Clear existing data in correct order
                taskRepository.deleteAll();
                projectRepository.deleteAll();
                
                // Remove team references from users before deleting teams
                userRepository.findAll().forEach(user -> {
                    user.setTeams(null);
                    userRepository.save(user);
                });
                
                userRepository.deleteAll();
                teamRepository.deleteAll();
                
                // Create teams first
                Team team1 = new Team();
                team1.setName("Development Team");
                Team savedTeam1 = teamRepository.save(team1);
                
                Team team2 = new Team();
                team2.setName("Design Team");
                Team savedTeam2 = teamRepository.save(team2);
                
                // Then create users
                User adminUser = new User();
                adminUser.setUsername("admin");
                adminUser.setEmail("admin@example.com");
                adminUser.setPassword(passwordEncoder.encode("admin"));
                adminUser.setAdmin(true);
                adminUser.getTeams().add(savedTeam1);
                userRepository.save(adminUser);
                
                User regularUser = new User();
                regularUser.setUsername("user");
                regularUser.setEmail("user@example.com");
                regularUser.setPassword(passwordEncoder.encode("user"));
                regularUser.setAdmin(false);
                regularUser.getTeams().add(savedTeam2);
                userRepository.save(regularUser);
                
                // Create and save projects
                Project project1 = new Project();
                project1.setName("Project Alpha");
                project1.setDescription("Main development project");
                project1.setTeam(savedTeam1);
                Project savedProject1 = projectRepository.save(project1);
                
                Project project2 = new Project();
                project2.setName("Project Beta");
                project2.setDescription("Design system project");
                project2.setTeam(savedTeam2);
                Project savedProject2 = projectRepository.save(project2);
                
                // Create tasks
                Task task1 = new Task();
                task1.setTitle("Implement login");
                task1.setDescription("Create login functionality");
                task1.setStatus(Task.TaskStatus.TODO);
                task1.setProject(savedProject1);
                taskRepository.save(task1);
                
                Task task2 = new Task();
                task2.setTitle("Design homepage");
                task2.setDescription("Create homepage mockups");
                task2.setStatus(Task.TaskStatus.TODO);
                task2.setProject(savedProject2);
                taskRepository.save(task2);
                
                // Log current state
                logger.info("Current database state:");
                logger.info("Users: {}", userRepository.count());
                logger.info("Teams: {}", teamRepository.count());
                logger.info("Projects: {}", projectRepository.count());
                logger.info("Tasks: {}", taskRepository.count());
            } else {
                logger.info("Database already contains data, skipping initialization");
            }
        };
    }
} 