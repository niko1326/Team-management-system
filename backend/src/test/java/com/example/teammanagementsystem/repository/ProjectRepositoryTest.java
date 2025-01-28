package com.example.teammanagementsystem.repository;

import com.example.teammanagementsystem.model.Project;
import com.example.teammanagementsystem.model.Team;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
class ProjectRepositoryTest {

    @Autowired
    private TestEntityManager entityManager;

    @Autowired
    private ProjectRepository projectRepository;

    @Test
    void findByTeam_Success() {
        Team team = new Team();
        team.setName("Test Team");
        team.setUsers(new ArrayList<>());
        team.setProjects(new ArrayList<>());
        entityManager.persist(team);

        Project project = new Project();
        project.setName("Test Project");
        project.setDescription("Test Description");
        project.setTeam(team);
        project.setTasks(new HashSet<>());
        entityManager.persist(project);
        entityManager.flush();

        List<Project> found = projectRepository.findByTeam(team);

        assertFalse(found.isEmpty());
        assertEquals("Test Project", found.get(0).getName());
        assertEquals(team, found.get(0).getTeam());
    }

    @Test
    void findByName_Success() {
        Project project = new Project();
        project.setName("Test Project");
        project.setDescription("Test Description");
        project.setTasks(new HashSet<>());
        entityManager.persist(project);
        entityManager.flush();

        Optional<Project> found = projectRepository.findByName("Test Project");

        assertTrue(found.isPresent());
        assertEquals("Test Project", found.get().getName());
    }
} 