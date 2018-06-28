package com.lin.service;

import com.lin.beans.Student;
import org.springframework.stereotype.Service;

@Service
public interface StudentService {

    Student login(String username,String password);

}
