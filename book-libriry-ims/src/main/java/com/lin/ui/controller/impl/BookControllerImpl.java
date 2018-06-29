package com.lin.ui.controller.impl;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.lin.ui.controller.BookController;
import com.lin.service.QueryBookInfoService;
import com.lin.service.QueryBookIntroService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = {"http://192.168.1.101:3000","http://localhost:3000"},maxAge = 3600)
@RestController
public class BookControllerImpl implements BookController {


    @Autowired private QueryBookInfoService queryBookInfoService;
    @Autowired private QueryBookIntroService queryBookIntroService;

    //获取书本的基本信息
    @RequestMapping("/infos")
    @Override
    public String getAllInfosAndTags(@RequestParam(required = false) Integer limit,
                                     @RequestParam(required = false) String tagIds,
                                     @RequestParam(required = false) Boolean needTags,
                                     @RequestParam(required = false) String cateJsonStr,
                                     @RequestParam(required = false) String bookName,
                                     HttpServletResponse response){

        Map<String,Object> categoryMap=new HashMap<>();

        //查找到的分类的ids
        List<Integer> tagIdList=null;
        if (tagIds!=null){
            tagIdList = new Gson().fromJson(tagIds,new TypeToken<List<Integer>>(){}.getType());
            categoryMap.put("inTagIds",tagIdList);
        }

        if (limit!=null && limit>0){
            categoryMap.put("limit",limit);
        }

        if (cateJsonStr!=null){
            Map<String,String> map=new Gson().
                    fromJson(cateJsonStr,new TypeToken<Map<String,String>>(){}.getType());
            categoryMap.put("topCate",map);
        }

        if (bookName!=null){
            categoryMap.put("bookName",bookName);
        }

        Map modelMap=queryBookInfoService.getInfoByCategoryMap(categoryMap,needTags);

        return new Gson().toJson(modelMap);
    }

    //获取小说的简介
    @GetMapping("/intros")
    @Override
    public String getBookIntros(String type, Integer bid) {

        List<String> introList=queryBookIntroService.queryBookIntros(type,bid);

        return new Gson().toJson(introList);
    }

    @GetMapping("/one")
    @Override
    public String getOneBook(@RequestParam(required = false) String bookName,
                             @RequestParam(required = false) Integer bookId){
        return new Gson().toJson(queryBookInfoService.getOneBook(bookName,bookId));
    }

}
