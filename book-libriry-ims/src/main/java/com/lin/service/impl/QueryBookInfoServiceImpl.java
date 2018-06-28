package com.lin.service.impl;

import com.lin.beans.Book;
import com.lin.beans.Tag;
import com.lin.dao.BookDao;
import com.lin.dao.BookIntroDao;
import com.lin.dao.TagsDao;
import com.lin.service.QueryBookInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class QueryBookInfoServiceImpl implements QueryBookInfoService {

    @Autowired private BookDao bookDao;
    @Autowired private TagsDao tagsDao;

    @Override
    public Map<String, Object> getAllInfosAndTags() {

        List<Book> books=bookDao.queryAllBooks();

        Map<Integer,Tag> tagMap = getAllTaps();

        Map<String,Object>resMap=new HashMap<>();
        resMap.put("books",books);
        resMap.put("tags",tagMap);

        return resMap;
    }

    //不再添加的方法
    @Override
    public Map<String,Object> getInfoByCategoryMap(Map<String, Object> map, Boolean needTags) {

        Map<String,Object>resMap=new HashMap<>();

        List<Book> books=bookDao.queryBooksByCategoryMap(map);

        resMap.put("books",books);

        if (needTags!=null && needTags){
            Map<Integer,Tag> tagMap=getAllTaps();
            resMap.put("tags",tagMap);
        }

        return resMap;
    }

    @Override
    public Book getOneBook(String bname, Integer bid) {
        Book book=null;
        if (bname!=null && !bname.equals("")){
            book=bookDao.queryBookByName(bname);
        }else if (bid!=null){
            book=bookDao.queryBookById(bid);
        }
        return book;
    }


    private Map<Integer,Tag> getAllTaps(){

        List<Tag> tags=tagsDao.queryAllTags();
        Map<Integer,Tag> tagMap = null;

        if (Tag.TAGS_MAP.size()==0){
            tagMap = tags.stream().collect(Collectors.toMap(Tag::getId,Tag->Tag));
            Tag.setTags(tagMap);
        }else {
            tagMap=Tag.TAGS_MAP;
        }

        return tagMap;
    }


}
