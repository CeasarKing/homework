
import $ from "jquery"

class AjaxUtils {

    static getBookInfo(data){
        let resData=null;
        $.ajax({
            url:window.serverHost + "/infos",
            data:data,
            xhrFields:{
                withCredentials:true
            },
            method:"get",
            async:false,
            success: (data)=> {
                resData = $.parseJSON(data)
            },
            error:(data)=>{
                console.log(data)
            }
        });
        return resData
    };

    static getAllLendBooks(){
        let res=null;
        $.ajax({
           url:window.serverHost + "/lends",
           method:"get",
           xhrFields:{
               withCredentials:true
           } ,
            async:false,
            success:function (resp) {
                res=resp
            }
        });
        return res;
    };

    static getAllStudents(){
        let  res = null;

        $.ajax({
            url:window.serverHost + "/stus",
            method:"get",
            xhrFields:{
                withCredentials:true
            },
            async:false,
            success:function (resp) {
                res = JSON.parse(resp)
            }
        });

        return res
    }

    static getAllLendMessage(){
        let  res = null;

        $.ajax({
            url:window.serverHost + "/msgs",
            method:"get",
            xhrFields:{
                withCredentials:true
            },
            async:false,
            success:function (resp) {
                res=resp
            }
        });

        return res
    }

    static getNowUserInfo(){
        let user = null;
        $.ajax({
            url:window.serverHost + "/get/user",
            method:"get",
            xhrFields:{
                withCredentials:true
            },
            async:false,
            success:function (resp) {
                user=JSON.parse(resp)
            },
        });
        return user;
    };
}

export default AjaxUtils



