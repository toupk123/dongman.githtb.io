        var   a=document.getElementsByClassName("time");//这里是在查询共有多少轮播插件		  
       for(var i=0,_i=a.length;i<_i;i++){
       (function(i) {        
      	     var _a=a[i],
      	      c=_a.getElementsByTagName("ul")[0],
			   
      		    d=parseInt(c.style.left),
      		    f=c.getElementsByTagName("li").length,
      	      e=MYF.time;			  
      	      e.ti(c,d,f);
       })(i);
      } 
	  var $ss=$(".bottom-nav"),
	      $ss2=$(".main"),
		  $ss3=$(".navbar"),
		  $ss4=$(".navbar-form ");
		  f=MYF.nav,
		  $ss5=$(".post"),	  
		  f.bottomNav($ss2,$ss),
		  f.huadongNav($ss,$ss2),
		  f.topNav($ss3),
		  $ss6=$(".right-nav a");
             for(var i=0;i<7;i++){ 
			  f.huadongNav($ss6[i],$ss5[i]);
			  f.rightNav($ss6[i],$ss5[i]);
			  f.bottomNav($ss2,$ss6);
			 }
  /* ssss=120;
   function ss(){
	   ssss--;
	   alert(ssss);
   }
    var o={
	ccc:function(){ss.call(window,ssss);},
	sssss:function(){alert(ssss);}	
	}
	   o.ccc();//这里就创建一个公用的变量。
	   o.sssss();
	   o.ccc();
	   o.sssss();*/