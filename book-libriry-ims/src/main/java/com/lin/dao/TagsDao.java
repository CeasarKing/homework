package com.lin.dao;

import com.lin.beans.Tag;
import com.lin.dao.provider.TagsDaoProvider;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface TagsDao {

    @Select("SELECT tag_id from book_info_to_tags where info_id=#{bid}")
    List<Integer> queryTagsByBookId(@Param("bid") Integer bid);

    @Select("SELECT * FROM book_tags")
    @Results({@Result(column = "parent_id",property = "parentId")})
    List<Tag> queryAllTags();

    /**
     * 为了准备数据使用的一次性代码
     */
    @Select("call retKeyAfterInsert(#{category},#{parentId},@id)")
    int insert(Tag tag);

    @Select("SELECT COUNT(*) FROM BOOK_TAGS WHERE CATEGORY=#{ca}")
    int selectCountByName(@Param("ca") String ca);

    @SelectProvider(type = TagsDaoProvider.class,method = "queryExsit")
    List<String> queryExsit(List<String> list);

    @Update("update book_tags set child_count=child_count+1 where category=#{ca}")
    void updateChildUp1(@Param("ca") String tag);

    @Select("select id from book_tags where category = #{ca}")
    int queryIdByName(@Param("ca") String name);

    @Insert("INSERT INTO BOOK_INFO_TO_TAGS(info_id,tag_id)values(#{bid},#{tid})")
    int insertBookMapTag(@Param("bid") int bid,@Param("tid") int tid);
}
