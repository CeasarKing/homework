package com.lin.dao;

import com.lin.MainApplication;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

@SpringBootTest(classes = MainApplication.class)
@RunWith(SpringJUnit4ClassRunner.class)
public class StudentForUserDaoTest {

    @Autowired
    private StudentForUserDao studentForUserDao;

    @Test
    public void testLogin(){
        System.out.println(studentForUserDao.login("Lin", "123456789"));
    }

}
