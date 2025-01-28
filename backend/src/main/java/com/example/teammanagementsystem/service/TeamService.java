package com.example.teammanagementsystem.service;

import com.example.teammanagementsystem.model.Team;
import com.example.teammanagementsystem.model.Project;
import com.example.teammanagementsystem.model.User;
import com.example.teammanagementsystem.repository.TeamRepository;
import com.example.teammanagementsystem.repository.UserRepository;
import com.example.teammanagementsystem.repository.ProjectRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Set;
import java.util.HashSet;

@Service
public class TeamService {

    private final TeamRepository teamRepository;
    private final UserRepository userRepository;
    private final ProjectRepository projectRepository;
    private static final Logger logger = LoggerFactory.getLogger(TeamService.class);

    @Autowired
    public TeamService(TeamRepository teamRepository, UserRepository userRepository, ProjectRepository projectRepository) {
        this.teamRepository = teamRepository;
        this.userRepository = userRepository;
        this.projectRepository = projectRepository;
    }

    public Team createTeam(Team team) {
        logger.debug("Creating new team: {}", team.getName());
        try {
            return teamRepository.save(team);
        } catch (Exception e) {
            logger.error("Error creating team: ", e);
            throw new RuntimeException("Failed to create team", e);
        }
    }

    public List<Team> getAllTeams() {
        return teamRepository.findAll();
    }

    public Team getTeamById(Long id) {
        return teamRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Team not found with id: " + id));
    }

    public Team updateTeam(Team team) {
        if (!teamRepository.existsById(team.getId())) {
            throw new RuntimeException("Team not found with id: " + team.getId());
        }
        return teamRepository.save(team);
    }

    public void deleteTeam(Long id) {
        Team team = teamRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Team not found"));

        // First remove all projects
        List<Project> projects = projectRepository.findByTeamId(id);
        projectRepository.deleteAll(projects);

        // Then handle the bidirectional relationship with users
        Set<User> users = new HashSet<>(team.getUsers()); // Create a copy to avoid ConcurrentModificationException
        for (User user : users) {
            user.getTeams().remove(team);
            userRepository.save(user);
        }
        team.getUsers().clear();
        teamRepository.save(team);

        // Finally delete the team
        teamRepository.delete(team);
    }

    public List<Project> getProjectsByTeamId(Long teamId) {
        Team team = getTeamById(teamId);
        return team.getProjects();
    }
}
