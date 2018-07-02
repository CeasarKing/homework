package com.lin.dao;

import com.lin.beans.Student;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface StudenForAdmintDao {

    @Select("SELECT * FROM book_student where type=0")
    @Results(id = "studentMapping",value = {
            @Result(column = "id",property = "id"),
            @Result(column = "card_id",property = "cardId"),
            @Result(column = "max_lend_item",property = "maxLendItem"),
            @Result(column = "id",property = "hasBooks",
                    many = @Many(select = "com.lin.dao.BookLendedDao.queryLendBookByStuId"))
    })
    List<Student> queryAllStudents();


    @Select("SELECT * FROM book_student where id = #{id}")
    @ResultMap("studentMapping")
    Student queryStudentById(@Param("id")Integer id);

}
