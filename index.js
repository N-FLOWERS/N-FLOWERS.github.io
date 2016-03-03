!function($){
    
    var $figure1 = $("#figure1");
    var $figure2 = $("#figure2");
    var $figure3 = $("#figure3");
    
    $figure1.parent(".figurebox").height($figure1.height());
    $figure2.parent(".figurebox").height($figure2.height());
    $figure3.parent(".figurebox").height($figure3.height());
    
    var index1 = $("#figure1 li").length;
    var nowIndex1 = 0;
    var index2 = $("#figure2 li").length;
    var nowIndex2 = 0;
    var index3 = $("#figure3 li").length;
    var nowIndex3 = 0;

    var timer1 = setInterval(move1,2000);
    var timer2 = setInterval(move2,2000);
    var timer3 = setInterval(move3,2000);

    $figure1.on("touchstart",function(e){
        clearInterval(timer1);
    }).on("touchend",function(e){
        timer1 = setInterval(move1,2000);
    }).on("swipeLeft",function(e){
        alert("swipeLeft");
        move1(nowIndex1+1);
    }).on("swipeRight",function(e){
        move1(nowIndex1-1);
    });
    $figure2.on("touchstart",function(e){
        clearInterval(timer2);
    }).on("touchend",function(e){
        timer2 = setInterval(move2,2000);
    }).on("swipeLeft",function(e){
        move2(nowIndex2+1);
    }).on("swipeRight",function(e){
        move2(nowIndex2-1);
    });
    $figure3.on("touchstart",function(e){
        clearInterval(timer3);
    }).on("touchend",function(e){
        timer3 = setInterval(move3,2000);
    }).on("swipeLeft",function(e){
        move3(nowIndex3+1);
    }).on("swipeRight",function(e){
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
    $bands.on("swipeLeft",function(e){
        movebands(bandsnowIndex+1);
    }).on("swipeRight",function(e){
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