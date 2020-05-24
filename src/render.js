function render(){

        //Instructions
        fill(20);
        noStroke();
        textFont(myFont);
        textSize(32);
        text('Controls', 10, 30);
        textSize(16);
        text('Dragg the mouse to create boxes', 15, 50);
        text('Space to jump / A to go left / D to go right / E to open your inventory', 15, 65);


        //text(inventory[i], 15 + 35 * i, 90);
        //objects

        for(i=0; i< Items.length; i++){
            Items[i].nearPlayer();
            Items[i].showBox(i, Items);
            
        }
        for(i=0; i< Players.length; i++){
            Players[i].showPlayers(i, Players);
        }
        for(i=0; i< terrain.length; i++){
            for(j=0; j< terrain[i].length; j++){
                    terrain[i][j].showBox(j, terrain[i]);
            }   

        }
    }


function isOfScreen(index, object, physics ,xpos, ypos){
    
    if(index!= null && ypos > height + 200){

            unRender(physics);
            //console.log( 'Removed',object[i]);
            object.splice(index, 1);
            
    }

    //Render for underground
    if(physics.label == "terrain[1]" || physics.label == "terrain[2]"){
        
        if( dist(Players[0].player.position.x, Players[0].player.position.y, xpos, ypos) > range) unRender(physics);
        if( dist(Players[0].player.position.x, Players[0].player.position.y, xpos, ypos) > width + 150) physics.Render = false;
        else if(dist(Players[0].player.position.x, Players[0].player.position.y, xpos, ypos) <= range && world.bodies.indexOf(physics) == -1) World.add(world, physics);
        else if(dist(Players[0].player.position.x, Players[0].player.position.y, xpos, ypos) < width + 100 && world.bodies.indexOf(physics) == -1) physics.Render = true;

    }else{
    

    //General Render
    if( dist(Players[0].player.position.x, Players[0].player.position.y, xpos, ypos) > width + 150) physics.Render = false, unRender(physics);

    //IN CASE THERE ARE SEVERAL OBJECTS SHOWED ON SCREEN
    else if(Items.length > 500 && dist(Players[0].player.position.x, Players[0].player.position.y, xpos, ypos) > width) physics.Render = false, unRender(physics);

    //The objects return to screen
    else if(dist(Players[0].player.position.x, Players[0].player.position.y, xpos, ypos) < width + 100 && world.bodies.indexOf(physics) == -1) physics.Render = true, World.add(world, physics);
    }
}

function unRender(physics){
        World.remove(world, physics);
}

function inventoryRenderer(){
                //Inventory ["box"]

                translate(-translation[0], -translation[1]);
                noStroke();
                fill(20);
                text('Inventory', 15, 90);

                for (var j=0; j< columSlots; j++){
                    for(var k=0; k< rowSlots; k++){
                        rectMode(CORNER);
                        noStroke();
                        fill(200);
                        rect(50 * k +15, 50*j +100, 40, 40);


                    }
                }

                noRepeated = inventory.filter( (value, index, self) => {
                    return self.indexOf(value) === index;
                });

                var countX=0;
                var countY=0;
                for(var i=0; i < noRepeated.length; i++){
                    var itemQuantity= inventory.filter( inventory => inventory == noRepeated[i]).length;

                            if(sprites[noRepeated[i]] != undefined){

                                image(sprites[noRepeated[i]], 50 * countX +15, 50*countY +100, 40, 40);
                                fill(20)
                                textSize(10);
                                text(itemQuantity, 50*countX + 35, 50*countY +140);

                            } else console.log("image not found");
                            
                            countX++;
                            if(countX >= rowSlots) countY++, countX= 0;
                 }



}