class Stone{
    constructor(x,y,w,h){
        var options={
            restitution:0.7,
            //isStatic:false
        }
    this.body = Bodies.rectangle(x,y,w,h,options)
    this.w = w;
    this.h = h;
    this.stoneImage = loadImage("stone.png")
    World.add(world,this.body)
    }
display(){
  var pos = this.body.position
  var angle = this.body.angle;
  push()
  translate(pos.x,pos.y)
  rotate(angle);
  imageMode(CENTER)
  image(this.stoneImage,0,0,this.w,this.h)
  pop()
}
}