var monkey, monkey_running
var banana, bananaImage, obstacle, obstacleImage
var score
var PLAY = 1
var END = 0
  var gameState = PLAY
var back, backImage
var ground
var score
var invG

function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  backImage = loadImage("jungle.jpg")
  
}



function setup() {

  createCanvas(600, 600)

  score = 0;

 

  ground = createSprite(300, 300)
  ground.addImage(backImage)

  bananaGroup = new Group();
  rockGroup = new Group();
  
  monkey = createSprite(100, 450, 50, 50);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.1
  monkey.depth = ground.depth+5;
   invG = createSprite(300, 500,600,10)
  invG.visible = false
}


function draw() {
  background("white");
  if (gameState === PLAY) {


      spawnBanana()
      spawnRocks();

    ground.velocityX = -(4 + 3 * score / 100)
    
    if(ground.x<0){
       ground.x = 400;
       }

   if(monkey.isTouching(bananaGroup)){
     score = score + 2;
     bananaGroup.destroyEach()
    
       switch(score){
        case 10 : monkey.scale = 0.14
        case 20 : monkey.scale = 0.16
        case 30 : monkey.scale = 0.18
      }
   } 






    //jump when the space key is pressed
    if (keyDown("SPACE") && monkey.y>450) {
      monkey.velocityY = monkey.velocityY - 10;

    }
    monkey.velocityY = monkey.velocityY + 0.8
    //add gravity


    if (rockGroup.isTouching(monkey)) {
      gameState = END;

    }
    monkey.collide(invG);
    
    
  drawSprites();
  textSize(25)
  text("Score : " + score, 400, 100)
  }
  if (gameState === END) {


  textSize(30)
  fill("red");
  text("Monkey Lost",300,300)

  }

}

function spawnRocks() {

  if (frameCount % 300 === 0) {
    obstacle = createSprite(650, 441, 50, 50);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.2
    obstacle.velocityX = -9
    obstacle .lifetime = 600
    rockGroup.add(obstacle)
  }
  console.log("SpawnRock funcions")
}


function spawnBanana() {

  if (frameCount % 80 === 0) {
    banana = createSprite(650, 341, 50, 50);
    banana.addImage(bananaImage);
    banana.scale = 0.1
    banana.velocityX = -9
    banana.y = Math.round(random(220, 341))
    banana.lifetime = 600
    bananaGroup.add(banana)

  }
}