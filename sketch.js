
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score,ground
var survivalTime=0;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
  
  foodGroup=new Group()
  obstacleGroup = new Group()
  
}



function setup() {
  createCanvas(670,400)
  
  score=0
  survivalTime=0
  
  ground=createSprite(0,400,1500,10);

  
  
  
  monkey=createSprite(90,370,10,10)
  monkey.addAnimation("monkey_running",monkey_running);
  monkey.scale=0.1;
  
  obstacle=createSprite(300,500,20,20)
  

  ground.x=ground.width/2;
  
  obstacleGroup=createGroup();
  bananaGroup=createGroup();

  
}


function draw() {
  
  background("green")
     
  if(ground.x<0){
    ground.x=ground.width/2;
    
  }
  spawnObstacles();
  spawnBanana();
  
  
  if(keyDown("space")&&monkey.y>=200){
    monkey.velocityY=-10;
  }
  
  
  if(bananaGroup.isTouching(monkey)){
    bananaGroup.destroyEach();
    score=score+1
  }
  
  monkey.velocityY=monkey.velocityY+0.8  
  monkey.collide(ground);
  
  drawSprites();
  fill("white")
  text("score: "+score,500,50)
  
  fill("black")
  textSize(20)
  survivalTime=Math.round(frameCount/5)
  text("survival Time: "+survivalTime,100,50)

}

function spawnObstacles(){
  if(frameCount%150 === 0){
    var obstacle=createSprite(500,380,20,20);
    obstacle.addImage(obstacleImage);
    
    
    var rand = Math.round(random(1));
    switch(rand){
      case 1: obstacle.addImage(obstacleImage)
             break;
             default:break;        
    }
    
    obstacle.scale=0.25;
    obstacle.lifetime=450;
    
    obstacle.velocityX=-4
    
    obstacleGroup.add(obstacle);
  }
}

function spawnBanana(){
  
  if(frameCount % 160 === 0){
    banana= createSprite(600,100,40,10)
    banana.y=Math.round(random(200,300));
    banana.addImage(bananaImage);
    banana.scale=0.1;
    banana.velocityX=-3;
    
    monkey.lifetime=500;
    
    banana.depth=monkey.depth
    monkey.depth=banana.depth+1
    
    bananaGroup.add(banana);
    
    
  }
}
