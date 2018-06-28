package com.lin.service;

import com.lin.MainApplication;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest(classes = MainApplication.class)
public class UserServiceTest {

    @Autowired private StudentService studentService;

    @Test
    public void testLogin(){
        System.out.println(studentService.login("Lin","123456789"));
    }


}
