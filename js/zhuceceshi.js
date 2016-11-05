$(function(){
    ////如果必填则添加*标志
    $("form :input.required").each(function(){
        var required=$("<strong class='high'>*</strong>");
        $(this).parent().append(required);
    });
    //文本框失去焦点后
    var arr=[false,false,false,false,false]
    var bol=false;//临时保存用户名是否存在的变量
    $("#username").blur(function(){
        var $parent=$(this).parent();
        $parent.find(".formtips").remove();
        if($(".formtips")){
            $(".formtips").remove();
        }
            if(this.value==""){
                $parent.append("<span class='formtips onError'>"+"用户名不能为空"+"</span>");
                arr[0]=false;
            }else if(this.value.length<5){
                $parent.append("<span class='formtips onError'>"+"用户名长度为5-20个字符"+"</span>");
                arr[0]=false;
            }else if(console.log(checkname(this.value))){
                console.log(checkname(this.value))
                bol=false;//将变量值还原为false
                $parent.append("<span class='formtips onError'>"+"用户存在"+"</span>");
                arr[0]=false;
                console.log(1111)//没有运行  应该是请求的时间延迟
            }else{
                $parent.append("<span class='formtips onSuccess'></span>");
                arr[0]=true;
            }

    });


    //$("form :input").blur(function(){
    //
    //    if($(this).is("#password")){
    //        pwd=this.value;
    //        if(this.value==""){
    //            var msg="密码不能为空";
    //            $parent.append("<span class='formtips onError'>"+msg+"</span>");
    //            arr[1]=false;
    //        }else if(this.value.length<6){
    //            var msg="密码长度为6-20个字符";
    //            $parent.append("<span class='formtips onError'>"+msg+"</span>");
    //            arr[1]=false;
    //        }else{
    //            $parent.append("<span class='formtips onSuccess'></span>");
    //            arr[1]=true;
    //        }
    //    }
    //    if($(this).is("#repassword")){
    //        if(this.value==""){
    //            var msg="确认密码不能为空";
    //            $parent.append("<span class='formtips onError'>"+msg+"</span>");
    //            arr[2]=false;
    //        }else if(this.value!=pwd){
    //            var msg="密码不一致";
    //            $parent.append("<span class='formtips onError'>"+msg+"</span>");
    //            arr[2]=false;
    //        }else{
    //            $parent.append("<span class='formtips onSuccess'></span>");
    //            arr[2]=true;
    //        }
    //    }
    //    if($(this).is("#email")){
    //        if(this.value==""){
    //            var msg="邮箱不能为空";
    //            $parent.append("<span class='formtips onError'>"+msg+"</span>");
    //            arr[3]=false;
    //        }else if(!/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(this.value)){
    //            var msg="邮箱格式错误";
    //            $parent.append("<span class='formtips onError'>"+msg+"</span>");
    //            arr[3]=false;
    //        }else{
    //            $parent.append("<span class='formtips onSuccess'></span>");
    //            arr[3]=true;
    //        }
    //    }
    //    if($(this).is("#mobile")){
    //        if(this.value!=""){
    //            if(!/^1[3|4|5|8][0-9]\d{8}$/.test(this.value)){
    //                var msg="手机格式错误";
    //                $parent.append("<span class='formtips onError'>"+msg+"</span>");
    //                arr[4]=false;
    //            }else{
    //                $parent.append("<span class='formtips onSuccess'></span>");
    //                arr[4]=true;
    //            }
    //        }
    //    }
    //})

    function checkname(name){
        $.ajax({
            dataType:"json",
            url:"php/getname.php",
            success:function(data){
                for(var i=0;i<data.length;i++){
                    if(data[i].name===$("#username").val()){
                        bol=true;
                        return;
                    }else{
                        bol=false;
                        return;
                    }
                }
            },
        });
        return bol;
    };

    //提交最终验证
    //$("#send").click(function(){
    //    $.ajax({
    //        url:"php/yumeikePHP.php",
    //        type:"post",
    //        data:{
    //
    //            name:$("#username").val(),
    //            password:$("#password").val(),
    //            email:$("#email").val(),
    //            mobile:$("#mobile").val()
    //
    //        },
    //        beforeSend:function(){
    //            var fal;
    //            for(var i=0;i<5;i++){
    //                if(arr[i]==false){
    //
    //                    return false;;
    //                }
    //            };
    //            if(fal){
    //                return false
    //            }else{
    //                alert("注册成功");
    //                $(".required").val("");
    //                window.location.href="yumeike.html";
    //            }
    //        }
    //    });
    //
    //});
    //
    //$("#clear").click(function(){
    //    $(".formtips").remove();
    });



