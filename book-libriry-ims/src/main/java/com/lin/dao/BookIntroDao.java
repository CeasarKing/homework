package com.lin.dao;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface BookIntroDao {

     @Select("SELECT BOOK_INTRO FROM BOOK_INTROS WHERE bid=#{id}")
     List<String> queryBookIntros(@Param("id") Integer bid);

     @Select("SELECT AUTHOR_INTRO FROM BOOK_INTROS WHERE bid=#{id}")
     List<String> queryAuthorIntros(@Param("id") Integer bid);

}
