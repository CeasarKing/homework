package com.lin.service.impl;

import com.lin.dao.BookIntroDao;
import com.lin.service.BookIntroService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class BookIntroServiceImpl implements BookIntroService {

    private final BookIntroDao bookIntroDao;
    public BookIntroServiceImpl(@Autowired BookIntroDao bookIntroDao) {
        this.bookIntroDao = bookIntroDao;
    }

    @Override
    public List<String> queryBookIntros(String type, Integer bid) {

        List<String> resList=null;

        switch (type) {
            case "book":
                resList = bookIntroDao.queryBookIntros(bid);break;
            case "author":
                resList = bookIntroDao.queryAuthorIntros(bid);break;
            default:
                resList = new ArrayList<>();break;
        }

        return resList;
    }
}
