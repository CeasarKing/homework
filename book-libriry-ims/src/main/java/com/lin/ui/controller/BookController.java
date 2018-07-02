package com.lin.ui.controller;


import com.lin.beans.Book;
import com.lin.beans.LendedBook;

import javax.servlet.http.HttpServletResponse;
import java.util.List;
import java.util.Map;

public interface BookController {

     String getAllInfosAndTags(Integer limit, String tagIds, Boolean needTags,
                                      String cateJsonStr, String bookName,HttpServletResponse response);

     String getBookIntros(String type, Integer bid);

     String getOneBook(String name, Integer bid);

     List<Map> getAllLendbooks();

     boolean queryBookExist(String type,String value);

     boolean addBook(Book book);
}
