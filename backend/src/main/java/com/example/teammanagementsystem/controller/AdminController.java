package com.example.teammanagementsystem.controller;

import com.example.teammanagementsystem.model.Team;
import com.example.teammanagementsystem.model.User;
import com.example.teammanagementsystem.model.Project;
import com.example.teammanagementsystem.service.TeamService;
import com.example.teammanagementsystem.service.UserService;
import com.example.teammanagementsystem.service.ProjectService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final TeamService teamService;
    private final UserService userService;
    private final ProjectService projectService;

    public AdminController(TeamService teamService, UserService userService, ProjectService projectService) {
        this.teamService = teamService;
        this.userService = userService;
        this.projectService = projectService;
    }

    @GetMapping("/teams")
    public ResponseEntity<List<Team>> getAllTeams() {
        return ResponseEntity.ok(teamService.getAllTeams());
    }

    @GetMapping("/teams/{id}")
    public ResponseEntity<Team> getTeamById(@PathVariable Long id) {
        return ResponseEntity.ok(teamService.getTeamById(id));
    }

    @PostMapping("/teams")
    public ResponseEntity<Team> createTeam(@RequestBody Team team) {
        return ResponseEntity.ok(teamService.createTeam(team));
    }

    @PutMapping("/teams/{id}")
    public ResponseEntity<Team> updateTeam(@PathVariable Long id, @RequestBody Team team) {
        team.setId(id);
        return ResponseEntity.ok(teamService.updateTeam(team));
    }

    @DeleteMapping("/teams/{id}")
    public ResponseEntity<Void> deleteTeam(@PathVariable Long id) {
        teamService.deleteTeam(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/teams/{teamId}/users")
    public ResponseEntity<List<User>> getUsersByTeamId(@PathVariable Long teamId) {
        return ResponseEntity.ok(userService.getUsersByTeamId(teamId));
    }

    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @PostMapping("/teams/{teamId}/users/{userId}")
    public ResponseEntity<Void> addUserToTeam(@PathVariable Long teamId, @PathVariable Long userId) {
        userService.assignUserToTeam(userId, teamId);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/teams/{teamId}/users/{userId}")
    public ResponseEntity<Void> removeUserFromTeam(@PathVariable Long teamId, @PathVariable Long userId) {
        userService.removeUserFromTeam(userId, teamId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/teams/{teamId}/projects")
    public ResponseEntity<List<Project>> getProjectsByTeamId(@PathVariable Long teamId) {
        return ResponseEntity.ok(projectService.getProjectsByTeamId(teamId));
    }
} 