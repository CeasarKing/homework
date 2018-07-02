package com.lin.dao.provider;

import com.lin.beans.Book;
import org.apache.ibatis.jdbc.SQL;

import java.util.Map;

public class BookIntroDaoProvider {

    //int insertBookIntro(Book book)
    public String insertBookIntro(Book book){
        SQL sql=new SQL();
        StringBuilder aintro =new StringBuilder("'");
        book.getAuthorIntro().forEach(s -> aintro.append(s).append("\n"));
        aintro.append("'");

        StringBuilder bintro =new StringBuilder("'");
        book.getBookIntro().forEach(s -> bintro.append(s).append("\n"));
        bintro.append("'");

        sql.INSERT_INTO("book_intros")
                .VALUES("bid",book.getbId().toString())
                .VALUES("book_intro",bintro.toString())
                .VALUES("author_intro",aintro.toString());

        return sql.toString();
    }

}
