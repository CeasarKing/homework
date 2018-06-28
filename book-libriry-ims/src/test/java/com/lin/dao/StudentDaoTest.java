package com.lin.dao;

import com.lin.MainApplication;
import com.lin.beans.Student;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

@SpringBootTest(classes = MainApplication.class)
@RunWith(SpringJUnit4ClassRunner.class)
public class StudentDaoTest {

    @Autowired private StudenForAdmintDao studenForAdmintDao;

    @Test
    public void testQueryStdentById(){
        Student student= studenForAdmintDao.queryStudentById(101752);
        System.out.println(student);
    }

    @Test
    public void testQueryAllStudents(){
        studenForAdmintDao.queryAllStudents().
                forEach(student ->
                        System.out.println(student));
    }

}
