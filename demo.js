// create a population and update it regularly for ever.
//------------------------------------------------------------------------------
"use strict";

function demo(){
	var box = new Box(20,20);
	box.addBacterium(new Bacterium(1, [[10,10]]));
	var demo = setInterval(function(){box.update();}, 1000);
}
