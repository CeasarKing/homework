package com.lin.service;

import com.lin.beans.Book;

import java.util.Map;

public interface QueryBookInfoService {

    //查找所有的数据  只为了能返回 json
    Map<String,Object> getAllInfosAndTags();

    //限制获得的数量
    Map<String,Object> getInfoByCategoryMap(Map<String, Object> map, Boolean needTags);

    //
    Book getOneBook(String bname,Integer bid);

}
