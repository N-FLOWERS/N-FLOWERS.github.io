
var dpr   = window.devicePixelRatio;
var box   = document.getElementById("wrap");
var pages = document.getElementsByClassName("page");
var h     = window.innerHeight;
var audio = document.getElementById("audio");
var musicBTNS = document.getElementsByClassName("musicBTN");
var x;
var y;
var index = pages.length;
var nowIndex = 0;
var hArr = [];
var isLongTouch = false;
var isScrolling = false;
var CSSARR = ["","-webkit-","-moz-","-ms-","-o-"];

// for(var i=0; i<index-1; i++){
//     var img = pages[i].getElementsByTagName("img")[0];
//     if(dpr >= 2){
//         img.src = img.getAttribute("data-x2");
//         pages[index-1].style.backgroundImage = "url(" + pages[index-1].getAttribute("data-x2") + ")";
//         pages[index-1].style.backgroundSize = "100%";
//     }else if(dpr <= 1.5){
//         img.src = img.getAttribute("data-x1.5");
//         pages[index-1].style.backgroundImage = "url(" + pages[index-1].getAttribute("data-x1.5") + ")";
//         pages[index-1].style.backgroundSize = "100%";
//     }
// }

window.onload=function(){
    for(var k=0;k<pages.length;k++){
        hArr.push(pages[k].clientHeight); 
    }
}

window.onresize=function(){
    h = window.innerHeight;
    // var _n = 0;
    // for(var i=0;i<nowIndex;i++){
    //     _n += hArr[i];
    // }
    // box.style.transform = "translateY(" + (_n) + "px)";
}

box.addEventListener("touchmove",function(e){
    var touch = e.touches[0];
    e.preventDefault();
    if(isLongTouch || isScrolling) {
        return;
    }
    var newX = touch.pageX;
    var newY = touch.pageY;
    var diffx = newX - x;
    var diffy = newY - y;
    if(Math.abs(diffy) < Math.abs(diffx) || Math.abs(diffy) < 30) return;
    if(diffy > 0){
        move("prev");
    }else if(diffy < 0){
        move("next");
    }
})

box.addEventListener("touchstart",function(e){
    var touch = e.touches[0];
    x = touch.pageX;
    y = touch.pageY;
})

box.addEventListener("touchend",function(e){
    isLongTouch = false;
})

var s = "";
function move(str){
    isLongTouch = true;
    var n = 0;
    for(var k=0;k<CSSARR.length;k++){
        if(box.style[CSSARR[k]+"transform"]){
            n = box.style[CSSARR[k]+"transform"].slice(11,-3)*1;
            s = CSSARR[k];
            break;
        }
    }
    if(str == "next"){
        var _n = 0;
        for(var i=0;i<nowIndex;i++){
            _n += hArr[i];
        }
        if(hArr[nowIndex] > h+3 && n == -_n){
            box.style["-webkit-transform"] = "translateY(" + (-_n-(hArr[nowIndex]-h)) + "px)";
            box.style[s+"transform"] = "translateY(" + (-_n-(hArr[nowIndex]-h)) + "px)";
            isScrolling = true;
            setTimeout(function(){
                isScrolling = false;
            },300)
        }else if(nowIndex<index-1){
            box.style["-webkit-transform"] = "translateY(" + (-_n-hArr[nowIndex]) + "px)";
            box.style[s+"transform"] = "translateY(" + (-_n-hArr[nowIndex]) + "px)";
            nowIndex++; 
            isScrolling = true;
            setTimeout(function(){
                isScrolling = false;
            },300) 
        }    
    }else if(str == "prev"){
        var _n = 0;
        for(var i=0;i<nowIndex-1;i++){
            _n += hArr[i];
        }
        if(hArr[nowIndex] > h+3 && n < -_n-(nowIndex-1>=0?hArr[nowIndex-1]:0)){
            box.style["-webkit-transform"] = "translateY(" + (n+(hArr[nowIndex]-h)) + "px)";
            box.style[s+"transform"] = "translateY(" + (n+(hArr[nowIndex]-h)) + "px)";
            isScrolling = true;
            setTimeout(function(){
                isScrolling = false;
            },300)
        }else if(nowIndex>0){
            box.style["-webkit-transform"] = "translateY(" + (-_n) + "px)";
            box.style[s+"transform"] = "translateY(" + (-_n) + "px)";
            isScrolling = true;
            setTimeout(function(){
                isScrolling = false;
            },300)
            nowIndex--;
        }  
    }
}

for(var j=0; j<musicBTNS.length; j++){
    musicBTNS[j].onclick=function(){
        if(this.className == "musicBTN"){
            this.className = "musicBTN playing";
            audio.play();
        }else if(this.className == "musicBTN playing"){
            this.className = "musicBTN";
            audio.pause();
        }
    }
}

audio.onplay = function(){
    for(var i=0; i<musicBTNS.length; i++){
        musicBTNS[i].className = "musicBTN playing"
    }
}
audio.onpause = function(){
    for(var i=0; i<musicBTNS.length; i++){
        musicBTNS[i].className = "musicBTN"
    }
}

var isKeyboard = false;
var ipts = document.getElementsByClassName("formBox")[0].getElementsByTagName("input");
for(var l=0;l<ipts.length-1;l++){
     ipts[l].onfocus=function(){
         if(!isKeyboard){
            isKeyboard = true;
            var num = (box.style[s+"transform"]&&box.style[s+"transform"].slice(11,-3)*1)||
                        (box.style["-webkit-transform"]&&box.style["-webkit-transform"].slice(11,-3)*1);
            box.style["-wekit-transform"] = "translateY(" + (num - 80) +"px)";
            box.style[s+"transform"] = "translateY(" + (num - 80) +"px)";
         }
     }
     ipts[l].onblur=function(){
         if(isKeyboard){
            isKeyboard = false;
            var num = (box.style[s+"transform"]&&box.style[s+"transform"].slice(11,-3)*1)||
                        (box.style["-webkit-transform"]&&box.style["-webkit-transform"].slice(11,-3)*1);
            box.style["-webkit-transform"] = "translateY(" + (num + 80) +"px)";
            box.style[s+"transform"] = "translateY(" + (num + 80) +"px)";
         }
     }
}

var signIn = document.getElementById("signIn");
var form   = document.getElementById("form");
form.target = "rfFrame";
form.onsubmit = function(e){
    e.preventDefault();
    var sendData = {
        userName : document.getElementById("userName"),
        company  : document.getElementById("company"),
        phone    : document.getElementById("phone")
    } 
    modalFrame(JSON.parse('{"code":"0","msg":"签到成功"}'));
    var xhr = new XMLHttpRequest();
    xhr.open("POST",url,true);
    xhr.onreadystatechange = function(){
        if(xhr.status == 200 && xhr.readyState == 4){
            var data = JSON.parse(xhr.responseText);
            modalFrame(data);
        }else{
             modalFrame(JSON.parse('{"code":"-1","msg":"签到失败！请重试"}'));
        }
    }
    xhr.send(JSON.stringify(sendData))
}


function modalFrame(data){
    var close = document.getElementsByClassName("close")[0];
    var closeBtn = document.getElementsByClassName("closeBtn")[0];
    var mask = document.getElementsByClassName("mask")[0];
    var modalContent = document.getElementsByClassName("modalContent")[0];
    var modal = document.getElementsByClassName("modalFrame")[0];
    
    mask.style.display = "block";
    modalContent.innerHTML = data.msg;
    modalContent.style.color = data.code==0 ? "green" : "red";
    
    setTimeout(function(){
        mask.style.display = "none";
        location.reload();
    },2000)
    
    close.onclick = closeMask;
    closeBtn.onclick = closeMask;
    
    function closeMask(){
        mask.style.display = "none";
        location.reload();
    }
}




