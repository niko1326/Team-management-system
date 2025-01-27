package com.example.teammanagementsystem.controller;

import com.example.teammanagementsystem.dto.AuthRequest;
import com.example.teammanagementsystem.dto.LoginResponse;
import com.example.teammanagementsystem.model.User;
import com.example.teammanagementsystem.service.AuthService;
import com.example.teammanagementsystem.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    private final AuthService authService;
    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest request) {
        try {
            User user = authService.validateUser(request.getUsername(), request.getPassword());
            String token = authService.generateToken(user);
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("token", token);
            response.put("isAdmin", user.isAdmin());
            response.put("username", user.getUsername());
            
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("success", false);
            errorResponse.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorResponse);
        }
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody AuthRequest request) {
        try {
            logger.info("Received signup request with data: username={}, email={}, isAdmin={}", 
                request.getUsername(), 
                request.getEmail(), 
                request.isAdmin());
            
            User user = new User(request.isAdmin());
            user.setUsername(request.getUsername());
            user.setPassword(request.getPassword());
            user.setEmail(request.getEmail());
            
            logger.info("Created user object before save: username={}, isAdmin={}", 
                user.getUsername(), 
                user.isAdmin());
            
            User savedUser = authService.createUser(user);
            
            logger.info("User saved: id={}, username={}, isAdmin={}", 
                savedUser.getId(),
                savedUser.getUsername(), 
                savedUser.isAdmin());
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("username", savedUser.getUsername());
            response.put("isAdmin", savedUser.isAdmin());
            response.put("email", savedUser.getEmail());
            response.put("id", savedUser.getId());
            
            logger.info("Sending response with isAdmin={}", savedUser.isAdmin());
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            logger.error("Error in signup: ", e);
            return ResponseEntity.badRequest().body(Map.of(
                "success", false,
                "message", e.getMessage()
            ));
        }
    }

    @PostMapping("/verify")
    public ResponseEntity<?> verifyToken(@RequestHeader("Authorization") String authHeader) {
        try {
            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                return ResponseEntity.ok(Map.of("valid", false));
            }

            String token = authHeader.substring(7);
            boolean isValid = authService.verifyToken(token);
            return ResponseEntity.ok(Map.of("valid", isValid));
        } catch (Exception e) {
            return ResponseEntity.ok(Map.of("valid", false));
        }
    }
} 