package com.lin.service.impl;

import com.lin.dao.BookIntroDao;
import com.lin.service.QueryBookIntroService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class QueryBookIntroServiceImpl implements QueryBookIntroService {

    @Autowired private BookIntroDao bookIntroDao;

    @Override
    public List<String> queryBookIntros(String type, Integer bid) {

        List<String> resList=null;

        if (type.equals("book")){
            resList = bookIntroDao.queryBookIntros(bid);
        }else if (type.equals("author")){
            resList = bookIntroDao.queryAuthorIntros(bid);
        }else {
            resList=new ArrayList<>();
        }

        return resList;
    }
}
