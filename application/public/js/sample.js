function createPhotoCard() {
  // ajax
  var req = new XMLHttpRequest();
  req.responseType = 'json';
  // url
  req.open('GET','https://jsonplaceholder.typicode.com/albums/2/photos',true);
  req.onreadystatechange = function(){
    if (this.readyState == 4 && this.status==200) {
      // response
      var jsonResponse = req.response;
      document.getElementById("items-count").innerHTML=jsonResponse.length;
      for(var i=0;i<jsonResponse.length;i++){
        display(jsonResponse[i].url,jsonResponse[i].title,jsonResponse[i].id);
      }
    } 
  }
req.send();
}
// display function
function display(parse,title,id){
  // set child div
  var div = document.createElement("div");
  div.setAttribute("class","container");
  div.setAttribute("id","photo-"+id)
  // set button to remove on click
  var button = document.createElement("button");
  button.setAttribute("onClick","fadeOut(this)");
  button.setAttribute("id",id);
  // set image
  var img = document.createElement("img");
  img.setAttribute("src",parse);
  img.width = "250";
  img.height = "250";
  button.appendChild(img);
  // set title
  var par = document.createElement("p")
  var text = document.createTextNode(title);
  par.appendChild(text);     
  div.appendChild(button);
  div.appendChild(par);
  // add to a parent div
  document.getElementById("container").appendChild(div);
}
// fadeOut function
function fadeOut(e){
  console.log(e.id);
  document.getElementById("container").removeChild(document.getElementById("photo-"+e.id));
  document.getElementById("items-count").innerHTML-=1;
}