package com.lin;

import com.lin.beans.Tag;
import com.lin.dao.BookDao;
import com.lin.dao.TagsDao;
import org.apache.ibatis.session.SqlSessionFactory;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest(classes = MainApplication.class)
public class MainApplicationTests {

    @Autowired BookDao dao;
    @Autowired TagsDao tagsDao;

    @Test
    public void contextLoads() {
        System.out.println(tagsDao.insert(new Tag(1, "国学", 1)));
    }

}
