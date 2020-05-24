
function GenerateTerrain(Xsize,startY, endY, stoneDepth,dimensions, watterArea, watterQuantity, watterDimensions){
    
    spawnPoint[0]= Math.trunc(map(random(), 0, 1, -Xsize, Xsize)) * dimensions;

    for(var i=-Xsize; i<Xsize; i++){
        
            var xpos = dimensions* i ;
            //var ypos= map(noise(i * 0.05), 0, 1, startY, endY);
            var ypos = Math.trunc(map(noise(i * 0.05), 0, 1, startY/dimensions, endY/dimensions)) * dimensions;
            if(xpos == spawnPoint[0]) spawnPoint[1] = ypos - 100;
            terrain[0].push(new Box(xpos, ypos, dimensions, {
                isStatic: true,
                label:"terrain[0]",
                Render: true,
                Pickable: false,
                Color: '#FFC107',
                image: false
            }));

           for(var j = 0; j < stoneDepth; j++){
            

            if(j < stoneDepth *2/3){
               if(random() > 0.7 && j== Math.trunc(stoneDepth* 2/3 - 1)) {
                //rellenar los huecos con piedra
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
    }

    for(var k=0; k<watterArea; k++){
        var xpos = random(-Xsize, Xsize)*dimensions;

        for(var j=0; j<watterQuantity; j++){
            //x, y, size^-1 (scale), bodyProperties
            terrain[3].push( new Box(xpos, startY/dimensions -dimensions, watterDimensions, {
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

