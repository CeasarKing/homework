package com.lin.dao.provider;

import java.util.List;
import java.util.Map;

public class TagsDaoProvider {

    public String queryExsit(Map map){

        List<String> list= (List<String>) map.get("list");

        StringBuilder sb=new StringBuilder("SELECT category FROM BOOK_TAGS WHERE category in(");
        for (int i=0;i<list.size();i++){
            if (i!=0){
                sb.append(",");
            }
            sb.append("'").append(list.get(i)).append("'");
        }
        sb.append(")");

        return sb.toString();

    }

}
