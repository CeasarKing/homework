package com.lin.dao;

import com.lin.MainApplication;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest(classes = MainApplication.class)
public class TagsDaoTest {

    @Autowired TagsDao dao;

    @Test
    public void testQueryByBookId(){
        dao.queryTagsByBookId(16602776).forEach(tag -> System.out.println(tag));
    }

}
