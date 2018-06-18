package com.lin.service.impl;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.lin.beans.Book;
import com.lin.beans.Tag;
import com.lin.dao.BookDao;
import com.lin.dao.TagsDao;
import com.lin.service.QueryBookInfoService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class QueryBookInfoServiceTest implements QueryBookInfoService {

    @Autowired private BookDao bookDao;
    @Autowired private TagsDao tagsDao;

    @Override
    public Map<String, Object> getAllInfosAndTags() {

        List<Book> books=bookDao.queryAllBooks();
        StringBuilder sb=new StringBuilder();

        try(
                BufferedReader br=new BufferedReader(new FileReader("F:\\IDEAprojects\\homework\\book-libriry-ims\\intro.txt"))
        ) {
            br.lines().collect(Collectors.toList()).forEach(s -> sb.append(s));
        }  catch (IOException e) {
            e.printStackTrace();
        }

        Map<String,Book> jsonMap=new Gson().
                fromJson(sb.toString(),new TypeToken<Map<String,Book>>(){}.getType());
        books.forEach(book ->{
            Book tempBook = jsonMap.get(book.getBookName());
            book.setBookIntro(tempBook.getBookIntro()).setAuthorIntro(tempBook.getAuthorIntro());
        });


        List<Tag> tags=tagsDao.queryAllTags();

        Map<Integer,Tag> tagMap=null;

        if (Tag.TAGS_MAP.size()==0){
            tagMap = tags.stream().collect(Collectors.toMap(Tag::getId,Tag->Tag));
            Tag.setTags(tagMap);
        }else {
            tagMap=Tag.TAGS_MAP;
        }

        Map<String,Object>resMap=new HashMap<>();
        resMap.put("books",books);
        resMap.put("tags",tagMap);

        return resMap;
    }



}
