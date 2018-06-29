package com.lin.ui.controller.impl;

import com.google.gson.Gson;
import com.lin.beans.Student;
import com.lin.service.StudentService;
import com.lin.ui.controller.UserController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

@CrossOrigin(maxAge = 3600,origins = {"http://192.168.1.101:3000","http://localhost:3000"})
@RestController
public class UserControllerImpl implements UserController {

    @Autowired private StudentService studentService;

    @PostMapping("/login")
    @Override
    public boolean login(HttpSession session, HttpServletResponse response, String username, String password) {
        if (username!=null && password !=null){
            Student student = studentService.login(username,password);
            if (student!=null) {
                session.setAttribute("user", student);
                return true;
            }
        }
        return false;
    }

    @RequestMapping("/get/user")
    @Override
    public String getStudent(HttpSession session) {
        Student student= (Student) session.getAttribute("user");
        if (student!=null)
            return new Gson().toJson(student);
        else
            return "false";
    }


    @Override
    public boolean logout(HttpSession session) {
        session.removeAttribute("user");
        return true;
    }
}
