package com.lin.ui.controller.impl;

import com.lin.ui.controller.ImgController;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletResponse;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.OutputStream;

@CrossOrigin(origins = "*")
@Controller
public class ImgControllerImpl implements ImgController {

    @RequestMapping("/img/{bid}")
    @Override
    public void getImg(@PathVariable("bid")Integer bid, HttpServletResponse response) {
        FileInputStream fis=null;
        try {
            fis=new FileInputStream("F:/file/img/"+bid+".jpg");

            OutputStream os =response.getOutputStream();

            int len=0;
            byte[]buf=new byte[1024];
            while ((len=fis.read(buf))>0){
                os.write(buf,0,len);
            }

        } catch (IOException e) {
            e.printStackTrace();
        }finally {
            if (fis!=null){
                try {
                    fis.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
    }
}
