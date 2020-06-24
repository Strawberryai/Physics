class Player{
    constructor(spawnPointX, spawnPointY, dimensions){
        
        //Set the SpawnPoint                    
        if(spawnPointX == undefined || spawnPointY == undefined) {
            spawnPoint[0]= spawnPointX = Math.trunc(map(noise(1), 0, 1, 0, Xsize)) * dimensions;
            spawnPoint[1] = spawnPointY = 100;
        }
        this.x = spawnPointX, this.y = spawnPointY;

        this.dimensions = dimensions;

        var playerProperties={
            isStatic: false,
            label:"playerBody",
            restitution: 0.1,
            friction:0,
            mass: 10,
            Life:PlayersMaxHealth,
            Color: ''
        }
        // '#69F0AE'

        var playerBody = Bodies.rectangle(this.x, this.y, this.dimensions, this.dimensions, playerProperties);

        this.player = playerBody;
        
        World.add(world, this.player);
        
        this.move = function(xdir, ydir){
            var pos= this.player.position;
            
            let forceX = (0.001 * this.player.mass) ;
            let forceY = (0.02 * this.player.mass) ;
            Body.applyForce(this.player,pos,{x: forceX * xdir,y:forceY * ydir});
            
        }

        this.showPlayers= function(index, object){

            var pos= this.player.position;
            var angle= this.player.angle;

            push();
            noStroke();
            fill(this.player.Color);
            rectMode(CENTER);
            translate(pos.x, pos.y);
            translation[0] = width/2 - pos.x;
            translation[1] = height/2 - pos.y;
            rotate(angle);
            rect(0, 0, this.dimensions, this.dimensions);
            pop();

            //check player health and change his color
            if(this.player.Life <= 0) gameOver = true;
            this.player.Color = lerpColor(color('#000'), color('#00ff75'), map(this.player.Life, 0, PlayersMaxHealth, 0, 1));
            //check what is out of the screen
            isOfScreen(index, object ,this.player, pos.x, pos.y);
        }

        this.collide = function(){
            var playerLabel= this.player.label;        
        
            Events.on(engine, 'collisionStart', function(event) {
                var pairs= event.pairs;
        
                    for(var i=0; i<pairs.length; i++){
                        var p=pairs[i];
                        //Check if this collision is reffered to Players
                            //Only jump = true if player is on terrain or on a box[]
                            if(p.bodyA.label == playerLabel && p.bodyB.jumpable) jump=true;
                            if(p.bodyB.label == playerLabel && p.bodyB.jumpable ) jump=true;
                        
                    }
            });
        
            Events.on(engine, 'collisionEnd', function(event) {
                var pairs= event.pairs;
                
                    for(var i=0; i<pairs.length; i++){
                        var p=pairs[i];
                        //Check if this collision is reffered to Players
                            //Only jump = false if player isnt on terrain or on a box[] anymore
                            if(p.bodyA.label == playerLabel && p.bodyB.jumpable) jump=false;
                            if(p.bodyB.label == playerLabel && p.bodyB.jumpable ) jump=false;
                            
                    }
            });
        
            //get items ===> items pickable
        
                for(var i=0; i< Items.length; i++){
                    if(Items[i].body.Pickable){
                        
                        this.playerX = this.player.position.x;
                        this.playerY = this.player.position.y;
                        this.objectY = Items[i].body.position.y;
                        this.objectX = Items[i].body.position.x;
        
                        if(Math.abs(this.playerX - this.objectX ) < size+1 && Math.abs(this.playerY - this.objectY) < size+1 && noRepeated.length < rowSlots * columSlots){
                            this.pickItem(i);
                        }
                    }
                    
                }
        
        }

        this.pickItem = function(index){
            unRender(Items[index].body);
            inventory.push(Items[index].body.label);
            Items.splice(index, 1);
        }

        this.throwItem = function(){
            if(itemSelected != undefined && inventory.indexOf(itemSelected) != -1){
                Items.push( new Box(map(Math.random(), 0, 1, this.player.position.x  - size * 5, this.player.position.x  + size * 5), this.player.position.y -size *2, size *2/3, {
                    isStatic: false,
                    label: itemSelected,
                    friction: 0,
                    restitution: 0,
                    mass:5,
                    Render: true,
                    Pickable:true,
                    Color: data[itemSelected].Color,
                    Image: data[itemSelected].Image
                })); 
        
                inventory.splice(inventory.indexOf(itemSelected), 1);
        
            }
        }
    }
}