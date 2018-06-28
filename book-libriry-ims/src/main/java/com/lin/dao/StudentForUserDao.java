package com.lin.dao;


import com.lin.beans.Student;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

@Mapper
public interface StudentForUserDao {

    /**
     * 用户登录
     * @param username 用户名
     * @param password 用户密码
     * @return 查找到的用户
     */
    @Select("SELECT id,name," +
            "card_id as cardId," +
            "max_lend_item as maxLendItem," +
            "age,gender " +
            "from book_student " +
            "where name=#{un} and password = #{pw}")
    Student login(@Param("un") String username, @Param("pw") String password);

}
