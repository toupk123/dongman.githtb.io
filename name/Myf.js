  	var MYF={};      	
      	MYF.time=(function(){    //这是轮播控件，只是命名有点问题。
      		 var  iii=0,
      		  fuhao=0.5, 
			  _i=0,
		    time1=0,
      		 play=function(element,time1,fuhao){  
      		 	 	for(var i=1;i<=50;i++){
      		     		 (function(i){
      		     		 	  setTimeout(function(){	
      		  	   	   iii=-[400*i/100-400*i*i/10000];
      		  	   	element.style.left=time1+iii+"%";	
      		 //对于这里的换图函数，没有指定可以变化速度的参数
      		  	   },i*18); })(i);
      		  	 }
      		 };
      		 return{
      		  	ti:function(element,time1,z){		
      		  		setInterval(function(){   //这里还是经典的闭包和作用域的问题，因为在ti中
      		  	  if(_i<=z-2){  
      		  	  	play(element,time1,fuhao);  //存在的time1等变量，虽然是能够在其play中使用，但是time1存在的作用域
      	    	     _i++;  				 
                  //是在ti中，（原因是参数是按值传递）所以在play中执行完毕后，执行环境再次变为ti，并不能改变ti()中的变量，
      	    	     time1-=100; 
              //所以才会造成time1一直不变
      	    	   }else{  element.style.left="0%";
      	    	     _i=0;                   //补充：在js中参数传递只能是按值传递，基本数据，就只是给个副本，
      	    	      time1=0;              //不能改变外部的参数的值，对于引用数据类型，则可以改变外部的数据值。
      	           };                      //补充:函数要运行的话，肯定是需要运行环境的，匿名函数能运行，
      	        },4000);                   //是因为默认的运行环境是window，这也就解释在MYF.time中的匿名函数，可以直接使用
      		 	  },                         //play()的原因，因为没匿名函数运行的时候，他们都是处于window的环境中，不需要添加函数运行环境
      		 	  setfuhao:function(value){  //但是在MYF.video中，由于是处于环境MYF.video,如果直接运行autoplay（）
      		 	  	fuhao=value;             //的话，是默认环境为window，但是在window中又不能找到，所以才会报错。
      		 	  },//用于轮播方向和速度调整
      		 	  getfuhao:function(){
      		 	  	return fuhao;
      		 	  }
      	  };
      	}());
        MYF.EventUtil={
		         addHandler:function(element,type,handler){
		         if(element.addEventListener){
		          element.addEventListener(type,handler,false);
		      	   } else if(element.attachEvent){ 
		     	   element.attachEvent("on"+type,handler);
		     	  } 
		    },
		  removeHandler: function(element,type,handler){
		  	  if(element.removerEventListeren){
		  	  	   element.removerEventListeren(type,handler,flase);
		  	  	} else {
		  	  		  element.detachEvent("on"+type,handler)
		  	  	}
		  }, 
		  getEvent: function(event){
		  	return event? event: window.event;
		  },
		  getTarget:function(event){
		  	return event.target||event.srcElement;
		  },
		  preventDefault:function(event){
		  	if(event.preventDefault){
		  		event.preventDefault();
		  	} else {
		  		 event.returnValue=false;
		  		}
		  	},
		  stopProagation: function(event){
		  	if(evet.stopProagation){
		  		event.stopProagation();
		  	} else {
		  		event.cancelBubble=true;
		  	}
		  },
	};
       MYF.video=(function(){
       	    var ii=0, //所以不必变为共有的变量。用于浮动控件这些私有变量的作用，
       	     doc=document,  //这里是将全局变量进行存储，减少全局变量的查找。
       	     ti=0; //用于检查安卓浏览器是否有自己浮动的动作。  
       	     return{
       	    videoplay: function(video,videosrc){
                  if(video.canPlayType("video/webm")!=""){
       	       	    	 videosrc+=".webm";    //补充:这里其实是可以使用属性查找，获取src
       	       	    	  } else if(video.canPlayType("video/mp4")!=""){                    //等属性的
       	       	          videosrc+=".mp4"; 
       	       	         }          		  //注意，就算是同对象之间，要访问彼此的话，
       	       	       video.src=videosrc;//还是需要带上对象名的，如果不带，
       	       	       video.controls="controls";//那就是默认在访问window对象的成员
       	       	       
                     },//这里是自动播放函数，
             videonav: function(video,videonav){//这里是按照导航目录上的顺序，来添加单击事件。
              for(var i=0,_i=videonav.length;i<_i;i++){
              	(function(i){           		  
              		 event=MYF.EventUtil.getEvent(event);
              		var sss=videonav[i].title;
                   MYF.EventUtil.addHandler(videonav[i],"click",function(){
              		  MYF.video.videoplay(video,sss);
              	  setTimeout(function(){
                   	video.play();  //这里是进行延迟性的保护
                   
                   },1);
                       //这里添加一个播放
                    MYF.EventUtil.preventDefault(event);//这里是取消默认行为
                 /*这里是依赖到了EventUtil的初始化，但影响没有多大。*/                             
              		});
             })(i);
             };
           },
           videofloat: function(video,video_div,video_left){ 
               /*这个组件用于播放器进行浮动，但是注意，这里只是改变了
                css的样式，所以可以自己控制浮动地点*/
                var videoWidth=video.clientWidth,//返回宽度，没有单位，默认为px
                   videoTop=$(video).offset().top-$(window).scrollTop(),
                   videoHeight=$(video).height();
                 if(video.paused==false&&videoTop<0){    
              //$(video).offset().top表示元素距离文档的距离；
              //$(video).offset().top-$(window).scrollTop()距离可视区的距离；
              //$(window).scrollTop()表示元素所占滚动条的高度。
              if(Math.abs(parseInt(videoTop))<parseInt(videoHeight)){
              	    var videoWidth2=video.clientWidth;
              	    if(ti==0&&videoWidth==videoWidth2){//这里多添加一步判断，是为兼容某些浏览器
              	      ti++;
              	      } 
              	   } //用于检查浏览器是否有默认的浮动动作。 
              if(Math.abs(parseInt(videoTop))>parseInt(videoHeight)){ 
          	         if(ti>0&&ii==0){  //进行自动浮动，如uc安卓浏览器。            
                      var sss=doc.createElement("img"),
                      ss=video_div.replaceChild(sss,video_div.childNodes[1]),
                      ssss=doc.createElement("div"),
                      time;//这个变量是用于储存当前播放时间。
                      sss.src=video.poster;   
                      sss.id="sss";   
                      time=video.currentTime;             
               ss.removeAttribute("controls");
               ss.className=video_left; 
               ssss.appendChild(ss)
               doc.body.appendChild(ssss);
                        ii++;
                setTimeout(function(){
                	video.currentTime=time;
                	video.play();  //这里是进行延迟性的保护
                },1);

                    } 
                   }                  
             }
                  if(ii==1) { 
                  	if(parseInt($("#sss").offset().top-$(window).scrollTop())>0||Math.abs(parseInt($("#sss").offset().top-$(window).scrollTop()))<parseInt($("#sss").height())){
                    var  sssss=doc.body.removeChild(doc.body.lastChild).childNodes[0];
                  	sssss.className=""; 
                  	sssss.controls=true;
                  	video_div.replaceChild(sssss,video_div.childNodes[1]);
             
                  	setTimeout(function(){
                	    video.play();  //这里是进行了保护性延迟
                       },1);
                       ii--;
                   }
                  }  
                  /*浮动控件进行修改，由于没有打算在video上浮的情况，所以控件无法控制页面
                  可视区位于上面的情况，若是需要可以进行修改。*/  
             },
           videopause: function(video,element){//目前只用指定一个点击事件
            	 MYF.EventUtil.addHandler(element,"click",function(){  
            	 	if(video.paused==false){
            	   setTimeout(function(){
            	   	  video.pause(); //这里都是添加了延迟保护，避免用户多次点击控件而造成bug
            	   	 },20);            	 		            	 		
            	 	} else {
            	   setTimeout(function(){
            	   	  video.play(); //这里都是添加了延迟保护，避免用户多次点击控件而造成bug
            	   	 },20);             	 		
            	 		}
            	 });
              },
            videomuted:function(video,element){
            	   MYF.EventUtil.addHandler(element,"click",function(){
            	   	   if(video.muted==false){
            	   	   video.muted=true;
            	   	 } else {
            	   	 	 video.muted=false;
            	   	 	}
            	   	});
            	}
            }
      })();    	 
	    MYF.nav=(function(){
		return{	
		  bottomNav:function(element1,element2,element3){//当滑到那个控件后，按钮开始出现,使用的是jq对象
			    $(element2).hide();
				var sss=$(element1).offset().top;
			   $(window).on("scroll",function(){
				if(sss-$(window).scrollTop()<0){
				  	$(element2).fadeIn();					
				} else {
					$(element2).fadeOut();
			}    //这里也就成了一个控件，第一个参数用来控制超过多少后，按件开始显示。
			  }); //第二个参数，是按钮，第三个参数就是要滑动到那个位置的
		  },
		  huadongNav:function(element2,element3){
			  		 $(element2).on("click",function(){
				   var element3top=$(element3).offset().top-$(element3).height()*0.2;
				 $("body,html").animate({scrollTop:element3top},500);
                  
				 return false;		
			  });  //这个控件用于设置下滑出现回到指定位置的控件 和上面的呼应使用，参数意思相同
			  
		  },
          topNav:function(element2){
			  var ss=$(element2).height();
			  $(window).on("scroll",function(){ 
				if(ss-$(window).scrollTop()<0){
				  	$(element2).addClass("navbar-fixed-top");						
				} else {
				$(element2).removeClass("navbar-fixed-top");//这个控件是用于滑块滑到某个位置，
				   //导航条就固定不动，注意，这个是基于bootstrap实现的。
			} 
			  })
			  
		  },
            rightNav:function(element1,element2){
			$(window).on("scroll",function(){
				var ss=$(element2).offset().top,
				    sss=$(element2).height();
				if(ss-sss*0.3-$(window).scrollTop()<0&&ss+0.8*sss-$(window).scrollTop()>0){
				  	$(element1).addClass("on");				
				} 
				if(ss+sss*0.8-$(window).scrollTop()<0||ss-sss*0.3-$(window).scrollTop()>0){
					$(element1).removeClass("on");
					
				}//这里还存在bug，这如果是针对固定布局，那就只需要改系数就可以了，但是对于响应式布局
				//可能就还存在很多bug
				/*这里设置的系数，基本能保证大部分情况，如果块与块之间的间隔太大，那就没办法，得改系数*/
				//注意这里的判断条件，第一个添加里面，是指当一个块加上0.3高度以及到0.9高度时，添加类
				//那么对应的超出这个范围就应该去除
			  });
				
				
			}		  
		}
			}());
		
			
			
			
		
	  
	  