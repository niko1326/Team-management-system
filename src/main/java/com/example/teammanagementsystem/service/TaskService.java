package com.example.teammanagementsystem.service;

import com.example.teammanagementsystem.model.Project;
import com.example.teammanagementsystem.model.Task;
import com.example.teammanagementsystem.repository.ProjectRepository;
import com.example.teammanagementsystem.repository.TaskRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TaskService {

    private static final Logger log = LoggerFactory.getLogger(TaskService.class);

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private ProjectRepository projectRepository;

    public List<Task> getAllTasks() {
        log.info("Fetching all tasks");
        return taskRepository.findAll();
    }

    public List<Task> getTasksByProjectId(Long projectId) {
        log.info("Fetching tasks for project ID: {}", projectId);
        try {
            List<Task> tasks = taskRepository.findByProject_Id(projectId);
            log.info("Found {} tasks for project ID: {}", tasks.size(), projectId);
            return tasks;
        } catch (Exception e) {
            log.error("Error fetching tasks for project ID: {}", projectId, e);
            throw new RuntimeException("Failed to fetch tasks for project", e);
        }
    }

    public Optional<Task> getTaskById(Long id) {
        log.info("Fetching task by ID: {}", id);
        return taskRepository.findById(id);
    }

    public Task saveTask(Task task) {
        log.info("Saving task: {}", task.getTitle());
        if (task.getProject() != null && task.getProject().getId() != null) {
            Project project = projectRepository.findById(task.getProject().getId())
                    .orElseThrow(() -> new RuntimeException("Project not found"));
            task.setProject(project);
        }
        return taskRepository.save(task);
    }

    public Optional<Task> updateTask(Long id, Task updatedTask) {
        log.info("Updating task with ID: {}", id);
        return taskRepository.findById(id)
                .map(existingTask -> {
                    existingTask.setTitle(updatedTask.getTitle());
                    existingTask.setDescription(updatedTask.getDescription());
                    existingTask.setStatus(updatedTask.getStatus());
                    existingTask.setDueDate(updatedTask.getDueDate());
                    
                    if (updatedTask.getProject() != null && updatedTask.getProject().getId() != null) {
                        Project project = projectRepository.findById(updatedTask.getProject().getId())
                                .orElseThrow(() -> new RuntimeException("Project not found"));
                        existingTask.setProject(project);
                    }
                    
                    log.info("Saving updated task");
                    return taskRepository.save(existingTask);
                });
    }

    public void deleteTask(Long id) {
        log.info("Deleting task with ID: {}", id);
        taskRepository.deleteById(id);
    }

    public Optional<Task> updateTaskStatus(Long id, String status) {
        return taskRepository.findById(id).map(task -> {
            task.setStatus(Task.TaskStatus.valueOf(status));
            return taskRepository.save(task);
        });
    }

}
