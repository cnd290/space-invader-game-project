class Ship{
    constructor() {
        this.y=height-8;
        this.width=70;
        this.height=8;
        this.xdir=0;
    }

    show(){
        fill(141, 220, 148);
        noStroke();
        rect(mouseX-30,this.y,this.width,this.height);
        rect(mouseX-23.7,this.y-4,57,4);
        rect(mouseX-6,this.y-13,20,10);  //因為方塊相疊 要疊的對稱 -> 若最小方塊寬度為8 這邊滑鼠x位置為方塊左上角的x方向位置  為了對稱 那此方塊寬度為20 方塊左上角的x方向位置就要為 滑鼠x位置-(20-8)/2
        rect(mouseX,this.y-18,8,10);
    }
}