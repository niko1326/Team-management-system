package com.example.teammanagementsystem.repository;

import com.example.teammanagementsystem.model.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findByTaskId(Long taskId);
    List<Comment> findByProjectId(Long projectId);
}
