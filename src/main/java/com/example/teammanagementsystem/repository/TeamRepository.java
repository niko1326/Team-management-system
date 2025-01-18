package com.example.teammanagementsystem.repository;

import com.example.teammanagementsystem.model.Team;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TeamRepository extends JpaRepository<Team, Long> {
}
