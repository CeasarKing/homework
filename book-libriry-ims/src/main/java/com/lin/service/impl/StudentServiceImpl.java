package com.lin.service.impl;

import com.lin.beans.Student;
import com.lin.dao.StudentForUserDao;
import com.lin.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StudentServiceImpl implements StudentService {


    @Autowired private StudentForUserDao studentForUserDao;

    @Override
    public Student login(String username, String password) {

        Student student=studentForUserDao.login(username,password);

        return student;
    }
}
