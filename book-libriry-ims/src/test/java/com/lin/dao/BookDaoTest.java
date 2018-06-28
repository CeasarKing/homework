package com.lin.dao;

import com.lin.MainApplication;
import com.lin.beans.Book;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest(classes = MainApplication.class)
public class BookDaoTest {

    @Autowired BookDao bookDao;

    @Test
    public void testQueryLimit(){
        bookDao.querySomeBooks(50).forEach(book -> System.out.println(book));
    }

    @Test
    public void testQueryBooksByCategoryMap(){
        Map<String,Object> map=new HashMap<>();
        map.put("limit",50);
        System.out.println(bookDao.queryBooksByCategoryMap(map).size());
    }

    @Test
    public void testQueryAll(){
        bookDao.queryAllBooks();
    }

    @Test
    public void testQueryByName(){
        System.out.println(bookDao.queryBookByName("黑铁时代"));
    }

    @Test
    public void testQueryByBid(){
        System.out.println(bookDao.queryBookById(1653665483));
    }

    @Test
    public void testMapper(){
        List<Book> books=bookDao.queryAllBooks();
        Map<Integer,Book> bookMap = books.stream().collect(Collectors.toMap(Book::getbId, Book->Book));
        System.out.println(bookMap);
    }

    @Test
    public void testQueryRanks(){
        System.out.println(bookDao.queryRanksById(7204413));
    }

}
