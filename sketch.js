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
var pickaxe1;
var sprites= [];


var size = 20;
var seed;
var translation = [];
var mousePosition =[];

var jump = false;
var toggleInventory = false;
var Fpressed = false;

var Items=[];
var itemSelected;
var itemLabel = [];
var terrain= [ eath =[], dirt = [], stone = [], watter=[], trees=[]];
var Players=[];
var PlayersMaxHealth =100;
var range =5 * size;   //blocks
var spawnPoint=[];

var inventory = [];
var noRepeated = [];
var rowSlots = 1;
var columSlots = 5;
var displayInventory = [];


function preload() {
   
    myFont = loadFont(Adress + 'fonts/Roboto-Regular.ttf');


    for(var i=0; i<= 2; i++){
        sprites[i]= loadImage(Adress + 'images/sprites' + `/${i}.png`);
    }
}

function setup() {
    engine= Engine.create();
    world= engine.world;

    //createCanvas(displayWidth, displayHeight);
    createCanvas(600, 600);
    colorMode(RGB);

    if(seed == undefined) date = new Date(), seed = date.getTime();

    GenerateTerrain( 100 ,height-300, height, 10, size);     //Xstart (blocks num), Ystart (pixels), Yend (pixels), stoneDepth (blocks),dimensions (pixels)
    Players.push(new Player(undefined, undefined, size));                       //x, y, dimensions; if corrdinates are not defined we set a random spawnPoint
    
    //Add a pickaxe
    Items.push( new Box(map (random(), 0, 1, spawnPoint[0]-100, spawnPoint[0]+100), spawnPoint[1] -100, size, {
        isStatic: false,
        label:"1",
        friction: 0,
        restitution: 0,
        mass:5,
        Render: true,
        Pickable:true,
        Color: '#FF1744',
        Image:true
    })); 

    Items.push( new Box(map (random(), 0, 1, spawnPoint[0]-100, spawnPoint[0]+100), spawnPoint[1] -100, size, {
        isStatic: false,
        label:"2",
        friction: 0,
        restitution: 0,
        mass:5,
        Render: true,
        Pickable:true,
        Color: '#FF1744',
        Image:true
    })); 


}

function mousePressed(){
    mousePosition[0]= mouseX;
    mousePosition[1]= mouseY;
}

function mouseDragged(){   
    //Players[0].throwItem();
    Players[0].player.parts[1].Life--;
}

function keyPressed(e){
    if(isNaN(e.key) == false && e.key != ' ' && e.key <= noRepeated.length) itemSelected = noRepeated[e.key -1];

    if(e.key == 'e' && toggleInventory == true)toggleInventory= false;
    else if(e.key == 'e' && toggleInventory == false)toggleInventory= true;
}

function draw() {
    background(220);    
    Players[0].collide();  // Register all the collisions with player 0

    if(keyIsDown(65))Players[0].move(-1, 0);
            
    if(keyIsDown(68))Players[0].move(1, 0);
    
    if(keyIsDown(32) && jump)Players[0].move(0, -1);
    
    if(keyIsDown(81)) Players[0].throwItem();

    translate(translation[0], translation[1]);
    render();
    if(toggleInventory == true)inventoryRenderer();
    
    Engine.update(engine);
}
