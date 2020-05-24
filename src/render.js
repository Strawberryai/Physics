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

                for (var j=0; j< rowSlots; j++){
                    for(var k=0; k< columSlots; k++){
                        rectMode(CORNER);
                        

                        //This is so BADDDDDDDD
                        //SHITTI CODEEEEEEEEEEEEEEEEEEEE
                        //This is wrong I know but is temporary
                        //This only works with 5 colums and 3 rows
                        //we have to find the metod to fit the mouse position with the squares
                        
                        if(15 < mousePosition[0] && mousePosition[0] < 50 * columSlots + 15 && 100 < mousePosition[1] && mousePosition[1] < 50 * rowSlots + 100){
                            mouseXpos= Math.trunc(map(mousePosition[0]/columSlots, 3, 50, 0, columSlots));
                            mouseYpos = Math.trunc(map(mousePosition[1]/rowSlots, 30, 80, 0, rowSlots));

                            if(k == mouseXpos && j == mouseYpos) fill('#0099b3');
                            else fill(200);
                        }
                        else fill(200);
                        noStroke();
                        

                        text(k * 50 +15, 50 * k +15, 50*j +100);
                        rect(50 * k +15, 50*j +100, 40, 40);


                    }
                }

                noRepeated = inventory.filter( (value, index, self) => {
                    return self.indexOf(value) === index;
                });

                var countX=0;
                var countY=0;

                //We have to put a maximun inventeroy length
                //I mean, you can pick infinite items now

                for(var i=0; i < noRepeated.length; i++){
                    var itemQuantity= inventory.filter( inventory => inventory == noRepeated[i]).length;

                            if(sprites[noRepeated[i]] != undefined){

                                image(sprites[noRepeated[i]], 50 * countX +15, 50*countY +100, 40, 40);
                                fill(20)
                                textSize(10);
                                text(itemQuantity, 50*countX + 35, 50*countY +140);

                            } else console.log("image not found");
                            
                            //This is wrong I know but is temporary
                            //This only works with 5 colums and 3 rows
                            //we have to find the metod to fit the mouse position with the squares

                            if(15 < mousePosition[0] && mousePosition[0] < 50 * columSlots + 15 && 100 < mousePosition[1] && mousePosition[1] < 50 * rowSlots + 100){
                                mouseXpos= Math.trunc(map(mousePosition[0]/columSlots, 3, 50, 0, columSlots));
                                mouseYpos = Math.trunc(map(mousePosition[1]/rowSlots, 30, 80, 0, rowSlots));
    
                                if(countX == mouseXpos && countY == mouseYpos) itemSelected = noRepeated[i];
                            }

                            countX++;
                            if(countX >= rowSlots && countX) countY++, countX= 0;
                 }



}