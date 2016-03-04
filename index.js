!(function(doc, win) {
    var docEle = doc.documentElement,
        evt = "onorientationchange" in window ? "orientationchange" : "resize",
        fn = function() {
            var width = docEle.clientWidth;
            width && (docEle.style.fontSize = 100 * (width / 750) + "px");
        };
    win.addEventListener(evt, fn, false);
    doc.addEventListener("DOMContentLoaded", fn, false);
}(document, window));

!function($){
    
    var $figure1 = $("#figure1");
    var $figure2 = $("#figure2");
    var $figure3 = $("#figure3");
    
    var index1 = $("#figure1 li").length;
    var nowIndex1 = 0;
    var index2 = $("#figure2 li").length;
    var nowIndex2 = 0;
    var index3 = $("#figure3 li").length;
    var nowIndex3 = 0;
    
    var timer1;
    var timer2;
    var timer3;
    var h1 = $figure1.offset().top;
    var h2 = $figure2.offset().top;
    var h3 = $figure3.offset().top;
    var status1 = false;
    var status2 = false;
    var status3 = false;
    
    $(document).on("scroll",function(){
        var scrTop = $(document.body).scrollTop() + window.innerHeight || $(document.documentElement).scrollTop() +window.innerHeight;
        if(scrTop >= h1 - 10 && scrTop <= h1 + $figure1.height() + window.innerHeight && !status1){
            status1 = true;
            clearInterval(timer1)
            timer1 = setInterval(move1,2000);
        }else if( scrTop< h1 - 10 || scrTop > h1 + $figure1.height() + window.innerHeight){
            status1 = false;
            clearInterval(timer1);
        }
        
        if(scrTop >= h2 - 10 && scrTop <= h2 + $figure2.height() + window.innerHeight && !status2){
            status2 = true;
            clearInterval(timer2)
            timer2 = setInterval(move2,2000);
        }else if( scrTop< h2 - 10 || scrTop > h2 + $figure2.height() + window.innerHeight){
            status2 = false;
            clearInterval(timer2);
        }
        
        if(scrTop >= h3 - 10 && scrTop <= h3 + $figure3.height() + window.innerHeight && !status3){
            status3 = true;
            clearInterval(timer3)
            timer3 = setInterval(move3,2000);
        }else if( scrTop< h3 - 10 || scrTop > h3 + $figure3.height() + window.innerHeight){
            status3 = false;
            clearInterval(timer3);
        }
    })

    
    $figure1.on("touchstart",function(e){
        clearInterval(timer1);
    }).on("touchend",function(e){
        clearInterval(timer1);
        timer1 = setInterval(move1,2000);
    }).on("swipeLeft",function(e){
        move1(nowIndex1+1);
    }).on("swipeRight",function(e){
        move1(nowIndex1-1);
    });
    $figure2.on("touchstart",function(e){
        clearInterval(timer2);
    }).on("touchend",function(e){
        clearInterval(timer2);
        timer2 = setInterval(move2,2000);
    }).on("swipeLeft",function(e){
        move2(nowIndex2+1);
    }).on("swipeRight",function(e){
        move2(nowIndex2-1);
    });
    $figure3.on("touchstart",function(e){
        clearInterval(timer3);
    }).on("touchend",function(e){
        clearInterval(timer3);
        timer3 = setInterval(move3,2000);
    }).on("swipeLeft",function(e){
        move3(nowIndex3+1);
    }).on("swipeRight",function(e){
        move3(nowIndex3-1);
    });

    function move1(i){
        console.log(1)
        nowIndex1 ++;
        if(nowIndex1 >= index1) nowIndex1 = 0;
        if(typeof i == "number") nowIndex1 = (i >= index1) ? 0 : ((i <= -1) ? index1-1 : i);
        $figure1.css("left",-nowIndex1 * 100 +"%");
        $(".slide-bar1 li").removeClass("current").eq(nowIndex1).addClass("current");
    }
    function move2(i){
        console.log(2)
        nowIndex2 ++;
        if(nowIndex2 >= index2) nowIndex2 = 0;
        if(typeof i == "number") nowIndex2 = (i >= index2) ? 0 : ((i <= -1) ? index2-1 : i);
        $figure2.css("left",-nowIndex2 * 100 +"%");
        $(".slide-bar2 li").removeClass("current").eq(nowIndex2).addClass("current");
    }
    function move3(i){
        console.log(3)
        nowIndex3 ++;
        if(nowIndex3 >= index3) nowIndex3 = 0;
        if(typeof i == "number") nowIndex3 = (i >= index3) ? 0 : ((i <= -1) ? index3-1 : i);
        $figure3.css("left",-nowIndex3 * 100 +"%");
        $(".slide-bar3 li").removeClass("current").eq(nowIndex3).addClass("current");
    }
    
    
    var $bands = $(".bands");
    var bandsindex = $(".bands li").length;
    var bandsnowIndex = 0;
    var n = 4;
    if(bandsindex > n){
        $(".arrowright").show();
    }
    $bands.on("swipeLeft",function(e){
        movebands(bandsnowIndex+1);
    }).on("swipeRight",function(e){
        movebands(bandsnowIndex-1);
    });
    $(".arrowright").on("tap",function(e){
        movebands(bandsnowIndex+1);
    })
    $(".arrowleft").on("tap",function(e){
        movebands(bandsnowIndex-1);
    })
    
    function movebands(i){
        bandsnowIndex = i;
        if(bandsnowIndex + n >= bandsindex){
            $(".arrowright").hide();
        }else {
            $(".arrowright").show();
        }
        if(bandsnowIndex<=0){
            $(".arrowleft").hide();
        }else{
            $(".arrowleft").show();
        }
        if(i > n) {
            bandsnowIndex = bandsindex/2;
            return;
        }
        if(i < 0) {
            bandsnowIndex = 0;
            return;
        }
        
        
        $bands.css("left",-bandsnowIndex * 200/bandsindex +"%");
    }

}(Zepto)