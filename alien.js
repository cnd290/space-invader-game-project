class Alien{
    constructor(x,y,imgA,imgB,pointValue){
        this.x=x;
        this.y=y;
        this.w=35;
        this.h=20;
        this.alive=true;
        this.imgA=imgA;
        this.imgB=imgB;
        this.currentImg='A';
        this.pts=pointValue;
        this.radius=20;                 //為了碰撞用
        this.xdir=8;
    }

    show(){
        if(this.alive===true){          // show if alive
            if(this.currentImg==='A'){
                image(this.imgA,this.x,this.y,this.w,this.h);
            }
            if(this.currentImg==='B'){
                image(this.imgB,this.x,this.y,this.w,this.h);
            }
        }
    }

    move(){
        this.x=this.x+this.xdir;        //橫向移動
    
        if(this.currentImg==='A'){      //aliens 的動畫 A,B圖片不斷轉換
            this.currentImg='B';
        }
        else if(this.currentImg==='B'){
            this.currentImg='A';
        }
    }
   
    shiftDown(){
        this.xdir=-this.xdir;           //讓aliens 能轉換橫向移動的方向
        this.y=this.y+this.h;           //向下移動
    }
}