(function(){
 var request=new XMLHttpRequest(),
     url="https://toupk123.github.io/dongman.githtb.io/1.json"
  request.open("get",url);
      request.onload=function(){
       if(request.status==200){
         sa(request.responseText);
       }
      }
     request.send(null);
function sa(s){
  var cc=JOSN.parse(s);
  document.getElementById("s").innerHTML=cc;
  alert(":s");
}
 })();
