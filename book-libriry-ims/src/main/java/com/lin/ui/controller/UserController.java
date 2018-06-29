package com.lin.ui.controller;

import com.lin.beans.Student;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

public interface UserController {

    boolean login(HttpSession session, HttpServletResponse response, String username, String password);

    String getStudent(HttpSession session);

    boolean logout(HttpSession session);

}
