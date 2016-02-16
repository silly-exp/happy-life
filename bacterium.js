// TODO:
// - choose the color of bacterium depending upon the color of the parent in order
// to see the relationship between bacteria.

// CURRENT:
//

// FIXMEs:
// -

// name: an id string for this individual
// body: an array of contiguous pixel in the box
// box: a reference to the containing box
//------------------------------------------------------------------------------
"use strict";

var Bacterium = function(name, body, box){
	this.MAX_AGE = 10;
	this.MAX_SIZE = 5;

	this.name = name;
	this.body = body;
	this.box = box;

	this.age = 0;
	this.status = "ALIVE";
	this.childCount = 0;

	this.color = getRandomColor();

}

// Dump the baterium state to the console.
//------------------------------------------------------------------------------
Bacterium.prototype.obs = function(){
	console.log("id:" + this.name + " age:" + this.age + " size:" + this.body.length + " status:" + this.status);
}

//FIXME couper le corps de la bactérie en 2
//------------------------------------------------------------------------------
Bacterium.prototype.division = function(){
	this.childCount++;
	var childName = this.name + "-" + this.childCount;
	var cutIndex = Math.floor(this.body.length/2);
	this.box.population.push(new Bacterium(childName, this.body.slice(cutIndex), this.box));
	this.body = this.body.slice(0,cutIndex);
}

// Control the bacterium growth
//------------------------------------------------------------------------------
Bacterium.prototype.grow = function(){
	if (this.body.length >= this.MAX_SIZE){
		this.division();
		return;
	}

	// search for an empty cell near the head or the tail.
	// FIXME: there should be a mean to write a more simple code.
	var dir = [[-1,0],[0,1],[1,0],[0,-1]];
	for (var end=0; end<=1; end++){
		for (var d=0; d<4; d++){
			var x = this.body[end * (this.body.length-1)][0] + dir[d][0];
			var y = this.body[end * (this.body.length-1)][1] + dir[d][1];
			if (x<0 || x>=this.box.width || y<0 || y>=this.box.height || this.box.matrix[x][y] != 0){
				continue;
			}
			if (end==0){
				this.body.unshift([x,y]);
			}else{
				this.body.push([x,y]);
			}
			this.box.matrix[x][y] = 1;
			return
		}
	}
	// if there is no room, just don't grow
}

//------------------------------------------------------------------------------
Bacterium.prototype.update = function(){
	if (this.status == "DEAD"){
		return "DEAD";
	}
	if (this.age == this.MAX_AGE){
		this.status="DEAD";
		return "DEAD";
	}
	this.grow();
	this.age++;
}

function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
