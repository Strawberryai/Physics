function collide(){

    var playerLabel= Players[0].player.parts[1].label;
    var terrainLabel = terrain[0][0].body.label;
    var itemLabel;
    if(Items.length != 0) itemLabel = Items[0].body.label;

    Events.on(engine, 'collisionStart', function(event) {
        var pairs= event.pairs;

            for(var i=0; i<pairs.length; i++){
                var p=pairs[i];
                //Check if this collision is reffered to Players
                    //Only jump = true if player is on terrain or on a box[]
                    if(p.bodyA.label == playerLabel)if(p.bodyB.label == terrainLabel || p.bodyB.label == itemLabel) jump=true;
                    if(p.bodyB.label == playerLabel)if(p.bodyA.label == terrainLabel || p.bodyA.label == itemLabel) jump=true;
                
            }
    });

    Events.on(engine, 'collisionEnd', function(event) {
        var pairs= event.pairs;
        
            for(var i=0; i<pairs.length; i++){
                var p=pairs[i];
                //Check if this collision is reffered to Players
                    //Only jump = false if player isnt on terrain or on a box[] anymore
                    if(p.bodyA.label == playerLabel)if(p.bodyB.label == terrainLabel || p.bodyB.label == itemLabel) jump=false;
                    if(p.bodyB.label == playerLabel)if(p.bodyA.label == terrainLabel || p.bodyA.label == itemLabel) jump=false;
                    
            }
    });

    //get items ===> items pickable

        for(i=0; i< Items.length; i++){
            if(Items[i].body.Pickable){
                
                this.playerX = Players[0].player.parts[1].position.x;
                this.playerY = Players[0].player.parts[1].position.y;
                this.objectY = Items[i].body.position.y;
                this.objectX = Items[i].body.position.x;

                if(Math.abs(this.playerX - this.objectX ) < size+1 && Math.abs(this.playerY - this.objectY) < size+1 && noRepeated.length < rowSlots * columSlots){
                    unRender(Items[i].body);
                    inventory.push(Items[i].body.label);
                    
                    Items.splice(i, 1);
                }
            }
            
        }

}
