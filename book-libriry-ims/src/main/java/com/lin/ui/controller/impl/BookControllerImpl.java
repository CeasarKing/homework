package com.lin.ui.controller.impl;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.lin.beans.Book;
import com.lin.beans.LendedBook;
import com.lin.ui.controller.BookController;
import com.lin.service.BookInfoService;
import com.lin.service.BookIntroService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@CrossOrigin(origins = {"http://192.168.1.102:3000","http://localhost:3000"},maxAge = 3600)
@RestController
public class BookControllerImpl implements BookController {

    private final BookInfoService bookInfoService;
    private final BookIntroService bookIntroService;
    @Autowired
    public BookControllerImpl(BookInfoService bookInfoService, BookIntroService bookIntroService) {
        this.bookInfoService = bookInfoService;
        this.bookIntroService = bookIntroService;
    }

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

        Map<String, Object> modelMap= bookInfoService.getInfoByCategoryMap(categoryMap,needTags);

        return new Gson().toJson(modelMap);
    }

    //获取小说的简介
    @GetMapping("/intros")
    @Override
    public String getBookIntros(String type, Integer bid) {

        List<String> introList= bookIntroService.queryBookIntros(type,bid);
        return new Gson().toJson(introList);
    }

    @GetMapping("/one")
    @Override
    public String getOneBook(@RequestParam(required = false) String bookName,
                             @RequestParam(required = false) Integer bookId){
        return new Gson().toJson(bookInfoService.getOneBook(bookName,bookId));
    }

    @GetMapping("/lends")
    @Override
    public List<Map> getAllLendbooks() {

        List<LendedBook> books = bookInfoService.getAllLendBooks();

        return books.stream().map(book->new HashMap(){{
            put("index",book.getbId());
            put("isbn",book.getISBN());
            put("img","http://localhost:8080/img/" + book.getbId());
            put("name",book.getBookName());
            put("author",book.getAuthor());
            put("putDate",book.getPublicTime());
            put("lenderId",book.getLenderId());
            put("lendDate",book.getLendTime());
            put("returnDate",book.getRetTime());
            put("price",book.getPrice());
            put("state",book.getLenderId()==-1?"1":"0");
        }}).collect(Collectors.toList());
    }

    @GetMapping("/exsit")
    @Override
    public boolean queryBookExist(String type, String value) {
        System.out.println(bookInfoService.getBookExsit(type,value));
        return bookInfoService.getBookExsit(type,value);
    }

    @PostMapping("/add")
    @Override
    public boolean addBook(Book book) {
        try {
            return bookInfoService.addBook(book);
        }catch (Exception e){e.printStackTrace();}
        return false;
    }


}
