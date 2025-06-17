package com.example.demo.repository;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import com.example.demo.entity.Task;

@ExtendWith(SpringExtension.class)
@SpringBootTest
@AutoConfigureMockMvc
@TestPropertySource(locations = "classpath:application-test.properties")
@ActiveProfiles("test")
public class TaskRepositoryTest {
    @Autowired
    TaskRepository TaskRepository;

    @Test
    public void testSaveAndRetrieve() {
        Task test = new Task();
        test.setTaskdescription("test");

        TaskRepository.save(test);
        assertNotNull(test.getId());

        Task retrivedTask = TaskRepository.findById(test.getId()).get();
        assertNotNull(retrivedTask);
        assertEquals(test.getId(), retrivedTask.getId());

    }

}
