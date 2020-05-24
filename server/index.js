const express = require('express');
const cors = require('cors');
const app = new express();

app.use(cors());
app.use('/sprites', express.static(__dirname + '/images/sprites'));
app.use('/fonts', express.static(__dirname + '/fonts'));

app.listen( 3000 ,  () => {
    console.log("Image_server listening on port 3000");
});