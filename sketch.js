var bananaImage,obstacleImage,backgroundImage;
var obstacleGroup, bananaGroup;
var score = 0;
var monkey;
var ground;

function preload() {
  
 backgroundImage=loadImage("jungle.jpg");
  
  monkey_running=loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  bananaImage=loadImage("banana.png");
  obstacleImage=loadImage("stone.png");
}
function setup() {
  createCanvas(800, 400);
  
  backgroundSprite = createSprite(0,0,800,400);
  backgroundSprite.addImage(backgroundImage);
  backgroundSprite.velocityX = -4;
  backgroundSprite.scale = 1.5;
  backgroundSprite.x = backgroundSprite.width/2;
  
  ground = createSprite(400,350,800,10);
  ground.visible = false;
  
  monkey = createSprite(100,340,20,50);
  monkey.addAnimation("running",monkey_running);
  monkey.scale = 0.1;
  
  bananaGroup = new Group();
  obstacleGroup = new Group();
  
  score = 0;
}

function draw() {
  background(220);
  
  if(backgroundSprite.x<100)
  {
   backgroundSprite.x = backgroundSprite.width/2; 
  }
  
  if(keyDown("space") && monkey.y >= 159)
  {
   monkey.velocityY = -12;
  }
  
  if(obstacleGroup.isTouching(monkey)){
   monkey.scale = 0.2; 
  }
  
  if(bananaGroup.isTouching(monkey)){
    score = score+2;
    bananaGroup.destroyEach();
  }
  
   switch(score){
    case 10: monkey.scale = 0.12;
       break;
    case 20: monkey.scale = 0.14;
       break;
    case 30: monkey.scale = 0.16;
       break;
    case 40: monkey.scale = 0.18;
       break;
       default: break;
   }
    
  
  monkey.collide(ground);
  
  monkey.velocityY = monkey.velocityY + 0.8;
  
  fruits();
  obstacles();
  
  drawSprites();
  
  stroke("white");
textSize(20);
fill("white");
  text("Score: " + score, 500, 50);
}

function fruits()
{
 if(World.frameCount % 80 === 0)
 {
   var banana = createSprite(300,120);
   banana.y = Math.round(random(300,100));
   banana.addImage(bananaImage);
   banana.velocityX = -6;
   banana.scale = 0.1;
   banana.lifetime = 300;
   bananaGroup.add(banana);
 }
}

function obstacles()
{
 if(World.frameCount % 300 === 0)
 {
  var obstacle = createSprite(800,350,10,40);
   obstacle.addImage(obstacleImage);
   obstacle.velocityX = -6;
   obstacle.lifetime = 300;
   obstacle.scale = 0.2;
   obstacleGroup.add(obstacle);
 }
}