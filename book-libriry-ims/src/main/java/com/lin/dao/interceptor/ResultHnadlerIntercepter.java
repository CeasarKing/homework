package com.lin.dao.interceptor;

import org.apache.ibatis.executor.resultset.DefaultResultSetHandler;
import org.apache.ibatis.executor.resultset.ResultSetHandler;
import org.apache.ibatis.mapping.MappedStatement;
import org.apache.ibatis.plugin.*;
import org.springframework.stereotype.Component;

import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Properties;

@Component
@Intercepts(@Signature(type = ResultSetHandler.class,method = "handleResultSets",args = {Statement.class}))
public class ResultHnadlerIntercepter implements Interceptor {

    @Override
    public Object intercept(Invocation invocation) throws Throwable {
        Object obj=null;

        String methodId = getIntercepterMethodId(invocation) ;

        //添加方法签名为queryBookIntros和queryAuthorIntros的拦截方法
        obj = obj==null ? intercepterQueryBookIntros(invocation,methodId) : obj;

        //添加方法签名为queryRanksById的拦截方法
        obj = obj==null ? intercepterQueryBookRanks(invocation,methodId) : obj;

        //如果没有任何一个方法被拦截成功
        if (obj==null)
            obj=invocation.proceed();

        return obj;
    }

    //返回拦截方法的方法签名
    /**
     * @param invocation
     * @return 返回为空则是target不属于DefaultResultSetHandler 这种情况暂时不处理
     */
    private String getIntercepterMethodId(Invocation invocation){
        Object targetObj=invocation.getTarget();
        if (targetObj instanceof  DefaultResultSetHandler){
            DefaultResultSetHandler tartget = (DefaultResultSetHandler) targetObj;
            Class clazz = DefaultResultSetHandler.class;
            try {
                Field field = clazz.getDeclaredField("mappedStatement");
                field.setAccessible(true);
                Object obj = field.get(tartget);
                MappedStatement statement = (MappedStatement) obj;

                String methodId=statement.getId();

                return methodId;
            } catch (NoSuchFieldException e) {
                System.err.println("没有找到这个成员");
            } catch (IllegalAccessException e) {
                System.err.println("没有这个字段");
            }
        }
        return null;
    }

    /**
     * 拦截查询bookIntros的结果集
     * @param invocation
     * @return 如果返回集为null则是判断失败
     */
    private List<String> intercepterQueryBookIntros(Invocation invocation,String methodId){

        List<String> resList=null;

        //判断拦截的方法的签名
        if (methodId.equals("com.lin.dao.BookIntroDao.queryBookIntros") ||
                methodId.equals("com.lin.dao.BookIntroDao.queryAuthorIntros")){
            //处理结果集:将String 转化为List
            try {
                Object strObj=invocation.proceed();
                if (strObj instanceof ArrayList){
                    ArrayList<String> strList= (ArrayList<String>) strObj;
                    resList=Arrays.asList(strList.get(0).split("\n"));
                }
            } catch (InvocationTargetException e) {
                e.printStackTrace();
            } catch (IllegalAccessException e) {
                e.printStackTrace();
            }
        }

        return resList;
    }

    /**
     * 拦截查询书的排名的结果集 并自定义处理结果集
     * @param invocation
     * @param methodId
     * @return
     */
    private List<Double> intercepterQueryBookRanks(Invocation invocation, String methodId){
        List<Double> res=null;
        if (methodId.equals("com.lin.dao.BookDao.queryRanksById")){
            Object args[] = invocation.getArgs();
            Statement statement= (Statement) args[0];
            try {
                ResultSet resultSet = statement.getResultSet();
                if (resultSet!=null)
                    res=new ArrayList<>();

                if (resultSet.next()){
                    for (int i = 1;i <= 5 ;i++){
                        res.add(resultSet.getDouble(i));
                    }
                }

            } catch (SQLException e) {
                e.printStackTrace();
            }

        }
        return res;
    }

    @Override
    public Object plugin(Object o) {
        return Plugin.wrap(o,this);
    }

    @Override
    public void setProperties(Properties properties) {

    }

}
