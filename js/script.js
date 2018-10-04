var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var ballList = {};
var amountOfBalls = 1000;
for(var x = 0;x<amountOfBalls;x++){
	ballList[x] = makeBall(x);
}
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var raf;
function makeBall(ballNumber){
	var width = Math.floor(Math.random() * Math.floor(window.innerWidth))
	var height = Math.floor(Math.random() * Math.floor(window.innerHeight))
	var randNeg1 = Math.floor(Math.random() * Math.floor(2));
	var randNeg2 = Math.floor(Math.random() * Math.floor(2));
	if(randNeg1 == 0){
		randNeg1 = -1;
	}
	if(randNeg2 == 0){
		randNeg2 = -1;
	}
	/*if(window.innerWidth/2 <= width){
		width = width - window.innerWidth;
	}else{
		width = width + window.innerWidth;
	}
	if(window.innerHeight/2 <= height){
		height = height - window.innerHeight ;
	}else{
		height = height + window.innerHeight ;
	}*/
	var ball = {
		number: ballNumber,
	  	x: width,
	  	y: height,
	  	vx: 1.5 * randNeg1,
	  	vy: 1.5 * randNeg2,
	  	size: 2,
	  	color: getRandomHex(),
	  	draw: function() {
		    ctx.fillStyle = this.color;
		    ctx.fillRect(this.x,this.y,this.size,this.size);
		}
	}
	return ball;
}

function draw() {
  setTimeout(function(){
	ctx.clearRect(0,0, canvas.width, canvas.height);
	  var length = Object.keys(ballList).length;
	  for(var x = 0;x<length;x++){
	  	ballList[x].draw();
	  	ballList[x].x += ballList[x].vx;
	  	ballList[x].y += ballList[x].vy;
	  }
	  raf = window.requestAnimationFrame(draw);
	},16);
}
function getRandomHex(){
	var string = "#";
	var possibleValues = [0,1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f'];
	for(var x = 0;x<6;x++){
		string += possibleValues[Math.floor(Math.random() * Math.floor(possibleValues.length))];
	}
	return string;
}
draw();