package com.example.teammanagementsystem.dto;

public class LoginResponse {
    private String username;
    private boolean isAdmin;
    private String token;

    public LoginResponse(String username, boolean isAdmin, String token) {
        this.username = username;
        this.isAdmin = isAdmin;
        this.token = token;
    }

    // Getters and setters
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public boolean isAdmin() {
        return isAdmin;
    }

    public void setAdmin(boolean admin) {
        isAdmin = admin;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
} 