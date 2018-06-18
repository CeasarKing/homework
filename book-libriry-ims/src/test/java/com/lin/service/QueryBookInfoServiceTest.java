package com.lin.service;

import com.google.gson.Gson;
import com.lin.MainApplication;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.util.Map;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest(classes = MainApplication.class)
public class QueryBookInfoServiceTest {

    @Autowired private QueryBookInfoService service;

    @Test
    public void testGetBooksAndTags(){
        Map map=service.getAllInfosAndTags();
        System.out.println(new Gson().toJson(map));
    }

}
