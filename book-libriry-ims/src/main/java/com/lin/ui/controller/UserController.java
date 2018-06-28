package com.lin.ui.controller;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

public interface UserController {

    String login(HttpSession session, HttpServletResponse response, String username, String password);

    String logout(HttpSession session);

}
