package com.example.teammanagementsystem.service;

import com.example.teammanagementsystem.model.Comment;
import com.example.teammanagementsystem.repository.CommentRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentService {
    private final CommentRepository commentRepository;

    public CommentService(CommentRepository commentRepository) {
        this.commentRepository = commentRepository;
    }

    public List<Comment> getCommentsByTaskId(Long taskId) {
        return commentRepository.findByTaskId(taskId);
    }

    public List<Comment> getCommentsByProjectId(Long projectId) {
        return commentRepository.findByProjectId(projectId);
    }

    public Comment addComment(Comment comment) {
        return commentRepository.save(comment);
    }
}
