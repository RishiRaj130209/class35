const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

var ground,wall1,wall2;
var stones = [];

function preload(){
  zombie1 = loadImage("zombie.png") 
  zombie2 = loadImage("zombie.png") 
  zombie3 = loadImage("zombie.png") 
  zombie4 = loadImage("zombie.png")
  
  stoneImg = loadImage("stone.png")
  backgroundImg = loadImage("background.png")
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  engine = Engine.create();
  world = engine.world;
  frameRate(80);

  ground = new Base(0,height-10,width*2,20)
  wall1 = new Base(100,height-300,200,height/2+100)
  wall2 = new Base(width-100,height-300,200,height/2+100)

  zombie = createSprite(width/2,height -110)
  zombie.addAnimation("lefttoright",zombie1,zombie2,zombie1)
  zombie.addAnimation("righttoleft",zombie3,zombie4,zombie3)
  zombie.scale = 0.1
  zombie.velocityX = 1;

  breakButton = createButton("test")
  breakButton = createImg("axe.png")
  breakButton.position(width-200,height/2-50)
  breakButton.size(100,100)
  breakButton.class("breakButton")
  breakButton.mousePressed(handleButtonPressed)


  bridge = new Bridge(20,{x:50,y:height/2-150})
  
  jointPoint = new Base(width-250,height/2 -100,40,20)

  Matter.Composite.add(bridge.body,jointPoint);
  jointLink = new Link(bridge,jointPoint)


    for(var i = 0; i <= 8; i++){
    var x = random(width/2 -200,width/2 +300);
    var y = random(-10,140);
    var stone = new Stone(x,y,80,80);
  
    stones.push(stone)
  }
}

function draw() {
  background(backgroundImg);
  Engine.update(engine);

  
  bridge.display()


  
  

  
  for(var stone of stones){
    stone.display()
  }
  if(zombie.position.x>= width-300){
    zombie.velocityX = -1
    zombie.changeAnimation("righttoleft")
  }

  if(zombie.position.x<= 300){
    zombie.velocityX = 1
    zombie.changeAnimation("lefttoright")
  }
  drawSprites()
}
 
function handleButtonPressed(){
  console.log("Pressed")
  jointLink.detach()
  //jointLink2.detach()
  setTimeout(() => {
    bridge.break()
  },1500)
}