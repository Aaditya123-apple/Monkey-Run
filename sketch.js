
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var backImage,backgr;
var End = 0;
var player, player_running;
var ground,ground_img;
var gameState;
var bananagroup, bananaImage;
var stonegroup, obstacle_img;
var gameOver,gameOverImg;
var score=0;


function preload(){
  backImage=loadImage("jungle2.jpg")
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png")
  gameOverImg = loadImage("gameOver.png")
  bananaImage = loadImage("Banana.png")
  obstacle_img = loadImage("stone.png")
  player_stop = loadImage ("Monkey_11.png")
}

function setup() {
  createCanvas(800,400);

  gameover = createSprite(500,400,50,50)
  gameover.addImage("gameOver",gameOverImg)
  gameover.visible = false
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX = -3
  
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;

  player.addAnimation("stop",player_stop);
  
  ground = createSprite(400,350,800,10);

  ground.x=ground.width/2;
  ground.visible=false;
  ground.velocityX = -3
  
 bananagroup = new Group();
 stonegroup = new Group();
  
  score = 0;
}

function draw() {
  
  background(255);

  if (gameState===PLAY){
   
    //camera.x = player.x;
    //camera.y = player.y;
      
      if(backgr.x<0){
      backgr.x=backgr.width/2;
      }
      
      Food();
      obstacle();
      
      if (keyDown("space")) {
       player.velocityY = -10;
        
      }
      player.velocityY = player.velocityY + 0.5;
     player.collide(ground);
      
    if (ground.x<0 ) {
      ground.x = ground.width/2; 
     }
      
      if(bananagroup.isTouching(player)){
         
        bananagroup.destroyEach();
        score=score+2;
         }
      
      if(stonegroup.isTouching(player)){
      gameState = END;
    }
      
      switch(score){
          
          case 10: player.scale = 0.12;
          break;
          case 20: player.scale = 0.14;
          break;
          case 30: player.scale = 0.16;
          break;
          case 40: player.scale = 0.18;
          break;
          default: break;
      }
  }
  else if (gameState===END){
    ground.velocityX = 0;
    player.velocityY = 0;
    stonegroup.setVelocityXEach(0);
    stonegroup.setLifetimeEach(-1);
    bananagroup.setVelocityXEach(0);
    bananagroup.setLifetimeEach(-1);
    gameover.visible = true;
    backgr.velocityX = 0;
    player.changeAnimation("stop",player_stop)

  }

  drawSprites();
  
fill("black");
text("Score : "+score,270,30);
}

function obstacle(){
 
if (frameCount%120===0) {
  
  var  stone = createSprite(800,330,20,20);
 stone.addAnimation("obstacle_image",obstacle_img);
 stone.velocityX = -4;
 stone.lifetime = 310;
 stone.scale = 0.15;
 stonegroup.add(stone);
}
}

function Food(){
 
  if (frameCount%60===0) {
  
  var banana = createSprite(800, 200);
  banana.addImage("banana",bananaImage);
  banana.velocityX = -4;
  banana.lifetime = 290;
  banana.scale = 0.05;
banana.y = random(120,200);
 bananagroup.add(banana);
} 
}