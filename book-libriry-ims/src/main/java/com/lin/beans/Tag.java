package com.lin.beans;

import java.util.HashMap;
import java.util.Map;

public class Tag {

    public final static Map<Integer,Tag> TAGS_MAP=new HashMap<>();
    private static int modCount=0;
    public synchronized static void setTags(Map<Integer,Tag> map){
        modCount++;
        if (modCount>1){
            throw new RuntimeException("TAGS_MAP只能赋值一次");
        }else {
            TAGS_MAP.putAll(map);
        }
    }

    private int id;
    private String category;
    private int parentId;

    public Tag() {
    }

    public Tag(int id, String category, int parentId) {
        this.id = id;
        this.category = category;
        this.parentId = parentId;
    }

    @Override
    public String toString() {
        return "Tag{" +
                "id=" + id +
                ", category='" + category + '\'' +
                ", parentId=" + parentId +
                '}';
    }

    public int getId() {
        return id;
    }

    public Tag setId(int id) {
        this.id = id;
        return this;
    }

    public String getCategory() {
        return category;
    }

    public Tag setCategory(String category) {
        this.category = category;
        return this;
    }

    public int getParentId() {
        return parentId;
    }

    public Tag setParentId(int parentId) {
        this.parentId = parentId;
        return this;
    }
}
