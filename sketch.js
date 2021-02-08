var dog, happyDogImg, database, foodS, foodStock;
var dogImg, dogImg2;
//var foods = 0;

function preload()
{
  //load images here
  dogImg = loadImage("images/dogImg.png");
  happyDogImg = loadImage("images/dogImg1.png");
}

function setup() {
  database = firebase.database();

  createCanvas(500, 500);
  dog = createSprite(250, 250, 10, 10);
  dog.addImage("dogImg", dogImg);
  dog.scale = 0.2;

  foodStock = database.ref("Food")
  foodStock.on("value", readStock);

  food= new Food()

   
  feed=createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods)
  
}


function draw() {  
  background(46, 139, 87);
  //console.log(foodStock);

  stroke("blue");
  fill("white");
  textSize(18);
  text("Press The Up Arrow Key To Feed The Dog Milk", 50, 50);

  stroke("blue");
  fill("white");
  textSize(18);
  text("Press The Down Arrow T Stop Feeding The Dog Milk", 35, 75);

  stroke("blue");
  fill("white");
  textSize(18);
  if(foodS){
    text("Food Remaing :- " + foodS, 150, 150);
  }

  if(keyWentDown(UP_ARROW)) {
    
    dog.addImage("dogImg", happyDogImg);
    writeStock(foodS);
  }

  if(keyWentUp(DOWN_ARROW)) {
   
    dog.addImage("dogImg", dogImg);
    //writeStock(foodS);
  }

  drawSprites();
  //add styles here

}

function writeStock(x){
  if(x <= 0) {
    x = 0;
  } else {
    x = x -1;
  }
  database.ref("/").set({
      Food: x
  })

}

function readStock(data) {
  foodS = data.val();
 food.updateFoodStock(foodS)
}

function feedDog(){
  dog.addImage("dogImg",happyDogImg)


  food.updateFoodStock(Food.getFoodStock()-1)
  database.ref("/").update({
    Food:food.getFoodStock(),
    Feedtime:hour()
  })

  
}
function addFoods(){
  foodS++;
  database.ref("/").update({
    Food:foodS
  })
}
