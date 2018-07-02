package com.lin.service;

import com.lin.beans.Book;
import com.lin.beans.LendedBook;

import java.util.List;
import java.util.Map;

public interface BookInfoService {

    //查找所有的数据  只为了能返回 json
    Map<String,Object> getAllInfosAndTags();

    //限制获得的数量
    Map<String,Object> getInfoByCategoryMap(Map<String, Object> map, Boolean needTags);

    //得到一本图书
    Book getOneBook(String bname,Integer bid);

    //得到所有借书的信息
    List<LendedBook> getAllLendBooks();

    boolean getBookExsit(String type,String value);

    //添加一本书
    boolean addBook(Book book);
}
