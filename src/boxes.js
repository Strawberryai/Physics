class Box{
    constructor(x, y, dimensions, bodyProperties){
        
        this.dimensions = dimensions;
        this.bodyProperties= bodyProperties;
        //take the image
        this.image = sprites[this.bodyProperties.label];
        
        this.body = Bodies.rectangle(x, y, this.dimensions, this.dimensions, this.bodyProperties);
        World.add(world, this.body);
        

        this.showBox= function(index, object){
            var pos= this.body.position;
            var angle= this.body.angle;

            if(this.body.Render == true){
            push();
            noStroke();
            fill(this.bodyProperties.Color);
            rectMode(CENTER);
            imageMode(CENTER);
            translate(pos.x, pos.y);
            rotate(angle);
            if(this.bodyProperties.Image) image(this.image, 0, 0, this.dimensions, this.dimensions);
            else rect(0, 0, this.dimensions, this.dimensions);
            pop();
            }

            isOfScreen(index, object ,this.body, pos.x, pos.y);

        }

        this.nearPlayer= function(){
            var pos= this.body.position;
            var Ppos = Players[0].player.position;
            var xdir = Ppos.x - pos.x;
            var ydir = Ppos.y - pos.y;
            var moduledir = (Math.sqrt (Math.pow (xdir, 2) + Math.pow(ydir,2 )));

            if(moduledir< 6*size){
                let forceX = (0.0001 * this.body.mass) ;
                let forceY = (0.003 * this.body.mass) ;

                Body.applyForce(this.body,pos ,{x: forceX * xdir/moduledir, y:forceY * ydir/moduledir});

            }
        }
        
    }
}