"use strict";

// Box Class constructor
//------------------------------------------------------------------------------
var Box = function(width, height){
  this.width = width;
  this.height = height;

  // initialization of the box space with some '0'.
  this.matrix = new Array(this.width);
  for (var i=0; i<this.width; i++){
    this.matrix[i] = new Array();
    for (var j=0; j<this.height; j++){
      this.matrix[i].push(0);
    }
  }

  this.population = [];
}// Box class constructor

// update all bacteria
//------------------------------------------------------------------------------
Box.prototype.update = function(){
	console.log("updateBox");
	for (var b=0; b<this.population.length; b++){
    var bac = this.population[b];
		bac.update();
		bac.obs();
		if (bac.status == "DEAD"){
      // freeing the space of the dead bacterium
      var body = bac.body;
      for (var i=0; i<body.length; i++){
        this.matrix[body[i][0]][body[i][1]] = 0;
      }

			this.population.splice(b,1);
		}
	}
  console.log("Population: " + this.population.length);
  this.draw();
}

// Update the box image
// FIXME: fix the pixel size management
// FIXME: how to manage the bacterium color? in the bacterium? not its problem?
//------------------------------------------------------------------------------
Box.prototype.draw = function(){
  var canvas = document.getElementById("box_canvas");
  var ctx = canvas.getContext("2d");
  var pxSize = 20;
  ctx.fillStyle = "black";
  ctx.fillRect(0,0,400,400);
  for (var b=0; b<this.population.length; b++){
    var bac = this.population[b];
    ctx.fillStyle = bac.color;
    var body = bac.body;
    for (var i=0; i<body.length; i++){
      ctx.fillRect (body[i][0] * pxSize, body[i][1] * pxSize, pxSize, pxSize);
    }
  }
}

// Add a bacterium in the box.
// TODO: One should tests if there is place for this bacterium in the box.
//------------------------------------------------------------------------------
Box.prototype.addBacterium = function(bac){
  // add bacterium in the box population
  bac.box = this;
  this.population.push(bac);

  // note the bacterium's location in the box matrix
  var body = bac.body;
  for (var i=0; i<body.length; i++){
    this.matrix[body[i][0]][body[i][1]] = 1;
  }
}
