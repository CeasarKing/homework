package com.lin.beans;

import org.springframework.beans.factory.FactoryBean;

import java.util.ArrayList;
import java.util.List;

public class BookOrder {

    //订单号
    private int orderId;
    //用户号
    private int userId;
    //订单中借走的书
    private List<LendedBook> books=new ArrayList<>();
    //订单状态（-1未成单 0待付款 1已取消 2已付款 3待上门 4待还书 5已逾期 6待上门 7已归还（订单完成） ）
    private int state = -1;
    //是否需要上门服务
    private int needVisit = 0;
    //访问住址
    private String address;
    //备注
    private String remarks;

    public BookOrder() {
    }

    public BookOrder(int userId){
        this.userId=userId;
    }

    public BookOrder( int userId, String address, String remarks,int needVisit) {
        this.userId = userId;
        this.address = address;
        this.remarks = remarks;
        this.needVisit=needVisit;
    }

    @Override
    public String toString() {
        return "BookOrder{" +
                "orderId=" + orderId +
                ", userId=" + userId +
                ", books=" + books +
                ", state=" + state +
                ", needVisit=" + needVisit +
                ", address='" + address + '\'' +
                ", remarks='" + remarks + '\'' +
                '}';
    }

    public int getNeedVisit() {
        return needVisit;
    }

    public BookOrder setNeedVisit(int needVisit) {
        this.needVisit = needVisit;
        return this;
    }

    public int getOrderId() {
        return orderId;
    }

    public BookOrder setOrderId(int orderId) {
        this.orderId = orderId;
        return this;
    }

    public int getUserId() {
        return userId;
    }

    public BookOrder setUserId(int userId) {
        this.userId = userId;
        return this;
    }

    public List<LendedBook> getBooks() {
        return books;
    }

    public BookOrder setBooks(List<LendedBook> books) {
        this.books = books;
        return this;
    }

    public int getState() {
        return state;
    }

    public BookOrder setState(int state) {
        this.state = state;
        return this;
    }

    public String getAddress() {
        return address;
    }

    public BookOrder setAddress(String address) {
        this.address = address;
        return this;
    }

    public String getRemarks() {
        return remarks;
    }

    public BookOrder setRemarks(String remarks) {
        this.remarks = remarks;
        return this;
    }
}
