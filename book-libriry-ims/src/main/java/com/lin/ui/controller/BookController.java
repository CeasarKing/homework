package com.lin.ui.controller;


import javax.servlet.http.HttpServletResponse;

public interface BookController {

     String getAllInfosAndTags(Integer limit, String tagIds, Boolean needTags,
                                      String cateJsonStr, String bookName,HttpServletResponse response);

     String getBookIntros(String type, Integer bid);

     String getOneBook(String name, Integer bid);
}
