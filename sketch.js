var backImage,backgr;
var player, player_running;
var ground,ground_img;
var banana,bananaimg;
var obstacle,obstacleimg;
var obstaclegroup,foodgroup;

var END =0;
var PLAY =1;
var gameState = PLAY;
var score=0;
var overimg;

function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  obstacleimg=loadImage("stone.png");
  bananaimg=loadImage("banana.png");
  overimg=loadImage("gameOver.png");

  foodgroup=new Group();
  obstaclegroup=new Group();
}

function setup() {
  createCanvas(800,400);
  
  /*backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;*/
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;
  
}

function spawnfood(){
  if(frameCount%80==0){
    banana=createSprite(Math.round(random(300,750)),200);
    banana.scale=0.1; 
    banana.addImage(bananaimg); 
    banana.velocityX  =-6;
    foodgroup.add(banana);

    banana.lifetime=300;
    player.depth=banana.depth+1;
 }
}

function spawnobstacles(){
  if(frameCount%150==0){
    obstacle=createSprite(Math.round(random(400,760)),320);
    obstacle.scale=0.15;
    obstacle.velocityX=-6;
    obstacle.addImage(obstacleimg); 
    obstaclegroup.add(obstacle); 

    obstacle.lifetime=300;
  }
}

function draw() { 
  background(backImage);

  if(gameState===PLAY){
  
    spawnfood();
    spawnobstacles();

  /*if(backgr.x<100){
    backgr.x=backgr.width/2;
  }*/
  
    if(keyDown("space") ) {
      player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.8;
  
    if(foodgroup.isTouching(player)){
      foodgroup.destroyEach();
      score=score+2;
      player.scale+=0.01;
    }

    if(obstaclegroup.isTouching(player)){
      gameState=END;
    }
    player.collide(ground);

  }
  else if(gameState===END){
   // backgr.velocityX=0;
    player.visiblity=false;

    foodgroup.destroyEach();
    obstaclegroup.destroyEach();

    stroke("black");
    strokeWeight(10);
    textSize(55);
    text("GAMEOVER",400,200);

    if(keyDown(UP_ARROW)){
      gameState=PLAY;
    }

  }

  drawSprites();
  stroke("black");
  strokeWeight(10);
  textSize(55);
  text("SCORE= "+score,500,100);
}
