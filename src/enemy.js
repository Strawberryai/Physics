class Enemy{
    constructor(x, y, dimensions){
        
        this.x = x;
        this.y = y;
        this.dimensions = dimensions;

        var enemyProperties={
            isStatic: false,
            label:"enemyBody",
            restitution: 0.1,
            mass: 10,
            Life:PlayersMaxHealth,
            Color: 'red'
        }
        // '#69F0AE'

        var enemyBody = Bodies.rectangle(this.x, this.y, this.dimensions, this.dimensions, enemyProperties);

        this.enemy = Body.create({
            parts: [enemyBody]
        });
        
        World.add(world, this.enemy);
        
        this.move = function(xdir, ydir){
            var pos= this.enemy.position;
            
            let forceX = (0.001 * this.enemy.mass) ;
            let forceY = (0.02 * this.enemy.mass) ;
            Body.applyForce(this.enemy,pos,{x: forceX * xdir,y:forceY * ydir});
            
        }

        this.showEnemies= function(index, object){

            var pos= this.enemy.position;
            var angle= this.enemy.angle;

            push();
            noStroke();
            fill(this.enemy.parts[1].Color);
            rectMode(CENTER);
            translate(pos.x, pos.y);
            rotate(angle);
            rect(0, 0, this.dimensions, this.dimensions);
            pop();
        }

        this.collide = function(){
            /*var playerLabel= this.player.parts[1].label;
            var terrainLabel = terrain[0][0].body.label;
        
        
            Events.on(engine, 'collisionStart', function(event) {
                var pairs= event.pairs;
        
                    for(var i=0; i<pairs.length; i++){
                        var p=pairs[i];
                        //Check if this collision is reffered to Players
                            //Only jump = true if player is on terrain or on a box[]
                            if(p.bodyA.label == playerLabel)if(p.bodyB.label == terrainLabel || itemLabel.indexOf(p.bodyB.label) != -1) jump=true;
                            if(p.bodyB.label == playerLabel)if(p.bodyA.label == terrainLabel || itemLabel.indexOf(p.bodyA.label) != -1) jump=true;
                        
                    }
            });
        
            Events.on(engine, 'collisionEnd', function(event) {
                var pairs= event.pairs;
                
                    for(var i=0; i<pairs.length; i++){
                        var p=pairs[i];
                        //Check if this collision is reffered to Players
                            //Only jump = false if player isnt on terrain or on a box[] anymore
                            if(p.bodyA.label == playerLabel)if(p.bodyB.label == terrainLabel || itemLabel.indexOf(p.bodyB.label) != -1) jump=false;
                            if(p.bodyB.label == playerLabel)if(p.bodyA.label == terrainLabel || itemLabel.indexOf(p.bodyA.label) != -1) jump=false;
                            
                    }
            });*/
        }

    }
}