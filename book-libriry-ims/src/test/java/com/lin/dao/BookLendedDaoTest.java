package com.lin.dao;

import com.lin.MainApplication;
import com.lin.beans.LendedBook;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.util.List;


@SpringBootTest(classes = MainApplication.class)
@RunWith(SpringJUnit4ClassRunner.class)
public class BookLendedDaoTest {

    @Autowired private BookLendedDao bookLendedDao;

    @Test
    public void testQueryById(){
        LendedBook book=bookLendedDao.queryLendBookById(922204);
        System.out.println(book);
    }

    @Test
    public void testQueryBySid(){
        List<LendedBook> books = bookLendedDao.queryLendBookByStuId(101752);
        books.forEach(book-> System.out.println(book));
    }

}
