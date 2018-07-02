package com.lin.dao;


import com.lin.MainApplication;
import com.lin.beans.BookOrder;
import com.lin.beans.LendedBook;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.util.ArrayList;
import java.util.List;

@SpringBootTest(classes = MainApplication.class)
@RunWith(SpringJUnit4ClassRunner.class)
public class BookOrderDaoTest {

    @Autowired private BookOrderDao bookOrderDao;

    @Test
    public void testInsertOrder(){

        BookOrder order=new BookOrder(101752,"address","remarks",1);


    }

    @Test
    public void testInsertOrderMapBook(){
        List<LendedBook> books=new ArrayList<>();
        books.add((LendedBook) new LendedBook().setLendTime("2018-6-30").setRetTime("2018-07-17").setbId(993311571));
        books.add((LendedBook) new LendedBook().setLendTime("2018-6-30").setRetTime("2018-07-17").setbId(993311572));
        bookOrderDao.insertOrderMapBook(books,1);
    }

    @Test
    public void updateLendedBooks(){
        List<LendedBook> books=new ArrayList<>();
        books.add((LendedBook) new LendedBook().setLendTime("2018-6-30").setRetTime("2018-07-17").setbId(993311571));
        books.add((LendedBook) new LendedBook().setLendTime("2018-6-30").setRetTime("2018-07-17").setbId(993311572));
        bookOrderDao.updateLendedBooksState(books,101752);
    }

    @Test
    public void testQueryAllOrders(){
        bookOrderDao.queryAllOrders().forEach(System.out::println);
    }
}
