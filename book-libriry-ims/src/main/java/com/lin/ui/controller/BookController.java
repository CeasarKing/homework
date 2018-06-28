package com.lin.ui.controller;


public interface BookController {

     String getAllInfosAndTags(Integer limit, String tagIds, Boolean needTags,
                                      String cateJsonStr, String bookName);

     String getBookIntros(String type,Integer bid);

     String getOneBook(String name, Integer bid);
}
