
function GenerateTerrain(Xsize,startY, endY, stoneDepth,dimensions){
    noiseSeed(seed);

    for(var i=0; i<Xsize; i++){
            var xpos = dimensions* i ;
            var ypos = Math.trunc(map(noise(i*0.05), 0, 1, startY/dimensions, endY/dimensions)) * dimensions;

            //Set the SpawnPoint
            spawnPoint[0]= Math.trunc(map(noise(1), 0, 1, 0, Xsize)) * dimensions;
            if(xpos == spawnPoint[0]) spawnPoint[1] = ypos - 100;
           
            //Generate Grass
            terrain[0].push(new Box(xpos, ypos, dimensions, {
                isStatic: true,
                label:"terrain[0]",
                Render: true,
                Pickable: false,
                Color: '#FFC107',
                image: false
            }));

           for(var j = 0; j < stoneDepth; j++){

            if(j < stoneDepth *1/3){
               if(random() > 0.7 && j== Math.trunc(stoneDepth* 1/3 - 1)) {
                //Fill the gaps with stone
                var myrandom = Math.trunc(map(noise(i * 0.05), 0, 1, 2, 3));

                for(var k = 0; k< myrandom; k++){
                terrain[2].push(new Box(xpos, (j + k) *(dimensions) + ypos + dimensions, dimensions, {
                    isStatic: true,
                    label:"terrain[2]",
                    Render: true,
                    Pickable: false,
                    Color: 'gray',
                    image: false
                }));}

                j += myrandom;
        }

                terrain[1].push(new Box(xpos, j *(dimensions) + ypos + dimensions, dimensions, {
                    isStatic: true,
                    label:"terrain[1]",
                    Render: true,
                    Pickable: false,
                    Color: '#FF8F00',
                    image: false
                }));
            }else{

                terrain[2].push(new Box(xpos, j *(dimensions) + ypos + dimensions, dimensions, {
                    isStatic: true,
                    label:"terrain[2]",
                    Render: true,
                    Pickable: false,
                    Color: 'gray',
                    image: false
                }));
            }
            
            
            }
        
            
    
        //Generate Trees
        if ( noise(i) > 0.7)terrain[4].push(new Tree (xpos, ypos, size, 5*size));

        //Generate Water
        if(noise(i*0.5) > 0.75){

            for(var j=0; j<Math.trunc(noise(i *10) * 10) * 2; j++){

                terrain[3].push( new Box(xpos + j*0.01, ypos - dimensions , dimensions, {
                    isStatic: false,
                    label:"terrain[3]",
                    friction: 0,
                    restitution: 0,
                    mass:0.001,
                    Render: true,
                    Pickable: false,
                    Color: '#26C6DA',
                    Image: false
                })); 
            }
        }
    }



}

