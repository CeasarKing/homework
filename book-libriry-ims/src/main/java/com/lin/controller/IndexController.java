package com.lin.controller;

import com.google.gson.Gson;
import com.lin.service.QueryBookInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@CrossOrigin(origins = "*",maxAge = 3600)
@RestController
public class IndexController {

    @RequestMapping("/index")
    public String toIndex(){
        return "index";
    }

    @Autowired private QueryBookInfoService queryBookInfoService;

    @RequestMapping("/infos")
    public String getAllInfosAndTags(){
        Map map=queryBookInfoService.getAllInfosAndTags();
        return new Gson().toJson(map);
    }


}
