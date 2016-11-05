$(function(){
   $("#send").click(function(){

       $.ajax({
           dataType:"json",
           url:"php/denglu.php",
           success:function(data){
               var fal=false;
               console.log(data)
               for(var i=0;i<data.length;i++){
                   if(data[i].name==$("#username").val() && data[i].password==$("#password").val()){
                       fal=true;
                   }
               };
              if(fal){
                  alert("登录成功");
                  window.location.href="yumeike.html";
              }else{
                  alert("登录失败");
              }
           },
       });
   })

})
