package com.example.demo.entity;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;

public class TaskTest {

    @Test
    void testTaskdescription() {
        final String taskdescription = "DEMO";
        Task test = new Task();

        test.setTaskdescription(taskdescription);
        assertEquals(taskdescription, test.getTaskdescription());

    }
}
