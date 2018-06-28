package com.lin.beans;

import java.util.List;

public class LendedBook extends Book {
    //被借走的时间
    private String lendTime;
    //应当归还的时间
    private String retTime;
    //借走者的id
    private Integer lenderId;

    public LendedBook(){}

    public LendedBook(String lendTime, String retTime, Integer lenderId) {
        this.lendTime = lendTime;
        this.retTime = retTime;
        this.lenderId = lenderId;
    }

    public LendedBook(String bookName, String imgSrc, String author,
                      String publicWork, String publicTime, String price, String wrapper, String ISBN, Double averageRank,
                      int rankNums, List<Double> allRanks, List<String> bookIntro, List<String> authorIntro, String lendTime, String retTime, Integer lenderId) {
        super(bookName, imgSrc, author, publicWork, publicTime, price, wrapper, ISBN, averageRank, rankNums, allRanks, bookIntro, authorIntro);
        this.lendTime = lendTime;
        this.retTime = retTime;
        this.lenderId = lenderId;
    }

    public void setBook(Book book) {
        super.setBook(book);
    }

    @Override
    public String toString() {
        return "LendedBook{" +
                "bookId="+super.getbId()+
                ", lendTime=" + lendTime +
                ", retTime=" + retTime +
                ", lenderId=" + lenderId +
                '}';
    }

    public String getLendTime() {
        return lendTime;
    }

    public LendedBook setLendTime(String lendTime) {
        this.lendTime = lendTime;
        return this;
    }

    public String getRetTime() {
        return retTime;
    }

    public LendedBook setRetTime(String retTime) {
        this.retTime = retTime;
        return this;
    }

    public Integer getLenderId() {
        return lenderId;
    }

    public LendedBook setLenderId(Integer lenderId) {
        this.lenderId = lenderId;
        return this;
    }
}
