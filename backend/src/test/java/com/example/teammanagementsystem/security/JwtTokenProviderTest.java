package com.example.teammanagementsystem.security;

import com.example.teammanagementsystem.model.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.test.util.ReflectionTestUtils;

import static org.junit.jupiter.api.Assertions.*;

class JwtTokenProviderTest {

    private JwtTokenProvider jwtTokenProvider;
    private User testUser;

    @BeforeEach
    void setUp() {
        jwtTokenProvider = new JwtTokenProvider();
        ReflectionTestUtils.setField(jwtTokenProvider, "jwtSecret", "testSecretKey123456789testSecretKey123456789");
        ReflectionTestUtils.setField(jwtTokenProvider, "jwtExpirationMs", 3600000);

        testUser = new User();
        testUser.setId(1L);
        testUser.setUsername("testuser");
        testUser.setAdmin(false);
    }

    @Test
    void generateToken_Success() {
        String token = jwtTokenProvider.generateToken(testUser);
        
        assertNotNull(token);
        assertTrue(token.length() > 0);
    }

    @Test
    void getUsernameFromToken_Success() {
        String token = jwtTokenProvider.generateToken(testUser);
        String username = jwtTokenProvider.getUsernameFromToken(token);
        
        assertEquals("testuser", username);
    }

    @Test
    void validateToken_Success() {
        String token = jwtTokenProvider.generateToken(testUser);
        boolean isValid = jwtTokenProvider.validateToken(token);
        
        assertTrue(isValid);
    }

    @Test
    void validateToken_InvalidToken() {
        String invalidToken = "invalid.token.here";
        boolean isValid = jwtTokenProvider.validateToken(invalidToken);
        
        assertFalse(isValid);
    }

    @Test
    void isAdminFromToken_Success() {
        String token = jwtTokenProvider.generateToken(testUser);
        boolean isAdmin = jwtTokenProvider.isAdminFromToken(token);
        
        assertFalse(isAdmin);
    }

    @Test
    void isAdminFromToken_AdminUser() {
        testUser.setAdmin(true);
        String token = jwtTokenProvider.generateToken(testUser);
        boolean isAdmin = jwtTokenProvider.isAdminFromToken(token);
        
        assertTrue(isAdmin);
    }
} 