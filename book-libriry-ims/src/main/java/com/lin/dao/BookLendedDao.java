package com.lin.dao;

import com.lin.beans.LendedBook;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface BookLendedDao {

    //使用id查询某一本已经被借出去的书
    @Select("SELECT * FROM book_lended where bid=#{bid}")
    @Results(id = "lendedBookMapping",value = {
            @Result(column = "lend_time",property = "lendTime"),
            @Result(column = "ret_time",property = "retTime"),
            @Result(column = "lender_id",property = "lenderId"),
            @Result(column = "bid",property = "book",
                    one = @One(select = "com.lin.dao.BookDao.queryBookById"))
    })
    LendedBook queryLendBookById(@Param("bid")Integer bid);

    @Select("SELECT * FROM book_lended where lender_id = #{sid}")
    @ResultMap("lendedBookMapping")
    List<LendedBook> queryLendBookByStuId(@Param("sid")Integer sid);

}
