package com.example.teammanagementsystem.security;

import com.example.teammanagementsystem.service.AuthService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collections;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final AuthService authService;

    @Autowired
    public JwtAuthenticationFilter(AuthService authService) {
        this.authService = authService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        
        String authHeader = request.getHeader("Authorization");
        
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            String username = authService.getUsernameFromToken(token);
            boolean isAdmin = authService.isAdminFromToken(token);
            
            if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                var authorities = isAdmin ? 
                    Collections.singleton(new SimpleGrantedAuthority("ROLE_ADMIN")) :
                    Collections.singleton(new SimpleGrantedAuthority("ROLE_USER"));
                    
                var authentication = new UsernamePasswordAuthenticationToken(
                    username, null, authorities);
                    
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        }
        
        filterChain.doFilter(request, response);
    }
} 