package com.example.teammanagementsystem.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.teammanagementsystem.model.Task;
import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findByProjectId(Long projectId);
}
