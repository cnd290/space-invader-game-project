class Laser{
    constructor(x,y){
        this.x=x;
        this.y=y;
        this.r=2.5;             //半徑
        this.diam=this.r*2;     //直徑
        this.toDelete=false;    //flag
    }

    show(){
        noStroke();
        fill(140, 140, 140);
        ellipse(this.x,this.y,this.diam,this.diam); //後面兩個參數為width height
    }

    move(){
        this.y=this.y-20; //往上移動
    }

    hits(alien){
        var d=dist(this.x,this.y,alien.x,alien.y);  //dist() 量測兩點(alien 跟 laser)之間的距離 
        if(d<this.r+alien.radius){                  //代表重疊在一起 產生碰撞
            return true;
        }
        else{
            return false;
        }
    }

    remove(){
        this.toDelete=true;
    }
}