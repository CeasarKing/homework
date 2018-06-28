package com.lin.ui.filter;

import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.CrossOrigin;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;

@Component
public class UserFilter implements Filter {

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        System.out.println("init");
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        HttpServletRequest req=(HttpServletRequest)request;
        HttpServletResponse resp=(HttpServletResponse) response;
        HttpSession session = req.getSession();

        //验证是否登录

        doAjaxCrossOrgin(req,resp);

        //将请求响应递交给下一个过滤器或者请求的servlet
        chain.doFilter(request,response);
    }

    //需要再让前端的ajax能够通过的配置
    private void doAjaxCrossOrgin(HttpServletRequest request,
                                  HttpServletResponse response){
        response.setHeader("Access-Control-Allow-Credentials","true");
    }

    //验证用户是否登录
    private void doValidateUser(HttpSession session,HttpServletResponse response){
        if (session.getAttribute("user")==null){
            try {
                response.sendRedirect("http://192.168.1.101:3000/");
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    @Override
    public void destroy() {
        System.out.println("destroy");
    }
}
