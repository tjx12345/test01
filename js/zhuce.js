$(function(){
    //如果必填则添加*标志
    $("form :input.required").each(function(){
        var required=$("<strong class='high'>*</strong>");
        $(this).parent().append(required);
    });
    //文本框失去焦点后
    var arr=[false,false,false,false,false]
    $("form :input").blur(function(){
        var $parent=$(this).parent();
        $parent.find(".formtips").remove();
        if($(this).is("#username")){
            if(this.value==""){
                var msg="用户名不能为空";
                $parent.append("<span class='formtips onError one'>"+msg+"</span>");
                arr[0]=false;
            }else if(this.value.length<5){
                var msg="用户名长度为5-20个字符";
                $parent.append("<span class='formtips onError one'>"+msg+"</span>");
                arr[0]=false;
            }else{
                $parent.append("<span class='formtips onError one'></span>");
                checkname(this.value);
            }
        }
        //检验用户名的状态给予ARR数组的 值 已判断AJAX是否可以提交
        if($(".one").html()==="用户名存在"){
            arr[0]=false;
        }else{
            arr[0]=true;
        }



        if($(this).is("#password")){
            pwd=this.value;
            if(this.value==""){
                var msg="密码不能为空";
                $parent.append("<span class='formtips onError'>"+msg+"</span>");
                arr[1]=false;
            }else if(this.value.length<6){
                var msg="密码长度为6-20个字符";
                $parent.append("<span class='formtips onError'>"+msg+"</span>");
                arr[1]=false;
            }else{
                $parent.append("<span class='formtips onSuccess'></span>");
                arr[1]=true;
            }
        }
        if($(this).is("#repassword")){
            if(this.value==""){
                var msg="确认密码不能为空";
                $parent.append("<span class='formtips onError'>"+msg+"</span>");
                arr[2]=false;
            }else if(this.value!=pwd){
                var msg="密码不一致";
                $parent.append("<span class='formtips onError'>"+msg+"</span>");
                arr[2]=false;
            }else{
                $parent.append("<span class='formtips onSuccess'></span>");
                arr[2]=true;
            }
        }
        if($(this).is("#email")){
            if(this.value==""){
                var msg="邮箱不能为空";
                $parent.append("<span class='formtips onError'>"+msg+"</span>");
                arr[3]=false;
            }else if(!/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(this.value)){
                var msg="邮箱格式错误";
                $parent.append("<span class='formtips onError'>"+msg+"</span>");
                arr[3]=false;
            }else{
                $parent.append("<span class='formtips onSuccess'></span>");
                arr[3]=true;
            }
        }
        if($(this).is("#mobile")){
            if(this.value!=""){
                if(!/^1[3|4|5|8][0-9]\d{8}$/.test(this.value)){
                    var msg="手机格式错误";
                    $parent.append("<span class='formtips onError'>"+msg+"</span>");
                    arr[4]=false;
                }else{
                    $parent.append("<span class='formtips onSuccess'></span>");
                    arr[4]=true;
                }
            }
        }
    })

    function checkname(name){
        $.ajax({
            dataType:"json",
            url:"php/getname.php",
            success:function(data){
                for(var i=0;i<data.length;i++){
                    if(data[i].name===$("#username").val()){
                        $(".one").html("用户名存在");
                        return;
                    }else{
                        $(".one").html("");
                    }
                }
            },
        });
    };

    //提交最终验证
    $("#send").click(function(){
        $.ajax({
            url:"php/yumeikePHP.php",
           type:"post",
            data:{

                    name:$("#username").val(),
                    password:$("#password").val(),
                    email:$("#email").val(),
                    mobile:$("#mobile").val()

            },
            beforeSend:function(){
                for(var i=0;i<5;i++){
                    if(arr[i]==false){
                        console.log(arr[i]);
                        return false;
                    }
                };

                alert("注册成功");
                $(".required").val("");
                window.location.href="yumeike.html";

            }
        });

    });

    $("#clear").click(function(){
        $(".formtips").remove();
    });




})