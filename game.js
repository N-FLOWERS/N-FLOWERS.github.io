/*
    点击开始砸蛋时提交ajax，获取结果信息，返回
    {
        code : "0",
        data : {
            name : "礼品名称或空蛋什么"，
            url : "礼品图片地址"，
            success : 0, 0即有礼品，非0无礼品            
        }
    }
    在礼品图片加载完成后开始砸蛋动画
    ajax函数在下方render函数内
*/

var url = "./return.json";   //请求地址
var canvas = document.getElementById('canvas');
var width = canvas.width = window.innerWidth;
var height = canvas.height = window.innerHeight;

var ctx = canvas.getContext('2d');
var game, stage;
// var prize = { name: '数码相机', url: 'images/prize1.jpg', success: 0};
var egg, prizes = [], beat;
var eggI;

var Resource = {
    "egg": { name: "舞台金蛋", url: "images/egg.png",width:width/2},
    "egg2_2": { name: "金蛋碎开背景", url: "images/egg2_2.png",width:width/2},
    "coin": { name: "金币", url: "images/coin.png",width:width*2/3},
    "stage_bg": { name: "舞台背景", url: "images/stage_bg.jpg"},
    "gash": { name: "裂纹", url: "images/gash.png",width:width*0.35},
    "gift": { name: "礼品", url: "images/gift.png",width:width*0.43},
    "beat": { name: "锤子", url: "images/beat.png",width:width*0.3},
    "gs2": { name: "光束2", url: "images/gs2.png",width:width*0.7},
};



// 资源统计
var ResourceTotalCount = 0, ResourceCurrentCount = 0;
for ( var i in Resource ) {
    if ( Resource.hasOwnProperty( i ) ) {
        ResourceTotalCount++;
    }
}

// 资源加载
for ( var i in Resource ) {
    if ( Resource.hasOwnProperty( i ) ) {
        Resource[ i ]['image'] = new Image();
        Resource[ i ]['image'].src = Resource[ i ]['url'];
        Resource[ i ]['image'].onload = function( ) {
           ResourceCurrentCount++;
           if ( ResourceCurrentCount >= ResourceTotalCount ) {
                // 计算高度
                for ( var i in Resource ) {
                    if ( Resource.hasOwnProperty( i ) ) {
                        if ( Resource[ i ]['width'] ) {
                            Resource[ i ]['height'] = Resource[ i ]['width'] / Resource[ i ]['image']['width'] * Resource[ i ]['image']['height'];
                        }
                        if ( Resource[ i ]['height'] ) {
                            Resource[ i ]['width'] = Resource[ i ]['height'] / Resource[ i ]['image']['height'] * Resource[ i ]['image']['width'];
                        }
                    }
                }
                // 资源加载完成，开始游戏
                game = new Game( canvas );
                game.createGameScene();
           }
       }
    }
}

// 获取游戏资源
function getRes( name ) {
    var res = Resource[ name ];
    if ( !res['width'] ) {
        res['width'] = res['image']['width'];
        res['height'] = res['image']['height'];
    }
    return res;
}


// 游戏主体部分
function Game( canvas ) {
    var _this = this;
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.stageW = canvas.width;
    this.stageH = canvas.height;
    this.cw = window.innerWidth;
    this.ch = window.innerHeight;

    this.createGameScene = function() {
        // this.prize = prize;
        this.start();
    };

    this.start = function() {
        render();
    };

    // 点击砸蛋时发送ajax
    function render() {
		eggI = 1;
        var btn = document.getElementById("beat-egg-btn");
        openCanvas();
        btn.onclick = function( e ){
            var that = this;
            var xmlhttp = new XMLHttpRequest() || new ActiveXObject("Microsoft.XMLHTTP");
            var postdata = {};
            xmlhttp.open("POST",url,true);
            xmlhttp.onreadystatechange = function(){
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
                    var o = JSON.parse(xmlhttp.responseText);
                    if(o && o.code == '0'){
                        that.onclick = null;
                        Resource["prize1"] = {
                            name: o.data.name,
                            url: o.data.url,
                            width:width*0.3,
                            success: o.data.success==0?true:false
                        }
                        Resource["prize1"]['image'] = new Image();
                        Resource["prize1"]['image'].src = Resource["prize1"]['url'];
                        Resource["prize1"]['image'].onload = function( ) {
                            if ( Resource["prize1"]['width'] ) {
                                Resource["prize1"]['height'] = Resource["prize1"]['width'] / Resource["prize1"]['image']['width'] * Resource["prize1"]['image']['height'];
                            }
                            if ( Resource["prize1"]['height'] ) {
                                Resource["prize1"]['width'] = Resource["prize1"]['height'] / Resource["prize1"]['image']['height'] * Resource["prize1"]['image']['width'];
                            }
                            btn.className = "hidden";
                            beatEgg();
                        }
                    }else {
                        alert("抽了一下~");
                    }
                }
            }
           xmlhttp.send(JSON.stringify(postdata));
            
        };
    }


    function openCanvas() {
        createEgg();
        stage = new Stage( _this.ctx );
    }

    function createEgg() {
        var eggRes = getRes('egg');
        var x = ( _this.stageW - eggRes['width'] ) / 2;
        var y = (_this.stageH - eggRes['height'])*3/4 ;
        egg = new Egg( _this.ctx, x, y ) ;
    }

    function beatEgg() {
        beat = new Beat( _this.ctx );
    }

    function frameLoop() {
        requestAnimFrame( frameLoop );
        _this.ctx.fillRect( 0, 0, _this.stageW, _this.stageH );
        // 舞台
        if ( stage ) {
        
            stage.draw();
            stage.update();
        }

        if ( egg ) {
            egg.draw();
            egg.update();
            // 砸蛋效果进行中...
            if ( egg['status']==1 ) {

            }
            // 砸蛋结束
            if ( egg['status']==2 ) {
                // 显示礼品
                if ( !prizes.length ) {
                    var prizeRes = getRes('prize'+ eggI);
                    var x = ( _this.stageW - prizeRes['width']) / 2;
                    var y = ( _this.stageH - prizeRes['height']) * 3 / 7 + 60;
                    prizes.push(new Prize( _this.ctx, x, y ));
                    var backBtn = document.getElementById("back-btn");
                    backBtn.className = backBtn.className.replace(/\s*hidden\s*/,"");
                }
            }
        }

        if ( beat ) {
            beat.draw();
            beat.update();

            if ( beat['status']==1 ) {
                beat = null;
                egg['status']=1;
            }
        }


        if(prizes.length>0) {
            var prize = prizes[0];
            prize.draw();
            prize.update( i );
        }

    };frameLoop.call( _this );

}

