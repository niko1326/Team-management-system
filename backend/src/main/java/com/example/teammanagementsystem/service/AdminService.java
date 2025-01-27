package com.example.teammanagementsystem.service;

import com.example.teammanagementsystem.model.Team;
import com.example.teammanagementsystem.model.User;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminService {
    private final TeamService teamService;
    private final UserService userService;

    public AdminService(TeamService teamService, UserService userService) {
        this.teamService = teamService;
        this.userService = userService;
    }

    public List<Team> getAllTeams() {
        return teamService.getAllTeams();
    }

    public Team getTeamById(Long id) {
        return teamService.getTeamById(id);
    }

    public Team createTeam(Team team) {
        return teamService.createTeam(team);
    }

    public Team updateTeam(Team team) {
        return teamService.updateTeam(team);
    }

    public void deleteTeam(Long id) {
        teamService.deleteTeam(id);
    }

    public List<User> getUsersByTeamId(Long teamId) {
        return userService.getUsersByTeamId(teamId);
    }
} 