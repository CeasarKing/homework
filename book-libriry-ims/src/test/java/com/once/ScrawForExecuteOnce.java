package com.once;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.lin.MainApplication;
import com.lin.beans.Book;
import com.lin.beans.Tag;
import com.lin.dao.BookDao;
import com.lin.dao.TagsDao;
import com.lin.service.BookInfoService;
import org.jsoup.Connection;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import javax.sql.DataSource;
import java.io.*;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.*;
import java.util.stream.Collectors;


@SpringBootTest(classes = MainApplication.class)
@RunWith(SpringJUnit4ClassRunner.class)
public class ScrawForExecuteOnce {

    //为了准备数据   一步一步来  从爬取到存入数据库  弄得好烦
    //使用简单的 Jsoup 获得 各种分类 图书的信息
    @Test
    public void getCateList() throws IOException {
        var url="https://book.douban.com/tag/?view=type&icn=index-sorttags-all";
        var soup=Jsoup.connect(url);

        var body=soup.get().body();

        BufferedWriter bw=new BufferedWriter(new FileWriter("f:\\file/html/cateList.html"));
        bw.write(body.html());
        bw.close();
    }

    @Test
    public void writeToJson() throws IOException {
        String path="f:\\file/html/cateList.html";
        BufferedReader br=new BufferedReader(new FileReader(path));
        List<String> lins=br.lines().collect(Collectors.toList());
        StringBuilder htmlSb=new StringBuilder();
        lins.forEach(s -> htmlSb.append(s));

        Element body=Jsoup.parse(htmlSb.toString()).body();

        Element es=body.getElementsByClass("article").first();
        Elements childs = es.child(1).children();

        Map<String,Set<String>> map=new HashMap<>();
        for (Element c:childs){
            System.out.println(c);
            String title=c.getElementsByTag("h2").first().text();
            Set<String> set=new HashSet<>();
            Elements table = c.getElementsByTag("a");
            table.forEach(element -> set.add(element.text()));
            set.remove(title);
            map.put(title,set);
        }
        BufferedWriter bw=new BufferedWriter(new FileWriter("f:\\file/json/cateJson.json"));
        bw.write(new Gson().toJson(map));
        bw.close();
    }


    //读取刚才的json
    public Map<String,Set<String>> readCateJson() throws FileNotFoundException {
        BufferedReader br=new BufferedReader(new FileReader("f:\\file/json/cateJson.json"));
        StringBuilder sb=new StringBuilder();
        br.lines().collect(Collectors.toList()).forEach(s -> sb.append(s));
        Map<String,Set<String>>map=new Gson().fromJson(sb.toString(),new TypeToken<Map<String,Set<String>>>(){}.getType());
        return map;
    }

   TagsDao tagsDao;

    @Test
    public void insertCategoryIntoDB() throws FileNotFoundException {
        Map<String,Set<String>>map = readCateJson();
        map.forEach((k,v)->{
            int count=tagsDao.selectCountByName(k);
            if (count==0){
                int parentId = tagsDao.insert(new Tag(0,
                        k.replace(" · · · · · ·","").trim(),0));
                for (String s:v) {
                    int c=tagsDao.selectCountByName(s);
                    if (c==0)
                        tagsDao.insert(new Tag(0, s, parentId));
                }
            }

        });
    }

    //从起始 url 中得到
    public List<String> getCategoryUrlList() throws IOException {
        var url="https://book.douban.com/tag/?view=type&icn=index-sorttags-all";
        var soup=Jsoup.connect(url);

        soup.userAgent("Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; WOW64; Trident/6.0; BIDUBrowser 2.x");

        var body=soup.get().body();

        var tagEl = body.getElementsByClass("article").get(0);
        var aTags=tagEl.getElementsByTag("a");
        aTags.removeIf(tag->!tag.toString().contains("/tag/"));
        aTags.remove(0);

        List<String> resList=new ArrayList<>();
        for (var el:aTags){
            resList.add(el.absUrl("href"));
        }
        return resList;
    }

    //得到所有分类的开始第一页的html文件  先保存在本地
    @Test
    public void getBooksUrlList()throws IOException{

        List<String>catesList=getCategoryUrlList();
        Map<String,List<String>>cateUrlMap=new HashMap<>();

        List<String> errList=new ArrayList<>();

        String saveFile="F:\\file/";

        catesList.forEach(s -> System.out.println(s));

        for (int i=0;i<catesList.size();i++){

            try {
                String s=catesList.get(i);
                String fileName=saveFile+i+".txt";
                BufferedWriter bw=new BufferedWriter(new FileWriter(fileName));

                Connection soup=Jsoup.connect(s);
                soup.proxy("182.34.19.219",9077).
                        userAgent("Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; WOW64; Trident/6.0; BIDUBrowser 2.x");

                Element body=soup.get();

                bw.write(body.html());
                bw.close();

            }catch (Exception e){
                e.printStackTrace();
            }
        }

    }

    @Test
    public void GetUrlFromList() throws FileNotFoundException {
        String fileDir="f:\\file";

        File[] list=new File(fileDir).listFiles();

        for (File f:list){
           var line = new BufferedReader(new FileReader(f)).lines();
           List<String>text = line.collect(Collectors.toList());
           StringBuilder sb=new StringBuilder();
           text.forEach(s -> {sb.append(s);});

           Document doc=Jsoup.parse(sb.toString());

           String title = doc.title();

           Element body = doc.body();

           Element ul =body.getElementsByTag("ul").get(2);
           Elements lis=ul.getElementsByTag("li");

           List<String> urls=new ArrayList<>();
           lis.forEach(e->urls.add(e.getElementsByClass("pic").first().
                   getElementsByTag("a").first().absUrl("href")));

           String fileP=fileDir+"/urls.txt";

           try {
                BufferedWriter bw=new BufferedWriter(new FileWriter(fileP,true));
                bw.write(title);
                bw.newLine();
                urls.forEach(s-> {
                    try {
                        bw.write(s);
                        bw.newLine();
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                });
                bw.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    @Test
    public void GetBookPage() throws FileNotFoundException {
        String filePath="f:\\file/urls.txt";
        List<String> list=new BufferedReader(new FileReader(filePath)).
                lines().collect(Collectors.toList());

        int count=0;

        String trueTitle=null;

        for (int i=0;i<list.size();i++){
            String str=list.get(i);
            if (str.startsWith("https:")){
                //链接
                System.out.println(trueTitle);
                System.out.println(str);

                try {
                    Connection soup = Jsoup.connect(str);
                    soup.proxy("182.105.200.7", 4162);
                    soup.userAgent("Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; WOW64; Trident/6.0; BIDUBrowser 2.x");

                    Element body = soup.get().body();

                    String path="f:\\file/html4/"+i+".html";
                    BufferedWriter bw=new BufferedWriter(new FileWriter(path));
                    bw.write(body.html());
                    bw.close();

                }catch (Exception e){
                    e.printStackTrace();
                    if (count==3)
                        return;
                    System.out.println(trueTitle);
                    System.out.println(str);
                    count++;
                }

            }else {
                //title
                trueTitle=str;
            }


        }



    }

    @Test
    public void getInfoFromHtml() throws FileNotFoundException {
        Random random=new Random();
        String fileDir="f:\\file/html";

        Map<String,Set<String>>map=readCateJson();

        for (int j=1;j<=4;j++){
            String filePath=fileDir+j;

            File []files=new File(filePath).listFiles(pathname -> pathname.toString().endsWith(".html"));
            List<String> errList=new ArrayList<>();
            for (File f:files){
                try {
                    StringBuilder htmlBuffer = new StringBuilder();
                    BufferedReader br = new BufferedReader(new FileReader(f));
                    List<String> lines = br.lines().collect(Collectors.toList());

                    lines.forEach(s -> htmlBuffer.append(s));

                    Element body = Jsoup.parse(htmlBuffer.toString());

                      // 获取基本信息
                    //tag->h1 bookName
                    String bookName = body.getElementsByTag("h1").first().text();
                    //class->indent
                    /*
                    //
                    Element faceDiv = body.getElementsByClass("subject clearfix").first();
                    //id->mainpic->img
                    String imgSrc = faceDiv.getElementsByTag("img").attr("src");


                    //id->info spite by <br>
                    String infoDiv = body.getElementById("info").html();
                    String[] infos = infoDiv.split("<br>");
                    for (int i = 0; i < infos.length; i++) {
                        infos[i] = Jsoup.parse(infos[i]).text();
                    }
                    List<String> infosList = Arrays.asList(infos);

                    //id->interest_sectl 评分
                    Element rank1Div = body.getElementsByClass("rating_self clearfix").first();

                    String rank2Div = body.getElementsByClass("rating_wrap clearbox").first().toString();
                    String[] rank2s = rank2Div.split("<br>");
                    for (int i = 0; i < rank2s.length; i++) {
                        rank2s[i] = Jsoup.parse(rank2s[i]).text();
                    }
                    List<String> rankList = Arrays.asList(rank2s);

                    //class->intend id->link-report class->intend

                    final Element bookIntroDiv = body.getElementById("link-report");
                    Element tempDiv = bookIntroDiv.getElementsByClass("all hidden").first();

                    Element introDiv = bookIntroDiv;
                    if (tempDiv != null) {
                        introDiv = tempDiv;
                    }
                    Elements ps = introDiv.getElementsByTag("p");
                    List<String> bookIntros = new ArrayList<>();
                    ps.forEach(element -> {
                        bookIntros.add(element.text());
                    });



                    Element authorIntro = body.getElementsByClass("indent").get(2);
                    Element introTestDiv = authorIntro.getElementsByClass("intro").first();
                    List<String> authorIntros = new ArrayList<>();

                    if (introTestDiv != null) {
                        Element authorIntroDiv = authorIntro.getElementsByClass("all hidden").first();
                        if (authorIntroDiv != null) {
                            introTestDiv = authorIntroDiv.getElementsByClass("intro").first();
                        }
                        Elements es = introTestDiv.getElementsByTag("p");
                        es.forEach(element -> authorIntros.add(element.text()));
                    }


                    ForJson forJson = new ForJson(bookName, imgSrc, infosList, rankList, bookIntros, authorIntros);
                    Gson gson = new Gson();
                    String json = gson.toJson(forJson);

                    System.out.println(json);


                    String path = "f:\\file/json/"+random.nextInt(2000000000)+".dat";
                    BufferedWriter bw = new BufferedWriter(new FileWriter(path));
                    bw.write(json);
                    bw.close();*/


                    /**
                     * 获取分类标签信息
                     */

                    Element tagDiv=body.getElementById("db-tags-section").getElementsByClass("indent").first();
                    List<String> tags=new ArrayList<>();
                    tagDiv.getElementsByTag("span").forEach(element -> tags.add(element.text()));

                    List<String> exsitTags = tagsDao.queryExsit(tags);
                    System.out.println(exsitTags);

                    StringBuilder categorySb=new StringBuilder();
                    exsitTags.forEach(s -> categorySb.append(s).append("-"));

                    dao.updateCategory(categorySb.substring(0,categorySb.length()-1).toString(),bookName);

                }catch (IOException e){
                    e.printStackTrace();
                    errList.add("warning"+f.getAbsolutePath());
                    System.out.println();
                }catch (Exception e){
                    e.printStackTrace();
                    System.out.println("Error"+f.getAbsolutePath());
                }
            }
        }



    }

    @Autowired BookDao dao;

    //有的字符串本来就带有 ' 字符  稍微不好处理
    @Test
    public void testReadFromJson() throws FileNotFoundException, SQLException {
        String jsonFile="f:\\file/json/";
        File file[]=new File(jsonFile).listFiles(pathname -> pathname.toString().endsWith(".dat"));

        List<String> errBooks=new ArrayList<>();
        java.sql.Connection connection=dataSource.getConnection();
        PreparedStatement ps=connection.
                prepareStatement("UPDATE book_info SET author_intro=? WHERE bname=?");
        for (File f:file){
            List<String> lins=new BufferedReader(new FileReader(f)).lines().collect(Collectors.toList());
            StringBuilder sb=new StringBuilder();
            lins.forEach(s -> sb.append(s));
            String jsonStr=sb.toString();

            ForJson json=new Gson().fromJson(jsonStr,ForJson.class);

            System.out.println(json);

            List<String>authorIntro = json.authorIntro;
            StringBuilder sb2=new StringBuilder();
            authorIntro.forEach(s -> sb2.append(s).append("\n"));
            StringReader reader=new StringReader(sb2.toString());

            ps.setCharacterStream(1,reader);
            ps.setString(2,json.bookName);

            ps.execute();

        }

        

    }

    //建立一对多的关系表
    @Test
    public void testInfoMapTag(){
        List<Book> books = dao.queryAllIdAndTag();
        for (Book book:books){
            List<Integer> tagStr=book.getTags();
            if (tagStr!=null){
                /*
                被牺牲的代码
                String[]tags=tagStr.split("-");
                for (String s:tags){
                    int id=tagsDao.queryIdByName(s);
                    tagsDao.updateChildUp1(s);
                    tagsDao.insertBookMapTag(book.getbId(),id);
                }
                */
            }
        }
    }

    //获取图书的图片资源
    @Test
    public void testGetImg() throws IOException {
        String path="F:\\file\\json";
        File file=new File(path);
        File[]files=file.listFiles(pathname -> !pathname.toString().endsWith(".json"));

        List<String> errNames=new ArrayList<>();
        int errCount=0;

        Map<String,Book> map=new HashMap<>();

        for (File f:files){
            StringBuilder jsonStr=new StringBuilder();
            new BufferedReader(new FileReader(f)).lines().
                    collect(Collectors.toList()).forEach(s -> jsonStr.append(s));

            Book book=new Gson().fromJson(jsonStr.toString(),Book.class);
            System.out.println(book);

            /**
             *  处理 简介大字符串 的数据 的存储
             */

            String name = book.getBookName();
            List<String> bookIntro = book.getBookIntro();
            List<String> authorIntro =book.getAuthorIntro();
            map.put(name,new Book().setBookName(name).setBookIntro(bookIntro).setAuthorIntro(authorIntro));
            /*
              获取图片资源
            try {
                URL url = new URL(book.getImgSrc());

                InputStream br = url.openStream();
                FileOutputStream fos=new FileOutputStream("F:\\file\\img\\"+book.getBookName()+".jpg");
                byte[]bytes=new byte[1024];

                int len = 0;
                while ((len=br.read(bytes,0,1024))>0){
                    fos.write(bytes,0,len);
                }

                br.close();
                fos.close();

            }catch (IOException e){
                errCount++;
                if (errCount>5){
                    System.out.println(errNames);
                    System.out.println(f.getPath());
                    return;
                }
                e.printStackTrace();
                errNames.add(book.getBookName());
            }*/
        }
        String jsonStr=new Gson().toJson(map);
        BufferedWriter bw=new BufferedWriter(new FileWriter("intro.txt"));
        bw.write(jsonStr);
        bw.close();
    }

    //修改图片的名字
    @Test
    public void testModImgName(){
        String path="F:\\file\\img\\";
        File file=new File(path);
        File []files=file.listFiles();

        List<String> books=new ArrayList<>();
        for (File f:files){

            try {
                String name=f.getName();
                name=name.substring(0,name.length()-4);

                System.out.println(name);

                dao.updateImg(""+name,"F:\\file\\img\\"+name+".jpg");

            }catch (Exception e){
                e.printStackTrace();
                books.add(f.getName());
            }

        }

        System.out.println(books);
    }

    //图片路径插入数据库
    @Test
    public void testInsert(){

    }


    @Autowired private DataSource dataSource;
    @Autowired private BookInfoService bookInfoService;
    @Test public void saveIntro() throws SQLException {

        List<Book> books= (List<Book>) bookInfoService.getAllInfosAndTags().get("books");
        java.sql.Connection connection=dataSource.getConnection();

        PreparedStatement ps = connection.prepareStatement("UPDATE BOOK_INFO SET intro = ? WHERE bname = ?");
        List<String> errList=new ArrayList<>();

        books.forEach(book -> {
            StringBuilder sb=new StringBuilder();
            book.getBookIntro().forEach(s -> sb.append(s).append("\n"));

            StringReader reader=new StringReader(sb.toString());

            try {
                ps.setCharacterStream(1,reader);

                ps.setString(2,book.getBookName());

                ps.execute();
            } catch (SQLException e) {
                e.printStackTrace();
                errList.add(book.getBookName());
            }

            new Gson().toJson(book);

            System.out.println(book.getBookName());
        });

        System.out.println(errList);

    }

    @Test
    public void testReadText() throws SQLException {
        java.sql.Connection connection=dataSource.getConnection();

        PreparedStatement ps=connection.prepareStatement("SELECT bname , intro from book_info where bname= ?");

        ps.setString(1,"我偏爱那些不切实际的浪漫");

        ResultSet resultSet=ps.executeQuery();

        if (resultSet.next()){
            String str=resultSet.getString(1);
            Reader sr=resultSet.getCharacterStream(2);
            BufferedReader br=new BufferedReader(sr);
            System.out.println(br.lines().collect(Collectors.toList()).size());
        }

        connection.close();
        ps.close();
        resultSet.close();
    }

    @Test
    public void testSelectIntro(){
        System.out.println(dao.queryBookByName("我偏爱那些不切实际的浪漫").getBookIntro().size());
    }


    @Test
    public void testUpdatePrice() throws SQLException {
        java.sql.Connection connection = dataSource.getConnection();

        String sql1="SELECT bid from book_info";
        Statement statement=connection.createStatement();
        ResultSet resultSet = statement.executeQuery(sql1);
        List<Integer> ids= new ArrayList<>();
        while (resultSet.next()){
            ids.add(resultSet.getInt(1));
        }
        System.out.println(ids);

        String sql2="update book_info set price = format(rand()*60+20,2) where bid = ?";

        PreparedStatement stat = connection.prepareStatement(sql2);

        for (Integer i : ids){
            stat.setInt(1,i);
            stat.execute();
        }

    }

}
