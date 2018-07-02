package com.lin.dao.provider;

import com.lin.beans.LendedBook;
import org.apache.ibatis.jdbc.SQL;

import java.text.MessageFormat;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class BookOrderDaoProvider {

    //Integer insertOrderMapBook(@Param("books") List<LendedBook> books, @Param("oid") Integer orderId);
    public String insertOrderMapBook(Map map){

        List<LendedBook> books = (List<LendedBook>) map.get("books");
        Integer oid = (Integer) map.get("oid");

        SQL sql=new SQL();
        sql.INSERT_INTO("book_order_map_book");

        sql.INTO_COLUMNS("order_id","lended_book_id","make_date","ret_date");

        MessageFormat mf=new MessageFormat("({0},{1},''{2}'',''{3}'')");

        StringBuilder sqlBuffer=new StringBuilder();
        for (LendedBook book:books){
            String s = mf.format(new Object[]{oid.toString(),book.getbId().toString(),
                    book.getLendTime(),book.getRetTime()});
            sqlBuffer.append(s).append(",");
        }
        sqlBuffer.delete(sqlBuffer.length()-1,sqlBuffer.length());

        sql.INTO_VALUES(sqlBuffer.substring(1,sqlBuffer.length()-1));

        return sql.toString();
    }

    // int updateLendedBooksState(@Param("books")List<LendedBook>books,@Param("uid")Integer userId);
    public String updateLendedBooksState(Map map){
        List<LendedBook> books= (List<LendedBook>) map.get("books");
        Integer userId = (Integer) map.get("uid");

        StringBuilder bookIds=new StringBuilder("bid in(");
        books.forEach(book->bookIds.append(book.getbId()).append(","));
        bookIds.setCharAt(bookIds.length()-1,')');

        SQL sql=new SQL();
        sql.UPDATE("book_lended").
                SET(getSetCase(books,"l")).
                SET(getSetCase(books,"r")).
                SET("lender_id = " + userId).
                WHERE(bookIds.toString());

        return sql.toString();
    }
    private String getSetCase(List<LendedBook> books,String type){

        String preStr = type.equals("l") ? "lend_date = " : "ret_date = ";

        StringBuilder caseBuider=new StringBuilder(preStr + "case bid ");

        books.stream().map(book-> " when " + book.getbId() + " then " +
                    "'" + (type.equals("l")?book.getLendTime():book.getRetTime()) + "' ").
                collect(Collectors.toList()).forEach(caseBuider::append);

        caseBuider.append(" end ");

        return caseBuider.toString();
    }

}
