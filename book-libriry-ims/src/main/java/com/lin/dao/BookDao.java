package com.lin.dao;

import com.lin.beans.Book;
import com.lin.dao.provider.BookDaoProvider;
import org.apache.ibatis.annotations.*;
import org.apache.ibatis.mapping.FetchType;

import java.util.List;
import java.util.Map;

/**
 * 数据库的设计中，将书本简介和作者简介放在book_info的表中，造成查询十分慢
 * 可以分开改进
 */
@Mapper
public interface BookDao {

    //只是声明了一个对应一个Book 的 resultMap
    @Select("")
    @Results(id="bookMapping",value = {
            @Result(id = true,column = "bid",property = "bId"),
            @Result(column = "bname",property = "bookName"),
            @Result(column = "bauthor",property = "author"),
            @Result(column = "public_work",property = "publicWork"),
            @Result(column = "public_time",property = "publicTime"),
            @Result(column = "average_rank",property = "averageRank"),
            @Result(column = "img",property = "imgSrc"),
            @Result(column = "average_rank",property = "averageRank"),
            @Result(column = "bid",property = "allRanks",
                    one = @One(select = "com.lin.dao.BookDao.queryRanksById")),
            @Result(column = "bid",property = "tags",
                    many = @Many(
                            select = "com.lin.dao.TagsDao.queryTagsByBookId"
                    ))
    })
    Book declarBookMapping();

    @Select("")
    @Results(id = "bookIntroMapping",value = {
            @Result(column = "bid",property = "bookIntro",
                    many = @Many(select = "com.lin.dao.BookIntroDao.queryBookIntros"))
    })
    Book declarBookIntroMapping();

    //得到所有的书
    @Select("SELECT * FROM book_info ")
    @ResultMap("bookMapping")
    List<Book> queryAllBooks();

    //得到最多 @limit 数量的图书
    @Select("SELECT * FROM book_info order by rand() limit #{limit}")
    @ResultMap("bookMapping")
    List<Book> querySomeBooks(@Param("limit") int limit);

    //通过查询多种条件查询
    @SelectProvider(type = BookDaoProvider.class,method = "queryBooksByCategoryMap")
    @ResultMap("bookMapping")
    List<Book> queryBooksByCategoryMap(Map<String,Object> cates);

    //通过书的名字查询
    @Select("SELECT info.*," +
            "book_intro as bookIntroFromDB," +
            "author_intro as authorIntroFromDB " +
            "FROM book_info as info,book_intros as intro " +
            "where info.bname=#{bname} and info.bid=intro.bid")
    @ResultMap("bookMapping")
    Book queryBookByName(@Param("bname") String name);

    //通过书的id查询
    @Select("SELECT info.*," +
            "book_intro as bookIntroFromDB," +
            "author_intro as authorIntroFromDB " +
            "FROM book_info as info,book_intros as intro " +
            "where info.bid=#{bid} and info.bid=intro.bid")
    @ResultMap("bookMapping")
    Book queryBookById(@Param("bid")Integer bid);

    @Select("SELECT rank1,rank2,rank3,rank4,rank5 from book_info where bid=#{bid}")
    List<Double> queryRanksById(@Param("bid") Integer bid);

    @Insert("INSERT INTO book_info(bid,bname,bauthor,price,public_work,public_time) " +
            "VALUES(#{bId},#{bookName},#{author},#{price},#{publicWork},#{publicTime})")
    int insertBook(Book book);

    /**
     * 为了准备数据使用的一次性代码
     */
    @Deprecated
    @Select("SELECT intro from book_info where bname = #{name}")
    String queryIntro(@Param("name") String name);

    @Deprecated
    @Update("update book_info set img =#{img} where bid=#{id} ")
    int updateImg(@Param("id") String bid,@Param("img") String img);

    @Deprecated
    @InsertProvider(type = BookDaoProvider.class,method = "insertBooks")
    int insertBooks(Book books);

    @Deprecated
    @Select("SELECT COUNT(*) FROM book_info WHERE bname=#{name}")
    int queryBookCountByName(@Param("name") String name);

    @Deprecated
    @Update("UPDATE book_info " +
            "SET tags = #{tags}" +
            "WHERE bname=#{name}")
    int updateCategory(@Param("tags") String tags,@Param("name")String bookName);

    @Deprecated
    @Select("SELECT bid as bId,tags as tags FROM book_info")
    List<Book> queryAllIdAndTag();

}
