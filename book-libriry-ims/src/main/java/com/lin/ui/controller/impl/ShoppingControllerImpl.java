package com.lin.ui.controller.impl;

import com.google.gson.Gson;
import com.lin.beans.BookOrder;
import com.lin.beans.LendedBook;
import com.lin.beans.Student;
import com.lin.service.ShoppingCartService;
import com.lin.ui.controller.ShoppingController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = {"http://192.168.1.102:3000","http://localhost:3000"},maxAge = 3600)
@RequestMapping("/order")
@RestController
public class ShoppingControllerImpl implements ShoppingController {

    private ShoppingCartService shoppingCartService;
    public ShoppingControllerImpl(@Autowired  ShoppingCartService shoppingCartService) {
        this.shoppingCartService = shoppingCartService;
    }

    @GetMapping("/add")
    @Override
    public boolean addBookToCart(HttpSession session,Integer bid) {

        BookOrder order= (BookOrder) session.getAttribute("order");

        if (order==null){
            Student student = (Student) session.getAttribute("user");
            order=new BookOrder(student.getId());
            session.setAttribute("order",order);
        }

        List<LendedBook> books = order.getBooks();

        for (LendedBook book:books){
            if (book.getbId().equals(bid)){
                return false;
            }
        }

        books.add((LendedBook) new LendedBook().setbId(bid));
        return true;
    }

    @GetMapping("/remove")
    @Override
    public boolean removeBookFromCart(HttpSession session,Integer bid) {

        BookOrder order = (BookOrder) session.getAttribute("order");
        if (order!=null){
            List<LendedBook>books = order.getBooks();
            for (int i=0;i<books.size();i++){
                if (books.get(i).getbId().equals(bid)){
                    books.remove(i);
                    break;
                }
            }
        }

        return true;
    }

    @GetMapping("/get")
    @Override
    public List<LendedBook> getBooks(HttpSession session) {

        BookOrder order = (BookOrder) session.getAttribute("order");
        if (order!=null){
            return order.getBooks();
        }
        return new ArrayList<>();
    }


    @PostMapping("/submit")
    @Override
    public boolean submitOrder(HttpServletRequest request) {

        String orderJson = request.getParameter("order");

        BookOrder order = new Gson().fromJson(orderJson,BookOrder.class);
        order.setState(0);

        try {
            shoppingCartService.submitForm(order);
        }catch (Exception e){
            e.printStackTrace();
            return false;
        }
        return true;
    }
}
