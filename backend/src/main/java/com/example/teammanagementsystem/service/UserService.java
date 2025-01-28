package com.example.teammanagementsystem.service;

import com.example.teammanagementsystem.model.User;
import com.example.teammanagementsystem.model.Team;
import com.example.teammanagementsystem.repository.UserRepository;
import com.example.teammanagementsystem.repository.TeamRepository;
import org.springframework.stereotype.Service;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final TeamRepository teamRepository;
    private final TeamService teamService;
    @Autowired
    private PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, TeamRepository teamRepository, TeamService teamService) {
        this.userRepository = userRepository;
        this.teamRepository = teamRepository;
        this.teamService = teamService;
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));
    }

    public User createUser(User user) {
        return userRepository.save(user);
    }

    public User updateUser(Long userId, User userUpdates) {
        User existingUser = userRepository.findById(userId)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));

        if (userUpdates.getUsername() != null) {
            existingUser.setUsername(userUpdates.getUsername());
        }
        if (userUpdates.getEmail() != null) {
            existingUser.setEmail(userUpdates.getEmail());
        }
        if (userUpdates.getPassword() != null) {
            existingUser.setPassword(passwordEncoder.encode(userUpdates.getPassword()));
        }
        if (userUpdates.isAdmin() != existingUser.isAdmin()) {
            existingUser.setAdmin(userUpdates.isAdmin());
        }

        return userRepository.save(existingUser);
    }

    public void deleteUser(Long userId) {
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
        
        // Remove user from all teams first
        user.getTeams().forEach(team -> {
            team.getUsers().remove(user);
            teamRepository.save(team);
        });
        user.getTeams().clear();
        
        userRepository.delete(user);
    }

    public List<User> getUsersByTeamId(Long teamId) {
        Team team = teamRepository.findById(teamId)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Team not found"));
        return team.getUsers();
    }

    public void assignUserToTeam(Long userId, Long teamId) {
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
        Team team = teamRepository.findById(teamId)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Team not found"));
        
        user.getTeams().add(team);
        userRepository.save(user);
    }

    public void removeUserFromTeam(Long userId, Long teamId) {
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
        Team team = teamRepository.findById(teamId)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Team not found"));
        
        user.getTeams().remove(team);
        team.getUsers().remove(user);
        
        userRepository.save(user);
        teamRepository.save(team);
    }
}
