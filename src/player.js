class Player{
    constructor(x, y, dimensions){
        
        if(x == undefined || y == undefined) this.x = spawnPoint[0], this.y = spawnPoint[1];
        else this.x = x, this.y = y;

        this.dimensions = dimensions;

        var playerProperties={
            isStatic: false,
            label:"playerBody",
            restitution: 0.1,
            mass: 10,
            Pickable: false
        }

        var playerBody = Bodies.rectangle(this.x, this.y, this.dimensions, this.dimensions, playerProperties);

        this.player = Body.create({
            parts: [playerBody]
        });
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
            fill('#69F0AE');
            rectMode(CENTER);
            translate(pos.x, pos.y);
            translation[0] = width/2 - pos.x;
            translation[1] = height/2 - pos.y;
            rotate(angle);
            rect(0, 0, this.dimensions, this.dimensions);
            pop();

            isOfScreen(index, object ,this.player, pos.x, pos.y);
        }
        
    }
}