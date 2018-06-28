package com.once;

import com.lin.beans.Book;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class ForJson {

    String bookName;
    String imgSrc;
    List<String> info;
    List<String> rank;
    List<String> bookIntro;
    List<String> authorIntro;

    public Book toBook(){

        if (this.bookName!=null) {


            Map<String,String> infoMap=new HashMap<>();
            for (String inf:this.info){
                String[]kvs=inf.split(": ");
                infoMap.put(kvs[0],kvs[1]);
            }
            String author=infoMap.get("作者");
            String publicWork=infoMap.get("出版社");
            String publicTime=infoMap.get("出版年");
            String priceStr=infoMap.get("定价");
            String wrapper=infoMap.get("装帧");
            String isbn=infoMap.get("ISBN");

            String rankStr=rank.get(0);
            String[]ranks=rankStr.split(" ");

            Double avergeRank=0.0;
            int rankNum=0;
            List<Double>allRank=null;

            if (!ranks[1].equals("评价人数不足")){
                avergeRank=Double.valueOf(ranks[1]);

                rankNum=Integer.valueOf(ranks[2].substring(0,ranks[2].length()-3));

                allRank = new ArrayList<>();
                String r=ranks[ranks.length-1];
                allRank.add(Double.valueOf(r.substring(0,r.length()-1)));

                for (int i=1;i<5;i++){
                    String scoreStr=rank.get(i).split(" ")[1];
                    allRank.add(Double.valueOf(scoreStr.substring(0,scoreStr.length()-1)));
                }
            }

            return new Book(bookName,imgSrc,author,publicWork,publicTime,priceStr,
                    wrapper,isbn,avergeRank,rankNum,allRank,bookIntro,authorIntro);

        }

        return null;
    }

    public ForJson() {
    }

    public String getBookName() {
        return bookName;
    }

    public ForJson setBookName(String bookName) {
        this.bookName = bookName;
        return this;
    }

    public String getImgSrc() {
        return imgSrc;
    }

    public ForJson setImgSrc(String imgSrc) {
        this.imgSrc = imgSrc;
        return this;
    }

    public List<String> getInfo() {
        return info;
    }

    public ForJson setInfo(List<String> info) {
        this.info = info;
        return this;
    }

    public List<String> getRank() {
        return rank;
    }

    public ForJson setRank(List<String> rank) {
        this.rank = rank;
        return this;
    }

    public List<String> getBookIntro() {
        return bookIntro;
    }

    public ForJson setBookIntro(List<String> bookIntro) {
        this.bookIntro = bookIntro;
        return this;
    }

    public List<String> getAuthorIntro() {
        return authorIntro;
    }

    public ForJson setAuthorIntro(List<String> authorIntro) {
        this.authorIntro = authorIntro;
        return this;
    }

    public ForJson(String bookName, String imgSrc, List<String> info, List<String> rank, List<String> bookIntro, List<String> authorIntro) {
        this.bookName = bookName;
        this.imgSrc = imgSrc;
        this.info = info;
        this.rank = rank;
        this.bookIntro = bookIntro;
        this.authorIntro = authorIntro;
    }

    @Override
    public String toString() {
        return "ForJson{" +
                "bookName='" + bookName + '\'' +
                ", imgSrc='" + imgSrc + '\'' +
                ", info=" + info +
                ", rank=" + rank +
                ", bookIntro=" + bookIntro +
                ", authorIntro=" + authorIntro +
                '}';
    }
}
