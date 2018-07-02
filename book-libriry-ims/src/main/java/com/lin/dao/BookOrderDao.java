package com.lin.dao;

import com.lin.beans.BookOrder;
import com.lin.beans.LendedBook;
import com.lin.dao.provider.BookOrderDaoProvider;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface BookOrderDao {


    @Select("select * from book_order")
    @Results(id = "orderMapping",value = {
            @Result(column = "order_id",property = "orderId"),
            @Result(column = "user_id",property = "userId"),
            @Result(column = "state",property = "state"),
            @Result(column = "need_visit",property = "needVisit"),
            @Result(column = "visit_address",property = "address"),
            @Result(column = "remarks",property = "remarks"),
            @Result(column = "order_id",property = "books",many = @Many(
                    select = "com.lin.dao.BookOrderDao.queryLendedBookByOrderId"
            ))
    })
    List<BookOrder> queryAllOrders();

    @Select("SELECT map.*,info.bname as bookName,info.price as price " +
            "FROM book_order_map_book map,book_info info " +
            "WHERE map.order_id = #{oid} AND info.bid = map.lended_book_id")
    @Results(id = "orderMappingBook",value = {
            @Result(column = "lended_book_id",property = "bId"),
            @Result(column = "make_date",property = "lendTime"),
            @Result(column = "ret_date",property = "retTime"),
    })
    List<LendedBook> queryLendedBookByOrderId(@Param("oid")Integer oid);

    @Select("select count(*) from book_order where order_id = #{key}")
    int conatainPrimaryKey(@Param("key") Integer key);

    @InsertProvider(type = BookOrderDaoProvider.class,method = "insertOrderMapBook")
    void insertOrderMapBook(@Param("books") List<LendedBook> books, @Param("oid") Integer orderId);

    @Insert("INSERT INTO BOOK_ORDER(order_id,user_id,need_visit,visit_address,remarks,state)" +
            "values(#{orderId},#{userId},#{needVisit},#{address},#{remarks},#{state})")
    void insertOrderForm(BookOrder order);

    @UpdateProvider(type = BookOrderDaoProvider.class,method = "updateLendedBooksState")
    void updateLendedBooksState(@Param("books")List<LendedBook>books,@Param("uid")Integer userId);

    @Update("update book_order set state = #{state} where oid = #{oid}")
    void updateOrderState(@Param("state")Integer state,@Param("oid") Integer oid);

}
