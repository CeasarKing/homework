package com.lin.dao;

import com.lin.beans.Book;
import com.lin.dao.provider.BookDaoProvider;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface BookDao {








    /**
     * 为了准备数据使用的一次性代码
     */
    @InsertProvider(type = BookDaoProvider.class,method = "insertBooks")
    int insertBooks(Book books);

    @Select("SELECT COUNT(*) FROM book_info WHERE bname=#{name}")
    int queryBookCountByName(@Param("name") String name);

    @Update("UPDATE book_info " +
            "SET tags = #{tags}" +
            "WHERE bname=#{name}")
    int updateCategory(@Param("tags") String tags,@Param("name")String bookName);


    @Select("SELECT bid as bId,tags as tags FROM book_info")
    List<Book> queryAllIdAndTag();

}
