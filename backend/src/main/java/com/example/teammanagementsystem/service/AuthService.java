package com.example.teammanagementsystem.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import com.example.teammanagementsystem.dto.AuthRequest;
import com.example.teammanagementsystem.model.User;
import com.example.teammanagementsystem.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import java.util.Date;
import io.jsonwebtoken.security.Keys;
import javax.crypto.SecretKey;

@Service
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private static final SecretKey JWT_KEY = Jwts.SIG.HS256.key().build();
    private final long jwtExpiration = 86400000; // 24 hours in milliseconds

    @Autowired
    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User validateUser(String username, String password) {
        User user = userRepository.findByUsername(username)
            .orElseThrow(() -> new RuntimeException("User not found: " + username));
            
        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new RuntimeException("Invalid password for user: " + username);
        }
        
        return user;
    }

    public String generateToken(User user) {
        return Jwts.builder()
            .subject(user.getUsername())
            .claim("isAdmin", user.isAdmin())
            .issuedAt(new Date())
            .expiration(new Date(System.currentTimeMillis() + jwtExpiration))
            .signWith(JWT_KEY)
            .compact();
    }

    public User createUser(User user) {
        if (userRepository.findByUsername(user.getUsername()).isPresent()) {
            throw new RuntimeException("Username already exists");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    public boolean verifyToken(String token) {
        try {
            Jwts.parser()
                .verifyWith(JWT_KEY)
                .build()
                .parseSignedClaims(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public String getUsernameFromToken(String token) {
        try {
            return Jwts.parser()
                .verifyWith(JWT_KEY)
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .getSubject();
        } catch (Exception e) {
            return null;
        }
    }

    public boolean isAdminFromToken(String token) {
        try {
            return Jwts.parser()
                .verifyWith(JWT_KEY)
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .get("isAdmin", Boolean.class);
        } catch (Exception e) {
            return false;
        }
    }
} 