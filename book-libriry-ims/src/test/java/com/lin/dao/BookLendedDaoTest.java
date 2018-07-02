package com.lin.dao;

import com.lin.MainApplication;
import com.lin.beans.Book;
import com.lin.beans.LendedBook;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.util.List;
import java.util.Map;
import java.util.stream.Collector;
import java.util.stream.Collectors;


@SpringBootTest(classes = MainApplication.class)
@RunWith(SpringJUnit4ClassRunner.class)
public class BookLendedDaoTest {

    @Autowired private BookLendedDao bookLendedDao;
    @Autowired private BookDao bookDao;

    @Test
    public void testQueryById(){
        LendedBook book=bookLendedDao.queryLendBookById(922204);
        System.out.println(book);
    }

    @Test
    public void testQueryBySid(){
        List<LendedBook> books = bookLendedDao.queryLendBookByStuId(101752);
        books.forEach(System.out::println);
    }

    @Test
    public void testQueryAll(){

        long l1=System.currentTimeMillis();

        System.out.println(bookLendedDao.queryAllBooks().size());

        long l3=System.currentTimeMillis();


        System.out.println(l3-l1);
    }

}
