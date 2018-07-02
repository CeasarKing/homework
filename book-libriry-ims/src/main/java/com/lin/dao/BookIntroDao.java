package com.lin.dao;

import com.lin.beans.Book;
import com.lin.dao.provider.BookIntroDaoProvider;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface BookIntroDao {

     @Select("SELECT BOOK_INTRO FROM BOOK_INTROS WHERE bid=#{id}")
     List<String> queryBookIntros(@Param("id") Integer bid);

     @Select("SELECT AUTHOR_INTRO FROM BOOK_INTROS WHERE bid=#{id}")
     List<String> queryAuthorIntros(@Param("id") Integer bid);

     @InsertProvider(type = BookIntroDaoProvider.class,method = "insertBookIntro")
     int insertBookIntro(Book book);
}
