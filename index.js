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

    var timer1 = setInterval(move1,2000);
    var timer2 = setInterval(move2,2000);
    var timer3 = setInterval(move3,2000);
    
    touch.on("#figure1","touchstart",function(e){
        clearInterval(timer1);
    })
    touch.on("#figure1","touchend",function(e){
        timer1 = setInterval(move1,2000);
    })
    touch.on("#figure1","swipeleft",function(e){
        move1(nowIndex1+1);
    })
    touch.on("#figure1","swiperight",function(e){
        move1(nowIndex1-1);
    });
     touch.on("#figure2","touchstart",function(e){
        clearInterval(timer2);
    })
    touch.on("#figure2","touchend",function(e){
        timer2 = setInterval(move2,2000);
    })
    touch.on("#figure2","swipeleft",function(e){
        move2(nowIndex2+1);
    })
    touch.on("#figure2","swiperight",function(e){
        move2(nowIndex2-1);
    });
    touch.on("#figure3","touchstart",function(e){
        clearInterval(timer3);
    })
    touch.on("#figure3","touchend",function(e){
        timer3 = setInterval(move3,2000);
    })
    touch.on("#figure3","swipeleft",function(e){
        move3(nowIndex3+1);
    })
    touch.on("#figure3","swiperight",function(e){
        move3(nowIndex3-1);
    });

    function move1(i){
        nowIndex1 ++;
        if(nowIndex1 >= index1) nowIndex1 = 0;
        if(typeof i == "number") nowIndex1 = (i >= index1) ? 0 : ((i <= -1) ? index1-1 : i);
        $figure1.css("left",-nowIndex1 * 100 +"%");
        $(".slide-bar1 li").removeClass("current").eq(nowIndex1).addClass("current");
    }
    function move2(i){
        nowIndex2 ++;
        if(nowIndex2 >= index2) nowIndex2 = 0;
        if(typeof i == "number") nowIndex2 = (i >= index2) ? 0 : ((i <= -1) ? index2-1 : i);
        $figure2.css("left",-nowIndex2 * 100 +"%");
        $(".slide-bar2 li").removeClass("current").eq(nowIndex2).addClass("current");
    }
    function move3(i){
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
    touch.on("#bands","swipeleft",function(e){
        movebands(bandsnowIndex+1);
    })
    touch.on("#bands","swiperight",function(e){
        movebands(bandsnowIndex-1);
    });
    
    function movebands(i){
        bandsnowIndex = i;
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