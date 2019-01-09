var WINDOW_WIDTH = 1024;
var WINDOW_HEIGHT = 768;
var RADIUS = 8;
var MARGIN_TOP = 60; //表示每个数字距离画布上面的距离 
var MARGIN_LEFT = 30; //表示第一个数字距离画布左侧的距离

// const endTime = new Date(2019, 0, 9, 18, 20, 42);
//设置时间为当前时间的一个小时以后 setTime()表示一个时间戳 从1970年1月1日算起  设置倒计时
// var endTime = new Date();
// endTime.setTime(endTime.getTime() + 3600 * 1000);

var curShowTimeSeconds = 0;

var balls = [];
const colors = ['#33B5E5', '#0099CC', '#AA66CC', '#9933CC', '#99CC00', '#669900', '#FFBB33', '#FF8800', '#FF4444', '#CC0000']

window.onload = function () {

    //屏幕自适应
    WINDOW_WIDTH = document.body.clientWidth;
    // WINDOW_HEIGHT = document.body.clientHeight;

    MARGIN_LEFT = Math.round(WINDOW_WIDTH / 10);
    RADIUS = Math.round(WINDOW_WIDTH * 4 / 5 / 108) - 1;

    MARGIN_TOP = Math.round(WINDOW_HEIGHT / 5);

    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    canvas.width = WINDOW_WIDTH;
    canvas.height = WINDOW_HEIGHT;

    curShowTimeSeconds = getCurrentShowTimeSeconds();
    // rander(context);
    setInterval(
        function () {
            //绘制
            render(context);
            //数据的改变
            update();
        }, 50
    )
}

function getCurrentShowTimeSeconds() {
    var curTime = new Date();
    console.log(curTime)
    console.log(curTime.getTime())
    //倒计时
    /*  var ret = endTime.getTime() - curTime.getTime();
     //ret/1000将毫秒转换为秒
     //Math.round() 取整
     ret = Math.round(ret / 1000);

     return ret >= 0 ? ret : 0; */
    //时钟
    var ret = curTime.getHours() * 3600 + curTime.getMinutes() * 60 + curTime.getSeconds();
    return ret;
}

function update() {
    var nextShowTimeSeconds = getCurrentShowTimeSeconds();

    var nextHours = parseInt(nextShowTimeSeconds / 3600);
    var nextMinutes = parseInt((nextShowTimeSeconds - nextHours * 3600) / 60);
    var nextSeconds = nextShowTimeSeconds % 60;

    var curHours = parseInt(curShowTimeSeconds / 3600);
    var curMinutes = parseInt((curShowTimeSeconds - curHours * 3600) / 60);
    var curSeconds = curShowTimeSeconds % 60;

    //当时间改变时添加小球
    if (nextSeconds != curSeconds) {
        //时的两位数
        if (parseInt(curHours / 10) != parseInt(nextHours / 10)) {
            addBalls(MARGIN_LEFT + 0, MARGIN_TOP, parseInt(curHours / 10))
        }
        if (parseInt(curHours % 10) != parseInt(nextHours % 10)) {
            addBalls(MARGIN_LEFT + 15 * (RADIUS + 1), MARGIN_TOP, parseInt(curHours / 10))
        }
        //分的两位数
        if (parseInt(curMinutes / 10) != parseInt(nextMinutes / 10)) {
            addBalls(MARGIN_LEFT + 39 * (RADIUS + 1), MARGIN_TOP, parseInt(curMinutes / 10))
        }
        if (parseInt(curMinutes % 10) != parseInt(nextMinutes % 10)) {
            addBalls(MARGIN_LEFT + 54 * (RADIUS + 1), MARGIN_TOP, parseInt(curMinutes / 10))
        }
        //秒的两位数
        if (parseInt(curSeconds / 10) != parseInt(nextSeconds / 10)) {
            addBalls(MARGIN_LEFT + 78 * (RADIUS + 1), MARGIN_TOP, parseInt(curSeconds / 10))
        }
        if (parseInt(curSeconds % 10) != parseInt(nextSeconds % 10)) {
            addBalls(MARGIN_LEFT + 93 * (RADIUS + 1), MARGIN_TOP, parseInt(nextSeconds / 10))
        }
        curShowTimeSeconds = nextShowTimeSeconds;

    }
    updateBalls();
    console.log(balls.length)
}
//对小球更新
function updateBalls() {
    for (var i = 0; i < balls.length; i++) {
        balls[i].x += balls[i].vx;
        balls[i].y += balls[i].vy;
        balls[i].vy += balls[i].g;

        // 地板检测
        if (balls[i].y >= WINDOW_HEIGHT - RADIUS) {
            balls[i].y = WINDOW_HEIGHT - RADIUS;
            balls[i].vy = -balls[i].vy * 0.75;
        }
    }

    //提高性能 将不在画布内的小球删除掉 避免占用内存
    var cnt = 0;
    for (var i = 0; i < balls.length; i++)
        if (balls[i].x + RADIUS > 0 && balls[i].x - RADIUS < WINDOW_WIDTH)
            balls[cnt++] = balls[i];
    while (balls.length > Math.min(300, cnt)) {
        balls.pop()
    }
}

// 添加小球
function addBalls(x, y, num) {
    for (var i = 0; i < digit[num].length; i++)
        for (var j = 0; j < digit[num][i].length; j++)
            if (digit[num][i][j] == 1) {
                var aBall = {
                    x: x + j * 2 * (RADIUS + 1) + (RADIUS + 1),
                    y: y + i * 2 * (RADIUS + 1) + (RADIUS + 1),
                    g: 1.5 + Math.random(), //加上0`1的随机数 
                    vx: Math.pow(-1, Math.ceil(Math.random() * 1000)) * 4, // 前面一串用来判断取+1还是-1 ceil()取整 得偶数为+1 奇数为-1 （-4,4）
                    vy: -5,
                    color: colors[Math.floor(Math.random() * colors.length)] //用随机数0`1之间乘10  向下取整 [0,10)
                }
                balls.push(aBall);
            }
}

function render(cxt) {
    // var hours = 12;
    // var minutes = 34;
    // var seconds =  56;
    //对动画进行刷新
    cxt.clearRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT)

    var hours = parseInt(curShowTimeSeconds / 3600);
    var minutes = parseInt((curShowTimeSeconds - hours * 3600) / 60);
    var seconds = curShowTimeSeconds % 60;

    randerDigit(MARGIN_LEFT, MARGIN_TOP, parseInt(hours / 10), cxt)
    randerDigit(MARGIN_LEFT + 15 * (RADIUS + 1), MARGIN_TOP, parseInt(hours % 10), cxt)
    randerDigit(MARGIN_LEFT + 30 * (RADIUS + 1), MARGIN_TOP, 10, cxt) //冒号

    randerDigit(MARGIN_LEFT + 39 * (RADIUS + 1), MARGIN_TOP, parseInt(minutes / 10), cxt)
    randerDigit(MARGIN_LEFT + 54 * (RADIUS + 1), MARGIN_TOP, parseInt(minutes % 10), cxt)
    randerDigit(MARGIN_LEFT + 69 * (RADIUS + 1), MARGIN_TOP, 10, cxt) //冒号

    randerDigit(MARGIN_LEFT + 78 * (RADIUS + 1), MARGIN_TOP, parseInt(seconds / 10), cxt)
    randerDigit(MARGIN_LEFT + 93 * (RADIUS + 1), MARGIN_TOP, parseInt(seconds % 10), cxt)

    // 渲染小球
    for (var i = 0; i < balls.length; i++) {
        cxt.fillStyle = balls[i].color;

        cxt.beginPath();
        cxt.arc(balls[i].x, balls[i].y, RADIUS, 0, 2 * Math.PI, true)
        cxt.closePath();

        cxt.fill()
    }

}

function randerDigit(x, y, num, cxt) {
    cxt.fillStyle = "rgb(0,120,153)";
    //双重for循环 i表示行 j表示列
    for (var i = 0; i < digit[num].length; i++)
        for (var j = 0; j < digit[num][i].length; j++) {
            if (digit[num][i][j] == 1) {

                cxt.beginPath();
                cxt.arc(x + j * 2 * (RADIUS + 1) + (RADIUS + 1), y + i * 2 * (RADIUS + 1) + (RADIUS + 1), RADIUS, 0, 2 * Math.PI)
                cxt.closePath();

                cxt.fill();
            }
        }
}