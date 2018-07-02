package com.lin.service.impl;

import com.lin.beans.BookOrder;
import com.lin.dao.BookOrderDao;
import com.lin.service.ShoppingCartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Random;

@Service
public class ShoppingCartServiceImpl implements ShoppingCartService {

    private final BookOrderDao bookOrderDao;
    public ShoppingCartServiceImpl(@Autowired BookOrderDao bookOrderDao) {
        this.bookOrderDao = bookOrderDao;
    }

    @Transactional
    @Override
    public boolean submitForm(BookOrder order) {

        while (true){
            Integer randOrderId = new Random().nextInt(Integer.MAX_VALUE-100);
            //判定是否存在这个主键
            if (bookOrderDao.conatainPrimaryKey(randOrderId)==0){

                order.setOrderId(randOrderId);
                //①将订单的基本信息插入到数据库，返回生成的主键
                bookOrderDao.insertOrderForm(order);
                //②插入订单与书的一对多映射关系
                bookOrderDao.insertOrderMapBook(order.getBooks(),randOrderId);
                //③更新图书的借出状态
                bookOrderDao.updateLendedBooksState(order.getBooks(),order.getUserId());

                break;
            }
        }

        return true;
    }

}
