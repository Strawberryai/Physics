// module aliases
var Engine = Matter.Engine,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Body = Matter.Body,
    Detector = Matter.Detector,
    Events = Matter.Events;

var engine;
var world;

var spriteAdress = 'http://192.168.56.1:3000/sprites/';
var myFont;
var pickaxe1;
var sprites= [];


var size = 20;
var translation = [];
var time=0;
var day = true;

var jump = false;
var toggleInventory = false;
var Fpressed = false;

var Items=[];
var terrain= [ eath =[], dirt = [], stone = [], watter=[]];
var Players=[];
var range =5 * size;   //blocks
var spawnPoint=[];

var inventory = [];
var noRepeated = [];
var rowSlots = 5;
var columSlots = 3;
var displayInventory = [];


function preload() {
  myFont = loadFont('http://192.168.56.1:3000/fonts/Roboto-Regular.ttf');

  for(var i=0; i<= 2; i++){
    sprites[i]= loadImage(spriteAdress + `${i}.png`);
  }
  /*sprites[0]= loadImage(spriteAdress + '0.png');
  sprites[1]= loadImage(spriteAdress + '1.png');
  sprites[2]= loadImage(spriteAdress + '2.png');*/
}

function setup() {
    engine= Engine.create();
    world= engine.world;

    //createCanvas(displayWidth, displayHeight);
    createCanvas(600, 600);
    colorMode(RGB);


    GenerateTerrain( 40 ,50, height, 10, size, 3, 10, size);     //Xstart (blocks num), Ystart (pixels), Yend (pixels), stoneDepth (blocks),dimensions (pixels), watterArea (num), watterQuantity (num), watterDimensions (pixels)
    Players.push(new Player(undefined, undefined, size));                       //x, y, dimensions; if corrdinates are not defined we set a random spawnPoint
    
    //Add a pickaxe
    Items.push( new Box(map (random(), 0, 1, spawnPoint[0]-100, spawnPoint[0]+100), spawnPoint[1] -100, size, {
        isStatic: false,
        label:"1",
        friction: 0,
        restitution: 0,
        mass:5,
        Render: true,
        Pickable:false,
        Color: '#FF1744',
        Image:true
    })); 

}

function mouseDragged(){

        //x, y, size^-1 (scale), bodyProperties
        Items.push( new Box(mouseX -translation[0], mouseY - translation[1], size, {
            isStatic: false,
            label:"2",
            friction: 0,
            restitution: 0,
            mass:5,
            Render: true,
            Pickable:false,
            Color: '#FF1744',
            Image:true
        })); 


    
}

function keyPressed(e){
    if(e.key == 'e' && toggleInventory == true)toggleInventory= false;
    else if(e.key == 'e' && toggleInventory == false)toggleInventory= true;
}

function draw() {
    background(220);    

    //if(toggleInventory == true)inventoryRenderer();

    translate(translation[0], translation[1]);
    render();
    if(toggleInventory == true)inventoryRenderer();

    collide();  // Register all the collisions

    if(keyIsDown(65))Players[0].move(-1, 0);
            
    if(keyIsDown(68))Players[0].move(1, 0);
    
    if(keyIsDown(32) && jump)Players[0].move(0, -1);

    //if(keyIsDown(70) && jump)Fpressed = true;
    
    if(keyIsDown(81)) {
        Items.push( new Box(0, 0, size, {
            isStatic: false,
            label:"0",
            friction: 0,
            restitution: 0,
            mass:5,
            Render: true,
            Pickable:false,
            Color: '#FF1744',
            Image:true
        })); 
    };

    //day: background(220);  night: background('#4e4e68');

    Engine.update(engine);
}
