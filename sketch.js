var screen=0;
let ship;
let aliens=[]; //array of aliens
let lasers=[]; //array of lasers
let points=0;
let live=5;

//upper bomb
var y2=-20; //垂直位置
var x2=200; //水平位置
var speed2 = 20; //速度

var y3=-20;
var x3=500;
var speed3 = 22;

var y4=-20;
var x4=650;
var speed4 = 12;

var y5=-20;
var x5=300;
var speed5 = 10;

function setup(){
    var cnv = createCanvas(600, 400);
    var x = (windowWidth - width) / 2;
    var y = (windowHeight - height) / 2 -30;
    cnv.position(x, y);
  
    frameRate(10);  //p5.j​​s中的frameRate()函數用於指定每秒顯示的幀數 這裡是為了讓整體動作都不要那麼快
}

function preload(){
    bg1 =loadImage('./image/bgg.png');
    bg2 =loadImage('./image/bg2.png');
    bg3 =loadImage('./image/bg3.png');
    alien1 =loadImage('./image/alien 1.png');
    alien2 =loadImage('./image/alien 2.png');
    alien3 =loadImage('./image/alien 3.png');
    alien4 =loadImage('./image/alien 4.png');
    click = loadSound('./image/click.mp3');
}

function draw(){
    if(screen == 0){
        startScreen()
    }
    else if(screen == 1){
        rule()
    }
    else if(screen == 2){
        gameOn()
    }
    else if(screen==3){
        congrat()
    }	
    else if(screen==4){
        gameOver()
    }	
}

function startScreen(){
  
    //create ship
    ship = new Ship();

    //create bottom row aliens
    let startX=80;
    let startY=190;
    for(var i=0;i<6;i++){
        aliens[i]=new Alien(i*startX+80,startY,alien1,alien2,5);
    }
    //create sixth row aliens
    startY=165;
    let num=0;
    for(var j=6;j<12;j++){
        aliens[j]=new Alien(num*startX+80,startY,alien3,alien4,5);
        num++;
    }
    //create fifth row aliens
    startY=140;
    let num2=0;
    for(var j=12;j<18;j++){
        aliens[j]=new Alien(num2*startX+80,startY,alien1,alien2,5);
        num2++;
    }
    //create fourth row aliens
    startY=115;
    let num3=0;
    for(var j=18;j<24;j++){
        aliens[j]=new Alien(num3*startX+80,startY,alien3,alien4,5);
        num3++;
    }
    //create third row aliens
    startY=90;
    let num4=0;
    for(var j=24;j<30;j++){
        aliens[j]=new Alien(num4*startX+80,startY,alien1,alien2,5);
        num4++;
    }
    //create second row aliens
    startY=65;
    let num5=0;
    for(var j=30;j<36;j++){
        aliens[j]=new Alien(num5*startX+80,startY,alien3,alien4,5);
        num5++;
    }
    //create top row aliens
    startY=40;
    let num6=0;
    for(var j=36;j<42;j++){
        aliens[j]=new Alien(num6*startX+80,startY,alien1,alien2,5);
        num6++;
    }

    background (bg1,700, 500);
    textAlign(CENTER);

    noStroke();
    textSize(20); 
    let startC = color(63,63,63);
    fill(startC);
    textFont('monospace');
    textStyle(BOLD);
    text('-- click to play --', width/2, 300)

    updateGame();
}

function rule(){
    background(bg3,700,500);
    textAlign(LEFT);
    noStroke();
    textFont('Arial');
    textStyle(NORMAL);

    let c0 = color(255);
    fill(c0);
    textSize(18);
    text("# Please use space-key to shoot aliens",57,110); 
    text("# Please use your mouse to move spaceship below",57,135); 
    text("# Please be careful of the bombs on the top",57,160); 
    text("   you will lose 1 live if you were hit by the bomb",57,185); 
    text("   and you will lose the game if you lost all of your lives",57,210); 
    text("# You will also lose the game if the aliens touched the ground",57,235); 

    textStyle(BOLD);
    textAlign(CENTER);
    text('-- click to play --', width/2, 280);
}

function gameOn(){
    background (bg2,700, 500);
    fill(157, 202, 154);
    textSize(18);
    noStroke();
    textFont('Arial');
    textStyle(NORMAL);
    text("Score: "+points+"  Aliens Remaining: "+aliens.length+"  live: "+live,170,24);

    //show and move aliens
    var edge=false;
    for(var i=0;i<aliens.length;i++){
        aliens[i].show();
        aliens[i].move();
        if(aliens[i].x>width-35 || aliens[i].x<5){ //這些數字為看邊界調的
            edge=true;
        }
    }
    if(edge===true){  //如果碰到旁邊邊線 往下移動 並且換另一方向橫移
        for(var k=0;k<aliens.length;k++){
            aliens[k].shiftDown();
        }
    }

    //create upper bomb
    let d2 = color(215, 157, 147);
    fill(d2);
    noStroke();
    ellipse(x2,y2,10,10)
    y2+= speed2;

    if(y2>height){  //這樣代表玩家沒被子彈打到 子彈的y位置重置
        y2=-20
    }
    //ship最高的那個方塊高度為10 玩家被子彈打到的狀況 mouseX-+的數字越大越容易被打中 
    //-> 如果炸彈的y位置在ship最高處或是大於ship最高處(y位置在ship最高處下方)並且判斷滑鼠位置(我們是用滑鼠來水平移動飛船)在炸彈水平位置附近  
    if(y2>=height-10 && x2>mouseX-40 && x2<mouseX+40){  
        y2=-20;             //子彈的y位置重置
        live=live-1;        //命-1
        if(live==0){        //如果沒命了 就進入遊戲結束頁面
            screen=4;
        }
    }
    if(y2==-20){
        pickRandom2();
    }

    function pickRandom2(){     //隨機取子彈x位置
        x2= random(40,width-40)
    }

    //create upper bomb
    let d3 = color(255, 173, 91);
    fill(d3);
    noStroke();
    ellipse(x3,y3,10,10)
    y3+= speed3;

    if(y3>height){
        y3=-20
    }
    if(y3>height-10 && x3>mouseX-40 && x3<mouseX+40){  //mouseX-+的數字越大越輕鬆
        y3=-20;
        live=live-1;
        console.log("hit2");
        if(live==0){
            screen=4;
        }
    }
    if(y3==-20){
        pickRandom3();
    }

    function pickRandom3(){
        x3= random(40,width-40)
    }

    //create upper bomb
    let d4 = color(255, 195, 117);
    fill(d4);
    noStroke();
    ellipse(x4,y4,10,10)
    y4+= speed4;

    if(y4>height){
        y4=-20
    }
    if(y4>height-10 && x4>mouseX-40 && x4<mouseX+40){  //mouseX-+的數字越大越輕鬆
        y4=-20;
        live=live-1;
        console.log("hit3");
        if(live==0){
            screen=4;
        }
    }
    if(y4==-20){
        pickRandom4();
    }

    function pickRandom4(){
        x4= random(40,width-40)
    }

    //create upper bomb
    let d5 = color(247, 156, 139);
    fill(d5);
    noStroke();
    ellipse(x5,y5,10,10)
    y5+= speed5;

    if(y5>height){
        y5=-20
    }
    if(y5>height-10 && x5>mouseX-40 && x5<mouseX+40){  //mouseX-+的數字越大越輕鬆
        y5=-20;
        live=live-1;
        console.log("hit4");
        if(live==0){
            screen=4;
        }
    }
    if(y5==-20){
        pickRandom5();
    }

    function pickRandom5(){
        x5= random(40,width-40)
    }

    //show ship 
    ship.show();
    

    //display and move the laser
    for(var las=0;las<lasers.length;las++){
        lasers[las].show();
        lasers[las].move(); 
        //子彈跟外星人產生碰撞
        for(var j=0;j<aliens.length;j++){
            if(lasers[las].hits(aliens[j])===true){
                lasers[las].remove();           //為了讓this.toDelete=true; 以便後面處理打到外星人後 子彈要消失這件事
                points=points+aliens[j].pts;    //加上被玩家打到alien的分數
                aliens.splice(j,1);             //把該alien移出陣列 該alien要消失
            }
      }
    }

    for(var z=lasers.length-1;z>=0;z--){  //打到外星人後 子彈要消失
        if(lasers[z].toDelete===true){
            lasers.splice(z,1);               //把該laser移出陣列
        }
    }

    //win
    if(aliens.length<=0){
        screen=3;
    }

    //lose
    for(var a=0;a<aliens.length;a++){
        if(aliens[a].y>=380){ //400(canvas height)-20(alien radius)
            screen=4;
        }
    }

  
}

function congrat(){
    background(bg3,700,500);
    textAlign(CENTER);
    noStroke();
    textFont('Arial');
    textStyle(NORMAL);

    let c1 = color(255, 249, 168);
    fill(c1);
    textSize(25);
    text("-- ＣＯＮＧＲＡＴＵＬＡＴＩＯＮＳ --",width/2,180); 

    let cc2 = color(255);
    fill(cc2);
    textSize(20);
    text("Your Score : "+points,width/2,220);
    text("click to play again",width/2,250);
}

function gameOver(){
    background(bg3,700,500);
    textAlign(CENTER);
    noStroke();
    textFont('Arial');
    textStyle(NORMAL);

    let cc1 = color(255);
    fill(cc1);
    textSize(35);
    text("ＧＡＭＥ ＯＶＥＲ",width/2,180);

    let cc2 = color(63,63,63);
    fill(cc2);
    textSize(20);
    text("Your Score : "+points,width/2,220);
    text("click to play again",width/2,250);
}

function mousePressed(){
    click.play();
    if(screen==0){
        click.play();
        screen=1;
    }
    else if(screen==1){
        click.play();
        screen=2;
    }
    else if(screen==3){
        click.play();
        screen=0;
    }
    else if(screen==4){
        click.play();
        screen=0;
    }
}


function keyPressed(){
  if(key===' '){ //空白鍵發射子彈
      var laser=new Laser(mouseX+5,ship.y-28); //滑鼠x位置為ship最小方塊左上角的x方向位置 所以要從正中間發射子彈 就是滑鼠x位置+10(最小方塊寬度)/2
      if(screen==2){
          lasers.push(laser);
      }
      else if(screen==3 || screen==4){
          lasers=[];
      } 
  }
}

function updateGame(){
    points=0;
    y2=-20;
    x2=200;
    speed2 = 20;

    y3=-20;
    x3=500;
    speed3 = 22;

    y4=-20;
    x4=650;
    speed4 = 12;

    y5=-20;
    x5=300;
    speed5 = 10;

    live=5;
  
}


