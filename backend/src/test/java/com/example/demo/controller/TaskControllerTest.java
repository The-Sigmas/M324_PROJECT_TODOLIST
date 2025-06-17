package com.example.demo.controller;

import static org.junit.jupiter.api.Assertions.fail;
import org.aspectj.lang.annotation.Before;
import org.hamcrest.Matchers;
import org.json.JSONException;
import org.json.JSONObject;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import com.example.demo.repository.TaskRepository;

import jakarta.transaction.Transactional;

@ExtendWith(SpringExtension.class)
@SpringBootTest
@AutoConfigureMockMvc
@TestPropertySource(locations = "classpath:application-test.properties")
@ActiveProfiles("test")
public class TaskControllerTest {
    @Autowired
    TaskController taskController;
    @Autowired
    TaskRepository taskRepository;

    @Autowired
    private MockMvc mockMvc;

    @Before(value = "")
    public void setUp() {
        this.mockMvc = MockMvcBuilders.standaloneSetup(taskController).build();
    }

    @BeforeEach
    public void cleanup() {
        taskRepository.deleteAll();
    }

    @Test
    @Transactional
    public void testEmptyTaskListViaREST() {
        try {
            mockMvc.perform(MockMvcRequestBuilders.get("/tasks"))
                    .andExpect(MockMvcResultMatchers.status().is(HttpStatus.OK.value()))
                    .andExpect(MockMvcResultMatchers.content().string(Matchers.containsString("[]")));
        } catch (Exception e) {
            fail("test failed: " + e.getMessage());
            e.printStackTrace();
        }
    }

    @Test
    @Transactional
    public void testAddTaskListViaREST() {
        final String task = "test task";
        JSONObject t = new JSONObject();
        try {
            t.put("taskdescription", task);
        } catch (JSONException e) {
            fail("crashed on creating JSON param");
        }
        try {
            mockMvc.perform(MockMvcRequestBuilders.post("/tasks")
                    .content(t.toString())
                    .contentType(MediaType.APPLICATION_JSON)
                    .characterEncoding("utf-8"))
                    .andExpect(MockMvcResultMatchers.status().is2xxSuccessful())
                    .andDo(MockMvcResultHandlers.print());
            mockMvc.perform(MockMvcRequestBuilders.get("/tasks"))
                    .andExpect(MockMvcResultMatchers.status().is(HttpStatus.OK.value()))
                    .andExpect(MockMvcResultMatchers.content().string(Matchers.containsString(task)));
        } catch (

        Exception e) {
            fail("test failed because " + e.getMessage());
            e.printStackTrace();
        }
    }
}
