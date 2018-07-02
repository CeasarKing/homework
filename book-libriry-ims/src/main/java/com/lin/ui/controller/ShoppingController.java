package com.lin.ui.controller;

import com.lin.beans.LendedBook;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.List;

public interface ShoppingController {

    //在session的 订单类中添加 书号  如果已经有了就false  如果没有就返回true
    boolean addBookToCart(HttpSession session,Integer bid);

    boolean removeBookFromCart(HttpSession session,Integer bid);

    List<LendedBook> getBooks(HttpSession session);

    boolean submitOrder( HttpServletRequest request);

}
