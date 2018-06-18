package com.lin.beans;

import java.util.HashMap;
import java.util.Map;

public class Tag {

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
