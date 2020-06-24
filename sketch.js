// module aliases
var Engine = Matter.Engine,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Body = Matter.Body,
    Detector = Matter.Detector,
    Events = Matter.Events;

var engine;
var world;

//var Adress = 'http://192.168.56.1:3000/sprites/';     //localhost
var Adress = 'https://aliolixx.github.io/Physics/';   //GitHub repository
var myFont;
var sprites= [];

var size = 20;
var Xsize = 100;
var seed;
var grid = true;
var translation = [];
var blockCoordinates = [];

var jump = false;
var toggleInventory = true;

var Items=[];
var itemSelected;
var itemLabel = [];
var terrain= [ eath =[], dirt = [], stone = [], watter=[], trees=[]];

var Players=[];
var gameOver = false;
var PlayersMaxHealth =100;
var range =5 * size;   //blocks that wil be rendered (physics
var renderDepht= 2* 1080;
var spawnPoint=[];

var Enemies=[];

var inventory = [];
var noRepeated = [];
var rowSlots = 1;
var columSlots = 5;
var displayInventory = [];


function preload() {
    if(seed == undefined) date = new Date(), seed = date.getTime();

    myFont = loadFont(Adress + 'fonts/Roboto-Regular.ttf');
    for(var i=0; i< 6; i++){
        sprites[i]= loadImage(Adress + 'images/sprites' + `/${i}.png`);
    }
}

function setup() {
    engine= Engine.create();
    world= engine.world;

    //createCanvas(displayWidth, displayHeight);
    createCanvas(600, 600);
    colorMode(RGB);

    Players.push(new Player(spawnPoint[0], spawnPoint[1], size));   //x, y, dimensions; if corrdinates are not defined we set a random spawnPoint
    GenerateTerrain( Xsize ,height-300, height, 10, size);          //Xsize (blocks num), Ystart (pixels), Yend (pixels), stoneDepht (blocks),dimensions (pixels)


    //Add a pickaxe
    Items.push( new Box(map (random(), 0, 1, spawnPoint[0]-100, spawnPoint[0]+100), spawnPoint[1] +50, size, data[4])); 

    Items.push( new Box(map (random(), 0, 1, spawnPoint[0]-100, spawnPoint[0]+100), spawnPoint[1] -100, size, data[5])); 


}

function mousePressed(){

    if(itemSelected && inventory.indexOf(itemSelected) != -1) Players[0].useItem(itemSelected);

}

function mouseDragged(){   
    if(itemSelected && inventory.indexOf(itemSelected) != -1) Players[0].useItem(itemSelected);
}

function keyPressed(e){
    if(isNaN(e.key) == false && e.key != ' ' && e.key <= noRepeated.length) itemSelected = noRepeated[e.key -1];

    if(e.key == 'e' && toggleInventory == true)toggleInventory= false;
    else if(e.key == 'e' && toggleInventory == false)toggleInventory= true;
}

function draw() {
    background(220);

    if(gameOver == true) GameOver();
    else Engine.update(engine);

    Players[0].collide();  // Register all the collisions with player 0

    translate(translation[0], translation[1]);
    render();    

    if(keyIsDown(65))Players[0].move(-1, 0);
            
    if(keyIsDown(68))Players[0].move(1, 0);
    
    if(keyIsDown(32) && jump)Players[0].move(0, -1);
    
    if(keyIsDown(81)) Players[0].throwItem();

    if(toggleInventory == true)inventoryRenderer();


}
