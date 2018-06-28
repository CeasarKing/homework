package com.interf;


import javax.servlet.Servlet;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.ListIterator;
import java.util.Properties;

interface Row{
    void drink();
}
class Calf implements Row,Comparable,Comparator {

    @Override
    public void drink() {

    }

    @Override
    public int compareTo(Object o) {
        return 0;
    }

    @Override
    public int compare(Object o1, Object o2) {
        return 0;
    }
}

public class Test {

    public static void main(){

    }

}
