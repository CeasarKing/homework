package com.lin.ui.filter;

import org.springframework.stereotype.Component;
import org.springframework.web.filter.GenericFilterBean;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;

@Component
public class IsLoginFilter extends GenericFilterBean {

    @Override
    public void doFilter(ServletRequest request, ServletResponse response,
                         FilterChain chain) throws IOException, ServletException {
        HttpServletRequest req= (HttpServletRequest) request;
        HttpServletResponse resp= (HttpServletResponse) response;

        //两个用于登陆的连接
        String exincludeUrl1 = "http://localhost:8080/login";
        String exincludeUrl2 = "http://192.168.1.101:8080/login";
        //一个获取图片的连接
        String exincludeUrl3 = "http://localhost:8080/img/";

        String url=req.getRequestURL().toString();

        if (!url.equals(exincludeUrl1) && !url.equals(exincludeUrl2) && !url.startsWith(exincludeUrl3)){
            HttpSession session=req.getSession();
            if (session.getAttribute("user")==null){
                resp.setStatus(HttpServletResponse.SC_FORBIDDEN);
                resp.setHeader("CONTEXTPATH","123456789");
            }
        }


        chain.doFilter(req,resp);

    }
}
