var smallReds   = document.getElementsByClassName("small-red");
var red		    = document.getElementsByClassName("red")[0];
var smallRedBox = document.getElementsByClassName("smallred-box")[0];
var topTitle    = document.getElementsByClassName("top")[0];
var points      = document.getElementsByClassName("points")[0];
var messageBox  = document.getElementsByClassName("message-box")[0];
var allOBJ      = [];	//储存所有smallRed对象；

function SmallRed(ele,delay){
	this.ele = ele;
	this.delay = delay;
}

SmallRed.prototype.init = function(){
	var ele = this.ele;
	this.top = -40;
	this.position = Math.random()*70 - 15 ;
	this.direction = ["left","right"][Math.round(Math.random())];
	var n = this.direction == "left" ? -1 : 1;
	this.angel = n * Math.round(Math.random()*45) + "deg";
	this.duration = 20;
	this.scale = Math.random()*0.3 + 0.7;

	ele.style.left = "auto";
	ele.style.right = "auto";
	ele.style["-webkit-transform"] = "rotate(" + this.angel + ")";
	ele.style["transform"] = "rotate(" + this.angel +")";
	ele.style["-webkit-transform"] += "scale(" + this.scale + ")";
	ele.style["transform"] += "scale(" + this.scale + ")";
	ele.style[this.direction] = this.position + "px";
	this.start();
}

SmallRed.prototype.start = function(){
	var that = this;
	that.timer1 = setTimeout(function(){
		that.timer2 = setInterval(function(){
			if(that.top >= window.innerHeight){
				clearInterval(that.timer2);
				that.init();
				return;
			}
			that.top += 7;
			that.ele.style.top = that.top + "px";
		},that.duration)
	},that.delay)
}

for(var i=0; i<smallReds.length; i++){
	var o = new SmallRed(smallReds[i],(1*i+0.5)*1000);
	o.init();
	allOBJ.push(o);
}

red.addEventListener("click",openRed,false);

function openRed(){
	red.className += " shake-chunk";
	var time = new Date();
	
	// var xhr = new XMLHttpRequest();
	// xhr.open("POST",url,true);
	// xhr.onreadystatechange = function(){
	// 	if(xhr.status == 200 && xhr.readyState == 4){
	// 		var diffTime = new Date() - time;
	// 		if(diffTime >= 2000){
	// 			changeBg(JSON.parse(xhr.responseText));
	// 		}else if(diffTime < 2000){
	// 			setTimeout(function(){
	// 				changeBg(JSON.parse(xhr.responseText));
	// 			},2000-diffTime)
	// 		}
	// 	}else{
	// 		alert("失败！")
	// 	}
	// }
	// xhr.send();

	setTimeout(function(){
		red.className = red.className.replace(/shake-chunk/,"");
		changeBg({code:0,sum:"¥50元",message:"恭喜你领到"})
	},2000)
}

function changeBg(data){
	//假设返回数据中code-0表示成功，sum表示金额，message表示提示语
	if(data.code === 0 && data.sum && data.message){
		for(var i=0; i<allOBJ.length; i++){
			clearInterval(allOBJ[i].timer1);
			clearTimeout(allOBJ[i].timer2)
		}
		smallRedBox.style.display = "none";
		red.className += " congrats";
		topTitle.className += " congrats";
		points.style.display = "block";
		document.getElementById("message").textContent = data.message;
		document.getElementById("monney").textContent = data.sum;
		red.removeEventListener("click",openRed);
	}
}
