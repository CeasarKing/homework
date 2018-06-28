package com.lin.beans;

import java.util.List;

public class Student {

    private Integer id;
    private String name;
    private String password;
    private String cardId;
    private Integer maxLendItem;
    private Integer age;
    private Integer gender;
    private List<Book> hasBooks;

    public Student(){}

    public Student(Integer id, String name, String cardId,
                   Integer maxLendItem, Integer age, Integer gender, List<Book> hasBooks) {
        this.id = id;
        this.name = name;
        this.cardId = cardId;
        this.maxLendItem = maxLendItem;
        this.age = age;
        this.gender = gender;
        this.hasBooks = hasBooks;
    }

    public Integer getId() {
        return id;
    }

    @Override
    public String toString() {
        return "Student{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", cardId='" + cardId + '\'' +
                ", maxLendItem=" + maxLendItem +
                ", age=" + age +
                ", gender=" + gender +
                ", hasBooks=" + hasBooks +
                '}';
    }

    public Student setId(Integer id) {
        this.id = id;
        return this;
    }

    public String getPassword() {
        return password;
    }

    public Student setPassword(String password) {
        this.password = password;
        return this;
    }

    public String getName() {
        return name;
    }

    public Student setName(String name) {
        this.name = name;
        return this;
    }

    public String getCardId() {
        return cardId;
    }

    public Student setCardId(String cardId) {
        this.cardId = cardId;
        return this;
    }

    public Integer getMaxLendItem() {
        return maxLendItem;
    }

    public Student setMaxLendItem(Integer maxLendItem) {
        this.maxLendItem = maxLendItem;
        return this;
    }

    public Integer getAge() {
        return age;
    }

    public Student setAge(Integer age) {
        this.age = age;
        return this;
    }

    public Integer getGender() {
        return gender;
    }

    public Student setGender(Integer gender) {
        this.gender = gender;
        return this;
    }

    public List<Book> getHasBooks() {
        return hasBooks;
    }

    public Student setHasBooks(List<Book> hasBooks) {
        this.hasBooks = hasBooks;
        return this;
    }
}
