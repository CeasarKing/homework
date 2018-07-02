package com.lin.ui.controller.impl;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.lin.beans.Student;
import com.lin.service.UserService;
import com.lin.ui.controller.UserController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(maxAge = 3600,origins = {"http://192.168.1.102:3000","http://localhost:3000"})
@RestController
public class UserControllerImpl implements UserController {

    @Autowired private UserService userService;

    @PostMapping("/login")
    @Override
    public boolean login(HttpSession session, HttpServletResponse response,
                         String username, String password,Integer type) {
        if (username!=null && password !=null){
            System.out.println(username);
            Student student = userService.login(username,password,type);
            if (student!=null) {
                session.setAttribute("user", student);
                return true;
            }
        }
        return false;
    }

    @GetMapping("/get/user")
    @Override
    public String getStudent(HttpSession session) {
        Student student= (Student) session.getAttribute("user");
        if (student!=null)
            return new Gson().toJson(student);
        else
            return "false";
    }


    @RequestMapping("/logout")
    @Override
    public boolean logout(HttpSession session) {
        session.removeAttribute("user");
        return true;
    }

    @GetMapping("/stus")
    @Override
    public String getAllStudent() {
        List<Map<String,Object>>resList =new ArrayList<>();
        userService.queryAllStudent().
                forEach(student -> resList.add(new HashMap<>(){{
            put("id",student.getId());
            put("name",student.getName());
            put("card",student.getCardId());
            put("age",student.getAge());
            put("gender",student.getGender());
            put("maxLend",student.getMaxLendItem());
            put("hasGet",student.getHasBooks());
        }}));

        return new Gson().toJson(resList,
                new TypeToken<List<Map<String,Object>>>(){}.getType());
    }
}
