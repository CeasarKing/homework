package com.lin.dao.provider;

import com.lin.beans.Book;
import org.apache.ibatis.jdbc.SQL;
import org.junit.jupiter.api.Test;

import java.text.MessageFormat;
import java.util.*;

public class BookDaoProvider {

    static final Map<String,String>MAP=new HashMap<>(){{
        put("publishWork","public_work");put("publishTime","public_time");
    }};

    public String insertBooks(Book book){
        SQL sql=new SQL();
        sql.INSERT_INTO("book_info");
        List<Double> ranks=book.getAllRanks();
        boolean flag=ranks==null;
        sql.INTO_VALUES(book.getbId().toString(),"'"+book.getBookName()+"'","'"+book.getAuthor()+"'","'"+book.getPublicWork()+"'",
                "'"+book.getPublicTime()+"'", String.valueOf(book.getAverageRank()),flag?"0":ranks.get(4).toString(),
                flag?"0":ranks.get(3).toString(), flag?"0":ranks.get(2).toString(),flag?"0":ranks.get(1).toString(),
                flag?"0":ranks.get(0).toString());

        return sql.toString().replace("\"","'");
    }

    public String queryBooksByCategoryMap(Map<String,Object> cates){
        SQL sql=new SQL();
        sql.SELECT("info.*").
                FROM("book_info as info");

        //需要查找的标签列表 没有则不判断
        List<Integer> tagIds= (List<Integer>) cates.get("inTagIds");
        if (tagIds!=null && tagIds.size()>0){
            StringBuilder inBuffer=new StringBuilder("tags.tag_id in (");
            for (Integer id:tagIds)
                inBuffer.append(id).append(",");
            inBuffer.delete(inBuffer.length()-1,inBuffer.length()).append(")");

            sql.FROM("book_info_to_tags as tags").
                    WHERE(inBuffer.toString()).
                    WHERE("tags.info_id = info.bid");
        }

        //如果点击了头部的分类
        Map<String,String> topCate= (Map<String, String>) cates.get("topCate");
        System.out.println(topCate);
        if (topCate!=null){
            Iterator<String> keys=topCate.keySet().iterator();

            while (keys.hasNext()){
                String key=keys.next();
                String val="'%" + topCate.get(key) +"%'";
                sql.WHERE(BookDaoProvider.MAP.get(key) + " like " + val);
            }

        }

        String bookName= (String) cates.get("bookName");
        if (bookName!=null){
            sql.WHERE("bname like '%" + bookName + "%'");
        }

        sql.ORDER_BY("rand()");
        String resSql=sql.toString();

        //是否有限制数量条件
        Integer limit = (Integer) cates.get("limit");
        if (limit!=null){
            resSql += " limit " + limit;
        }else {
            resSql += " limit " + 50;
        }

        System.out.println(resSql);

        return resSql;
    }

    @Test
    public void testType(){
        System.out.println((Integer)(null));
    }

}
