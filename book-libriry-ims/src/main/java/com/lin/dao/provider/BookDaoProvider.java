package com.lin.dao.provider;

import com.lin.beans.Book;
import org.apache.ibatis.jdbc.SQL;
import org.junit.jupiter.api.Test;

import java.text.MessageFormat;
import java.util.Random;

public class BookDaoProvider {

    public String insertBooks(Book book){


        SQL sql=new SQL();
        sql.INSERT_INTO("book_info");
        Double[] ranks=book.getAllRanks();
        boolean flag=ranks==null;
        sql.INTO_VALUES(book.getbId().toString(),"'"+book.getBookName()+"'","'"+book.getAuthor()+"'","'"+book.getPublicWork()+"'",
                "'"+book.getPublicTime()+"'", String.valueOf(book.getAverageRank()),flag?"0":ranks[4].toString(),
                flag?"0":ranks[3].toString(), flag?"0":ranks[2].toString(),flag?"0":ranks[1].toString(),
                flag?"0":ranks[0].toString());

        return sql.toString().replace("\"","'");

    }

    public Object[]getFormatObject(Book book){
        Double rank=book.getAverageRank();
        Double []ranks=book.getAllRanks();
        boolean flag = ranks==null;

        Object[]objects=new Object[]{String.valueOf(book.getbId()),book.getBookName(),book.getAuthor(),book.getPublicWork(),
               book.getPublicTime(),rank,flag?0:ranks[4],flag?0:ranks[3],flag?0:ranks[2],flag?0:ranks[1],flag?0:ranks[0]};
        return objects;
    }

    @Test
    public void test(){
        MessageFormat format=new MessageFormat("hehe{0}");
        Integer i = new Random().nextInt(Integer.MAX_VALUE-100);
        System.out.println(i.toString());
    }

}
