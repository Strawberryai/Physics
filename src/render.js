function render(){
        //Grid
        if(grid){
            push();
            strokeWeight(0.5);
            stroke("#fff");
            var l=size/2;
            while (l < Xsize * size) {
            line(-size/2, l, Xsize * size, l);
            line(l, -size/2, l, Xsize  * size);
            l += size;
            }
            pop();
        }

        //Instructions
        fill(20);
        noStroke();
        textFont(myFont);
        textSize(32);
        text('Controls', 10, 30);
        textSize(16);
        text('Q to throw items', 15, 50);
        text('Space to jump / A to go left / D to go right / E to open your inventory', 15, 65);


        //text(inventory[i], 15 + 35 * i, 90);

        //Items
        for(i=0; i< Items.length; i++){
            Items[i].nearPlayer();
            Items[i].showBox(i, Items);
            
        }

        //Players
        for(i=0; i< Players.length; i++){
            Players[i].showPlayers(i, Players);
        }

        //terrain
        for(i=0; i< terrain.length; i++){
            for(j=0; j< terrain[i].length; j++){
                    if(i == 0) terrain[0][j].showTree();         //Trees
                    else terrain[i][j].showBox(j, terrain[i]);   //Blocks
                    
            } 
        }

        //BlockSelector
        blockSelector();
        push();
        noFill();
        strokeWeight(3);
        rectMode(CENTER);
        stroke("#ffc100");
        rect(blockCoordinates[0], blockCoordinates[1], size, size);
        pop();
    }


function isOfScreen(index, object, physics ,xpos, ypos){
    
    if(index!= null && ypos > renderDepht){

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

    //render player life
    
}

function unRender(physics){
        World.remove(world, physics);
}

function inventoryRenderer(){
                //Inventory ["box"]
                
                translate(-translation[0], -translation[1]);
                imageMode(CENTER);
                rectMode(CENTER);
                //textMode(CENTER);
                noStroke();
                fill(20);
                text('Inventory', 45, 75);

                for (var j=0; j< rowSlots; j++){
                    for(var k=0; k< columSlots; k++){
                        fill(200);
                        noStroke();
                        rect(50 * k +65, 50*j +100, 40, 40);

                    }
                }

                noRepeated = inventory.filter( (value, index, self) => {
                    return self.indexOf(value) === index;
                });

                var countX=0;
                var countY=0;

                for(var i=0; i < noRepeated.length; i++){
                    var itemQuantity= inventory.filter( inventory => inventory == noRepeated[i]).length;
                    
                            //This is wrong I know but is temporary
                            //This only works with 5 colums and 3 rows
                            //we have to find the metod to fit the mouse position with the squares

                            if(15 < mouseX && mouseX < 50 * columSlots + 15 && 100 < mouseY && mouseY < 50 * rowSlots + 100){
                                mouseXpos= Math.trunc(map(mouseX/columSlots, 3, 50, 0, columSlots));
                                mouseYpos = Math.trunc(map(mouseY/rowSlots, 30, 80, 0, rowSlots));
                                
                                if(countX == mouseXpos && countY == mouseYpos) itemSelected = noRepeated[i];
                            }

                            if(itemSelected == noRepeated[i])noFill(), stroke('#ffc100'), strokeWeight(3), rect(50 * countX +65, 50*countY +100, 40, 40);

                            noStroke();
                            if(data[noRepeated[i]].Image) {
                                if(sprites[noRepeated[i]] != undefined) image(sprites[noRepeated[i]], 50 * countX +65, 50*countY +100, 30, 30);
                                else image(sprites[0], 50 * countX +65, 50*countY +100, 30, 30);
                            }else {
                                fill(data[noRepeated[i]].Color);
                                rect(50 * countX +65, 50*countY +100, 30, 30);
                            }
                            fill(20);
                            textSize(10);
                            text(itemQuantity, 50*countX + 65, 50*countY +120);

                            
                            
 

                            countX++;
                            if(countX >= columSlots && countX) countY++, countX= 0;
                 }
                //Life bar
                rectMode(CORNER);
                noStroke();
                fill(Players[0].player.Color);
                rect(45, 50 * rowSlots + 80, map(Players[0].player.Life, 0, PlayersMaxHealth, 0,  40 * (columSlots + 1)), 20);
                noFill();
                stroke(0);
                strokeWeight(1);
                rect(45, 50 * rowSlots + 80, 40 * (columSlots + 1), 20);
                noStroke();
                fill(0);
                textSize(16);
                text(`${Players[0].player.Life} / ${PlayersMaxHealth}`, 50, 50 * rowSlots + 95);
                

}

function blockSelector(){
    blockCoordinates[0] = (Math.round((mouseX- translation[0] + size/4) / size) * size ) ;
    blockCoordinates[1] = (Math.round((mouseY- translation[1] + size/4) / size) * size) ;
}

function GameOver(){
    //Instructions
    fill(20);
    noStroke();
    textFont(myFont);
    textSize(32);
    text('Game Over', 10, 30);
    textSize(16);
    text('Reload the page to continue', 15, 50);
}