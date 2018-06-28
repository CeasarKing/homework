package com.lin.ui.controller.impl;

import com.lin.beans.Student;
import com.lin.service.StudentService;
import com.lin.ui.controller.UserController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

@CrossOrigin(maxAge = 3600,origins = "http://192.168.1.101:3000")
@RestController
public class UserControllerImpl implements UserController {

    @Autowired private StudentService studentService;

    @RequestMapping("/login")
    @Override
    public String login(HttpSession session, HttpServletResponse response, String username, String password) {
        if (username!=null && password !=null){
            Student student = studentService.login(username,password);
            session.setAttribute("user",student);
            return "true";
        }else {
            return "false";
        }

    }

    @Override
    public String logout(HttpSession session) {
        session.removeAttribute("user");
        return "true";
    }
}
