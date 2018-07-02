package com.once;

import org.junit.Test;

import java.text.MessageFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class SimpleTest {

    @Test
    public void testMessageFormat(){
        MessageFormat mf=new MessageFormat("(''{0}'',{1},{2})");

        System.out.println(mf.format(new Object[]{1, String.valueOf(1653665483), 3}));
    }

    @Test
    public void testStream(){
        List<Integer> list=new ArrayList<>();
        list.add(1);
        list.add(2);
        list.stream().map(integer -> integer+23).
                collect(Collectors.toList()).forEach(i-> System.out.println(i));
    }

}
