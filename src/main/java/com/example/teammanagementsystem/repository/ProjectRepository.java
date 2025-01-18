package com.example.teammanagementsystem.repository;

import com.example.teammanagementsystem.model.Project;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectRepository extends JpaRepository<Project, Long> {
}
