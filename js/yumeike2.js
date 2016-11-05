
$(function(){




    $(".doctorEWM").mouseover(function(){
        $(".EWM").show();
    }).mouseleave(function(){
        $(".EWM").hide();

    });

//名字验证
    $.ajax({
        dataType:"json",
        url:"php/data.php",
        success:function(date){
            var dat=date;
            var str_1=dat[0].first.first_1;
            var str_2=dat[0].first.first_2;
            var st_1="";
            var st_2="";
            //一、第一个模块加载数据
            for(var i=0;i<str_1.length;i++){
                st_1=st_1+"<span>"+str_1[i]+"</span>"
            };
            $(".home-bg-size>p:eq(0)").html(st_1);

            for(var i=0;i<str_2.length;i++){
                st_2=st_2+"<span>"+str_2[i]+"</span>"
            };
            $(".home-bg-size>p:eq(1)").html(st_2);


            //二维码加载
            $(".EWM>img").attr("src",date[1].EWM);

            //获取第二模块图片
            $(".second img").attr("src",date[2].section);



            //获取第四个模块图片
            $(".canvas-xz>img").attr("src",date[4].fourth);

            //获取第五个模块图片
            $(".fifth-img img").attr("src",date[5].fifth);

            //获取第六个模块图片
            $(".six-img img").attr("src",date[6].six);
        },
    });



})



