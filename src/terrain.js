
function GenerateTerrain(Xsize,startY, endY, stoneDepth,dimensions){
    noiseSeed(seed);
    for(var i= 0; i<Xsize; i++){
            var xpos = dimensions* i ;
            var ypos = Math.trunc(map(noise(i*0.05), 0, 1, startY/dimensions, endY/dimensions)) * dimensions;

            //Generate Grass
            terrain[0].push(new Box(xpos, ypos, dimensions, data[1]));

           for(var j = 0; j < stoneDepth; j++){

            if(j < stoneDepth *1/3){
               if(random() > 0.7 && j== Math.trunc(stoneDepth* 1/3 - 1)) {
                //Fill the gaps with stone
                var myrandom = Math.trunc(map(noise(i * 0.05), 0, 1, 2, 3));

                for(var k = 0; k< myrandom; k++){
                terrain[2].push(new Box(xpos, (j + k) *(dimensions) + ypos + dimensions, dimensions, data[3]));}

                j += myrandom;
        }

                terrain[1].push(new Box(xpos, j *(dimensions) + ypos + dimensions, dimensions, data[2]));
            }else{

                terrain[2].push(new Box(xpos, j *(dimensions) + ypos + dimensions, dimensions, data[3]));
            }
            
            
            }
        
            
    
        //Generate Trees
        if ( noise(i) > 0.7)terrain[4].push(new Tree (xpos, ypos, size, Math.trunc(map(noise(i *100), 0, 1, 3, 8))*size));

        //Generate Water
        if(noise(i*0.5) > 0.75){

            for(var j=0; j<Math.trunc(noise(i *10) * 10) * 2; j++){

                terrain[3].push( new Box(xpos + j*0.01, ypos - dimensions , dimensions,  data[4])); 
            }
        }
    }



}

