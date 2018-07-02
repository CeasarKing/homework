package com.lin.beans;

import java.util.List;

public class LendedBook extends Book {
    //被借走的时间
    private String lendTime;
    //应当归还的时间
    private String retTime;
    //借走者的id
    private Integer orderId;

    public LendedBook(){}

    public LendedBook(String lendTime, String retTime, Integer orderId) {
        this.lendTime = lendTime;
        this.retTime = retTime;
        this.orderId = orderId;
    }

    public LendedBook(String bookName, String imgSrc, String author,
                      String publicWork, String publicTime, String price, String wrapper, String ISBN, Double averageRank,
                      int rankNums, List<Double> allRanks, List<String> bookIntro, List<String> authorIntro, String lendTime, String retTime, Integer orderId) {
        super(bookName, imgSrc, author, publicWork, publicTime, price, wrapper, ISBN, averageRank, rankNums, allRanks, bookIntro, authorIntro);
        this.lendTime = lendTime;
        this.retTime = retTime;
        this.orderId = orderId;
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
                ", lenderId=" + orderId +
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
        return orderId;
    }

    public LendedBook setLenderId(Integer orderId) {
        this.orderId = orderId;
        return this;
    }
}
