package com.lin.beans;

import java.lang.reflect.Field;
import java.util.Arrays;
import java.util.List;
import java.util.Random;


public class Book {
    //库id
    private Integer bId;
    //书名
    private String bookName;
    //封面图
    private String imgSrc;
    //作者
    private String author;
    //出版社
    private String publicWork;
    //出版时间
    private String publicTime;
    //市场价格
    private String price;
    //装帧方式
    private String wrapper;
    //书号
    private String ISBN;


    //拥有的标签  Integer为tId
    private List<Integer> tags;

    //豆瓣评分
    private Double averageRank;
    private int rankNums;
    private List<Double> allRanks;

    private String bookIntroFromDB;
    private String authorIntroFromDB;
    //图书简介
    List<String> bookIntro;
    //作者简介
    List<String> authorIntro;

    public Book() {
    }

    public Book(String bookName, String imgSrc, String author, String publicWork, String publicTime, String price, String wrapper, String ISBN, Double averageRank, int rankNums, List<Double> allRanks, List<String> bookIntro, List<String> authorIntro) {
        this.bId=new Random().nextInt(Integer.MAX_VALUE-100);
        this.bookName = bookName;
        this.imgSrc = imgSrc;
        this.author = author;
        this.publicWork = publicWork;
        this.publicTime = publicTime;
        this.price = price;
        this.wrapper = wrapper;
        this.ISBN = ISBN;
        this.averageRank = averageRank;
        this.rankNums = rankNums;
        this.allRanks = allRanks;
        this.bookIntro = bookIntro;
        this.authorIntro = authorIntro;
    }

    public void setBook(Book book){
        try {
            if (book!=null){
                Class clazz = Book.class;
                Field[]fields=clazz.getDeclaredFields();
                /*
                按理来说  都是同样的类型  应该不会出现异常
                Object[]temps=new Object[fields.length];
                for (int i=0;i<fields.length;i++)
                    temps[i]=fields[i].get(this);*/
                for (Field f : fields) {
                    f.setAccessible(true);
                    Object obj=f.get(book);
                    f.set(this, obj);
                }
            }
        } catch (IllegalAccessException e) {
            e.printStackTrace();
        }
    }

    @Override
    public String toString() {
        setNullBookIntro();
        return "Book{" +
                "bId=" + bId +
                ", bookName='" + bookName + '\'' +
                ", imgSrc='" + imgSrc + '\'' +
                ", author='" + author + '\'' +
                ", publicWork='" + publicWork + '\'' +
                ", publicTime='" + publicTime + '\'' +
                ", price='" + price + '\'' +
                ", wrapper='" + wrapper + '\'' +
                ", ISBN='" + ISBN + '\'' +
                ", tags='" + tags + '\'' +
                ", averageRank=" + averageRank +
                ", rankNums=" + rankNums +
                ", allRanks=" + (allRanks == null ? null : Arrays.asList(allRanks)) +
                ", bookIntro=" + bookIntro +
                ", authorIntro=" + authorIntro +
                '}';
    }

    public Book setbId(Integer bId) {
        this.bId = bId;
        return this;
    }

    public List<Integer> getTags() {
        return tags;
    }

    public Book setTags(List<Integer> tags) {
        setNullBookIntro();
        this.tags = tags;
        return this;
    }

    public Book setAverageRank(Double averageRank) {
        this.averageRank = averageRank;
        return this;
    }

    public Integer getbId() {
        return bId;
    }

    public Book setbId(int bId) {
        this.bId = bId;
        return this;
    }

    public String getBookName() {
        return bookName;
    }

    public Book setBookName(String bookName) {
        this.bookName = bookName;
        return this;
    }

    public String getImgSrc() {
        return imgSrc;
    }

    public Book setImgSrc(String imgSrc) {
        this.imgSrc = imgSrc;
        return this;
    }

    public String getAuthor() {
        return author;
    }

    public Book setAuthor(String author) {
        this.author = author;
        return this;
    }

    public String getPublicWork() {
        return publicWork;
    }

    public Book setPublicWork(String publicWork) {
        this.publicWork = publicWork;
        return this;
    }

    public String getPublicTime() {
        return publicTime;
    }

    public Book setPublicTime(String publicTime) {
        this.publicTime = publicTime;
        return this;
    }

    public String getPrice() {
        return price;
    }

    public Book setPrice(String price) {
        this.price = price;
        return this;
    }

    public String getWrapper() {
        return wrapper;
    }

    public Book setWrapper(String wrapper) {
        this.wrapper = wrapper;
        return this;
    }

    public String getISBN() {
        return ISBN;
    }

    public Book setISBN(String ISBN) {
        this.ISBN = ISBN;
        return this;
    }

    public double getAverageRank() {
        return averageRank;
    }

    public Book setAverageRank(double averageRank) {
        this.averageRank = averageRank;
        return this;
    }

    public int getRankNums() {
        return rankNums;
    }

    public Book setRankNums(int rankNums) {
        this.rankNums = rankNums;
        return this;
    }

    public List<Double> getAllRanks() {
        return allRanks;
    }

    public Book setAllRanks(List<Double> allRanks) {
        this.allRanks = allRanks;
        return this;
    }

    public List<String> getBookIntro() {
        setNullBookIntro();
        return bookIntro;
    }

    public Book setBookIntro(List<String> bookIntro) {
        this.bookIntro = bookIntro;
        return this;
    }

    public List<String> getAuthorIntro() {
        return authorIntro;
    }

    public Book setAuthorIntro(List<String> authorIntro) {
        this.authorIntro = authorIntro;
        return this;
    }

    private void setNullBookIntro(){
        if (this.bookIntro==null || this.bookIntro.size()==0){
            if (this.bookIntroFromDB!=null){
                this.bookIntro=Arrays.asList(this.bookIntroFromDB.split("\n"));
                this.bookIntroFromDB=null;
            }
        }
        if (this.authorIntro==null || this.authorIntro.size()==0){
            if (this.authorIntroFromDB!=null){
                this.authorIntro=Arrays.asList(this.authorIntroFromDB.split("\n"));
                this.authorIntroFromDB=null;
            }
        }
    }


}
