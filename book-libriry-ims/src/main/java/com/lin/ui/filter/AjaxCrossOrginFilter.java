package com.lin.ui.filter;

import org.springframework.stereotype.Component;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class AjaxCrossOrginFilter implements Filter {
    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        System.out.println("init");
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response,
                         FilterChain chain) throws IOException, ServletException {

        HttpServletRequest req=(HttpServletRequest) request;
        HttpServletResponse resp= (HttpServletResponse) response;

        resp.setHeader("Access-Control-Allow-Credentials","true");

        chain.doFilter(req,resp);
    }

    @Override
    public void destroy() {
        System.out.println("destroy");
    }
}
