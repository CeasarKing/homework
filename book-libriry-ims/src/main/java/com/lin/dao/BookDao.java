package com.lin.dao;

import com.lin.beans.Book;
import com.lin.dao.provider.BookDaoProvider;
import org.apache.ibatis.annotations.*;
import org.apache.ibatis.mapping.FetchType;

import java.util.List;

@Mapper
public interface BookDao {

    //得到所有的书
    @Select("SELECT * FROM book_info ")
    @Results({
            @Result(id = true,column = "bid",property = "bId"),
            @Result(column = "bname",property = "bookName"),
            @Result(column = "bauthor",property = "author"),
            @Result(column = "public_work",property = "publicWork"),
            @Result(column = "public_time",property = "publicTime"),
            @Result(column = "average_rank",property = "averageRank"),
            @Result(column = "img",property = "imgSrc"),
            @Result(column = "bid",property = "tags",
            many = @Many(
                    select = "com.lin.dao.TagsDao.queryTagsByBookId"
            ))
    })
    List<Book> queryAllBooks();

    @Select("SELECT * FROM book_info where bname=#{name} ")
    @Results({
            @Result(id = true,column = "bid",property = "bId"),
            @Result(column = "bname",property = "bookName"),
            @Result(column = "bauthor",property = "author"),
            @Result(column = "public_work",property = "publicWork"),
            @Result(column = "public_time",property = "publicTime"),
            @Result(column = "average_rank",property = "averageRank"),
            @Result(column = "img",property = "imgSrc"),
            @Result(column = "bid",property = "tags",
                    many = @Many(
                            select = "com.lin.dao.TagsDao.queryTagsByBookId"
                    ))
    })
    Book queryBookByName(@Param("name") String name);

    /**
     * 为了准备数据使用的一次性代码
     */

    @Update("update book_info set img =#{img} where bid=#{id} ")
    int updateImg(@Param("id") String bid,@Param("img") String img);

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
