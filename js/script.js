var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var particleList = {};//To hold all the particles in a hash like datastructure
var useHexSet = true;//Use the below hex set for colors of particles
var particleHexSet = ["#3498db","#2ecc71"]
var amountOfParticles = window.innerHeight;//Amount of particles on the screen
var fps = 10;//Fps, careful, too high and you get glitching, too low jumping
var xSpeed = .2;
var ySpeed = .2;
var particleSize = 4;//Size of the particles
var raf;//reference to ongoing animation

initializeVariables();
draw();//Initial draw call

//Initialize variables, put in this function for ease of use
function initializeVariables(){
	canvas.width = document.getElementsByTagName('body')[0].offsetWidth;
	canvas.height = document.getElementsByTagName('body')[0].offsetHeight;
	for(var x = 0;x<amountOfParticles;x++){
		particleList[x] = makeParticle(x);
	}
	fps = 1000/fps;
}
function makeParticle(particleNumber){//Make a single particle
	var chosenColor = null;
	//Choose a random place that is within the current window
	var xOffset = Math.floor(Math.random() * Math.floor(window.innerWidth))
	var yOffset = Math.floor(Math.random() * Math.floor(window.innerHeight))
	var randNeg1 = Math.floor(Math.random() * Math.floor(2));
	var randNeg2 = Math.floor(Math.random() * Math.floor(2));
	//choosing random direction that the particle goes
	if(randNeg1 == 0){
		randNeg1 = -1;
	}
	if(randNeg2 == 0){
		randNeg2 = -1;
	}
	if(useHexSet){
		var chosenColor = getHexFromSet();
	}else{	
		var chosenColor = getRandomHex();
	}
	var particle = {
		number: particleNumber,
	  	x: xOffset,
	  	y: yOffset,
	  	vx: xSpeed * randNeg1,
	  	vy: ySpeed * randNeg2,
	  	size: particleSize,
	  	color: chosenColor,
	  	draw: function() {//actual drawing of the particle
		    ctx.fillStyle = this.color;
		    ctx.fillRect(this.x,this.y,this.size,this.size);
		}
	}
	return particle;
}

function draw() {
  setTimeout(function(){
	ctx.clearRect(0,0, canvas.width, canvas.height);
	  var length = Object.keys(particleList).length;
	  for(var x = 0;x<length;x++){
	  	particleList[x].x += particleList[x].vx;//change the positioning based on speed
	  	particleList[x].y += particleList[x].vy;
	  	particleList[x].draw();//Draw it on canvas
	  }
	  raf = window.requestAnimationFrame(draw);//request a canvas update, calls draw function after
	},fps);
}

function getRandomHex(){
	var string = "#";
	var possibleValues = [0,1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f'];
	for(var x = 0;x<6;x++){
		string += possibleValues[Math.floor(Math.random() * Math.floor(possibleValues.length))];
	}
	return string;
}

function getHexFromSet(){
	var string = particleHexSet[Math.floor(Math.random() * Math.floor(particleHexSet.length))];
	return string;
}