package com.example.teammanagementsystem.repository;

import com.example.teammanagementsystem.model.Project;
import com.example.teammanagementsystem.model.Team;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {
    // The basic CRUD operations are provided by JpaRepository

    @Query("SELECT p FROM Project p JOIN p.team t JOIN t.users u WHERE u.id = :userId")
    List<Project> findByUserId(@Param("userId") Long userId);

    List<Project> findByTeam(Team team);

    List<Project> findByTeamId(Long teamId);

    Optional<Project> findByName(String name);
}
