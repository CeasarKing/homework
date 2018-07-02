package com.lin.service;

import com.lin.beans.Student;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface UserService {

    Student login(String username, String password, Integer type);

    List<Student> queryAllStudent();

}
