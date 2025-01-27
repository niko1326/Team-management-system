package com.example.teammanagementsystem.service;

import com.example.teammanagementsystem.model.Project;
import com.example.teammanagementsystem.model.Team;
import com.example.teammanagementsystem.model.User;
import com.example.teammanagementsystem.repository.ProjectRepository;
import com.example.teammanagementsystem.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class ProjectService {

    private static final Logger logger = LoggerFactory.getLogger(ProjectService.class);

    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;
    private final TeamService teamService;

    @Autowired
    public ProjectService(ProjectRepository projectRepository, UserRepository userRepository, TeamService teamService) {
        this.projectRepository = projectRepository;
        this.userRepository = userRepository;
        this.teamService = teamService;
    }

    public List<Project> getAllProjects() {
        logger.debug("Fetching all projects");
        try {
            return projectRepository.findAll();
        } catch (Exception e) {
            logger.error("Error fetching all projects: ", e);
            throw e;
        }
    }

    public Project getProjectById(Long id) {
        return projectRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Project not found with id: " + id));
    }

    public Project createProject(Project project) {
        return projectRepository.save(project);
    }

    public Project updateProject(Long id, Project project) {
        Project existingProject = getProjectById(id);
        existingProject.setName(project.getName());
        existingProject.setDescription(project.getDescription());
        return projectRepository.save(existingProject);
    }

    public void deleteProject(Long id) {
        logger.debug("Deleting project with id: {}", id);
        try {
            Project project = getProjectById(id);
            projectRepository.delete(project);
            logger.debug("Deleted project with id: {}", id);
        } catch (Exception e) {
            logger.error("Error deleting project: ", e);
            throw e;
        }
    }

    public List<Project> getProjectsByUser(String username) {
        logger.debug("Fetching projects for user: {}", username);
        try {
            User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found: " + username));
                
            if (user.isAdmin()) {
                return getAllProjects();
            }
            
            return user.getTeams().stream()
                .flatMap(team -> projectRepository.findByTeam(team).stream())
                .distinct()
                .toList();
        } catch (Exception e) {
            logger.error("Error fetching projects for user {}: ", username, e);
            throw e;
        }
    }

    public List<Project> getProjectsByTeamId(Long teamId) {
        logger.debug("Fetching projects for team with id: {}", teamId);
        try {
            Team team = teamService.getTeamById(teamId);
            return projectRepository.findByTeamId(teamId);
        } catch (Exception e) {
            logger.error("Error fetching projects for team: ", e);
            throw e;
        }
    }
}
