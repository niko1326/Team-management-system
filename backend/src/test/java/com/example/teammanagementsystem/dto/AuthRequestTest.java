package com.example.teammanagementsystem.dto;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class AuthRequestTest {

    @Test
    void testAuthRequestSettersAndGetters() {
        AuthRequest authRequest = new AuthRequest();
        authRequest.setUsername("testuser");
        authRequest.setPassword("password");
        authRequest.setEmail("test@example.com");
        authRequest.setAdmin(true);

        assertEquals("testuser", authRequest.getUsername());
        assertEquals("password", authRequest.getPassword());
        assertEquals("test@example.com", authRequest.getEmail());
        assertTrue(authRequest.isAdmin());
    }

    @Test
    void testEquality() {
        AuthRequest request1 = new AuthRequest();
        request1.setUsername("testuser");
        request1.setPassword("password");

        AuthRequest request2 = new AuthRequest();
        request2.setUsername("testuser");
        request2.setPassword("password");

        AuthRequest request3 = new AuthRequest();
        request3.setUsername("otheruser");
        request3.setPassword("password");

        assertEquals(request1.getUsername(), request2.getUsername());
        assertNotEquals(request1.getUsername(), request3.getUsername());
    }
} 