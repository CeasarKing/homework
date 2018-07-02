package com.lin.service.impl;

import com.lin.beans.BookOrder;
import com.lin.beans.Student;
import com.lin.dao.BookOrderDao;
import com.lin.dao.StudenForAdmintDao;
import com.lin.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class MessageServiceImpl implements MessageService {

    private BookOrderDao bookOrderDao;
    private StudenForAdmintDao studenForAdmintDao;

    @Autowired
    public MessageServiceImpl(BookOrderDao bookOrderDao, StudenForAdmintDao studenForAdmintDao) {
        this.bookOrderDao = bookOrderDao;
        this.studenForAdmintDao = studenForAdmintDao;
    }

    @Override
    public Map<String, Object> getAllMsg() {

        List<BookOrder> orders = bookOrderDao.queryAllOrders();
        List<Student> students = new ArrayList<>();
        orders.forEach(order ->{

            order.getBooks().forEach(book->book.setAuthorIntro(null).setBookIntro(null));

            Student student = studenForAdmintDao.queryStudentById(order.getUserId());
            student.setPassword(null).
                    getHasBooks().forEach(book -> book.setBookIntro(null).setAuthorIntro(null));
            students.add(student);
        });

        return new HashMap<>(){{
            put("orders",orders);
            put("students",students);
        }};
    }
}
