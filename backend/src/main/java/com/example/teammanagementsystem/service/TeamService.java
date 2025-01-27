package com.example.teammanagementsystem.service;

import com.example.teammanagementsystem.model.Team;
import com.example.teammanagementsystem.model.Project;
import com.example.teammanagementsystem.repository.TeamRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TeamService {

    private final TeamRepository teamRepository;
    private static final Logger logger = LoggerFactory.getLogger(TeamService.class);

    @Autowired
    public TeamService(TeamRepository teamRepository) {
        this.teamRepository = teamRepository;
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
        teamRepository.deleteById(id);
    }

    public List<Project> getProjectsByTeamId(Long teamId) {
        Team team = getTeamById(teamId);
        return team.getProjects();
    }
}
