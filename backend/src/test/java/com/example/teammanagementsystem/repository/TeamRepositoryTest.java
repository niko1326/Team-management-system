package com.example.teammanagementsystem.repository;

import com.example.teammanagementsystem.model.Team;
import com.example.teammanagementsystem.model.User;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;

import java.util.ArrayList;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
class TeamRepositoryTest {

    @Autowired
    private TestEntityManager entityManager;

    @Autowired
    private TeamRepository teamRepository;

    @Test
    void findById_Success() {
        Team team = new Team();
        team.setName("Test Team");
        team.setUsers(new ArrayList<>());
        team.setProjects(new ArrayList<>());
        entityManager.persist(team);
        entityManager.flush();

        Optional<Team> found = teamRepository.findById(team.getId());

        assertTrue(found.isPresent());
        assertEquals("Test Team", found.get().getName());
    }

    @Test
    void findAll_Success() {
        Team team = new Team();
        team.setName("Test Team");
        team.setUsers(new ArrayList<>());
        team.setProjects(new ArrayList<>());
        entityManager.persist(team);
        entityManager.flush();

        Iterable<Team> teams = teamRepository.findAll();
        assertTrue(teams.iterator().hasNext());
    }
} 