package com.lin.service.impl;

import com.lin.beans.Student;
import com.lin.dao.StudenForAdmintDao;
import com.lin.dao.StudentForUserDao;
import com.lin.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentServiceImpl implements UserService {

    private final StudentForUserDao studentForUserDao;
    private final StudenForAdmintDao studenForAdmintDao;

    @Autowired
    public StudentServiceImpl( StudentForUserDao studentForUserDao, StudenForAdmintDao studenForAdmintDao) {
        this.studentForUserDao = studentForUserDao;
        this.studenForAdmintDao = studenForAdmintDao;
    }

    @Override
    public Student login(String username, String password, Integer type) {
        return studentForUserDao.login(username,password,type);
    }

    @Override
    public List<Student> queryAllStudent() {
        return studenForAdmintDao.queryAllStudents();
    }
}
