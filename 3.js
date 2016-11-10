
 var request=new XMLHttpRequest(),
     url="https://toupk123.github.io/dongman.githtb.io/1.json"
      request.onload=function(){
       if(request.status==200){
         sa(request.responseText);
       }
      }  
     request.open("get",url);
     request.send(null);
function sa(s){
  var cc=JSON.stringify(s);
  document.getElementById("s").innerHTML=cc;
  alert(":s");
}

