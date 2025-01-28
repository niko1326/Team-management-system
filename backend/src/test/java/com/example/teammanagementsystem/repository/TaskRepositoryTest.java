package com.example.teammanagementsystem.repository;

import com.example.teammanagementsystem.model.Task;
import com.example.teammanagementsystem.model.Project;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
class TaskRepositoryTest {

    @Autowired
    private TestEntityManager entityManager;

    @Autowired
    private TaskRepository taskRepository;

    @Test
    void findByProject_Id_Success() {
        Project project = new Project();
        project.setName("Test Project");
        entityManager.persist(project);

        Task task = new Task();
        task.setTitle("Test Task");
        task.setDescription("Test Description");
        task.setStatus(Task.TaskStatus.TODO);
        task.setProject(project);
        entityManager.persist(task);
        entityManager.flush();

        List<Task> found = taskRepository.findByProject_Id(project.getId());

        assertFalse(found.isEmpty());
        assertEquals("Test Task", found.get(0).getTitle());
        assertEquals(project.getId(), found.get(0).getProject().getId());
    }

} 