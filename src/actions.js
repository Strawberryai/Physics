function mine(vel, type){
    this.x = mouseX; this.y = mouseY;
    blockSelector();

    //Shovel for grass and dirt (type A)
    for(i=0; i< 2; i++){
        for(var j=0; j< terrain[i].length; j++){
            if(terrain[i][j].body.position.x == blockCoordinates[0] && terrain[i][j].body.position.y == blockCoordinates[1]){
                terrain[i][j].body.Render = false ,unRender(terrain[i][j].body), terrain[i].splice(terrain[i].indexOf(terrain[i][j]), 1);
                Items.push( new Box(blockCoordinates[0], blockCoordinates[1], size*2/3, data.blocks[terrain[i][0].body.label])), 
                Items[Items.length -1].body.Pickable = true, Items[Items.length -1].body.isStatic = false;
            }
        }
    }
    //Pickaxe for stone (type B)
    /*for(i=0; i< terrain[1].length; i++){
        if(terrain[1][i].body.position.x == blockCoordinates[0] && terrain[1][i].body.position.y == blockCoordinates[1]) terrain[1][i].body.Render = false ,unRender(terrain[1][i].body), terrain[1].splice(terrain[1].indexOf(terrain[1][i]), 1);
    }*/
    //unRender(selectedBlock);
}