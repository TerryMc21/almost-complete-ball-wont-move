//Setup the canvas
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width-paddleWidth)/2;
var rightPressed = false;
var leftPressed = false;


//Set the starting point

var x = canvas.width/2;
var y = canvas.height-30;
var dx = 2
var dy = -2
var ballRadius = 10

//insert bricks
var brickRowCount =3;
var brickColumnCount =5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft =30;

var score=0;
var lives = 3;

var SCORE_SOUND = new Audio ('sounds/success.wav');
var GAMEOVER_SOUND = new Audio ('sounds/gameover.wav');

//hold bricks in 2deminsional array
var bricks = [];
for (c=0; c<brickColumnCount; c++) {
	bricks[c] = [];
	for(r=0; r<brickRowCount; r++){
		bricks[c][r] = {x: 0, y: 0, status: 1};
		
	}
}	
	




	//drawBricks
function drawBricks() {
	for(c=0; c<brickColumnCount; c++) {
		for(r=0; r<brickRowCount; r++) {
			if (bricks[c][r].status ==1) {	
				var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
				var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
				bricks[c][r].x = brickX;
				bricks[c][r].y = brickY;
				ctx.beginPath();
				ctx.rect(brickX, brickY, brickWidth, brickHeight);
				ctx.fillStyle = "#0095DD";
				ctx.fill();
				ctx.closePath();

			}
		}
	}
}

	//Draw the ball
function drawBall() {
	ctx.beginPath();
	ctx.arc(x, y,ballRadius, 0, Math.PI*2);
	ctx.fillstyle = "#0095DD";
	ctx.fill();
	ctx.closePath();
	
}	

	// draw paddle
function drawPaddle() {
	ctx.beginPath();
	ctx.rect(paddleX,canvas.height-paddleHeight,paddleWidth,paddleHeight);
	ctx.fillstyle = "#0095DD"
	ctx.fill();
	ctx.closePath();
	}
	// call draw
function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawBall();
	drawPaddle ();
	drawScore();
	drawLives();
	drawBricks ();
	collisionDetection();
	
	
	//should bounce off walls
	if(x + dx>canvas.width-ballRadius || x +dx < ballRadius) {
		dx = -dx;
		
	}
	if(y + dy < ballRadius){
		dy = -dy;
	}else if (y + dy > canvas.height-ballRadius) {
	//is ball hitting paddle no,yes
		if(x >paddleX && x < paddleX + paddleWidth) {
			dy = dy;
			
		}
		else { 
				lives--;
						if(!lives) {						
						GAMEOVER_SOUND.PLAY();
						alert("GAME OVER");
						document.location.reload();
						}
						else {
							x = canvas.width/2;
							y = canvas.height_30;
							dx = 2;
							dy = -2;
							paddleX = (canvas.width-paddleWidth)/2;
							
			
		}
	}	

	}
	
	if(rightPressed && paddleX < canvas.width-paddleWidth) {
		paddleX +=7;
	}
	else if(leftPressed && paddleX > 0){
		paddleX -= 7;
	}	
		x += dx;
		y +=dy;

	
	

}
document.addEventListener("keydown",keyDownHandler,false);
document.addEventListener("keyup",keyUpHandler,false);
document.addEventListener("mousemove", mouseMoveHandler,false);

function mouseMoveHandler(e) {
	var relativeX = e.clientX - canvas.offsetLeft;
	if(relativeX > 0 && relativeX < canvas.width){
		paddleX = relativeX - paddleWidth/2;
	}
}

function keyDownHandler(e){ 
	if(e.keyCode ==39) {
		rightPressed = true;
	}
    else if(e.keyCode ==37) {
        leftPressed = true;
	
	}
}

function keyUpHandler(e) {
	if(e.keyCode == 39) {
		rightPressed = false;
	}
	else if (e.keyCode == 37) {
		leftPressed = false;
	} 
}

function collisionDetection(){
	for(c=0; c<brickColumnCount; c ++) {
		for(r=0; r<brickRowCount;r++) {
			var b = bricks[c][r];
			if(b.status ==1) {
				if(x > b.x && x < b.x+brickWidth && y > b.y && y <b.y+brickHeight) {
				dy = dy;
				b.status = 0
				score++;
				SCORE_SOUND.play();
				if(score == brickRowCount*brickColumnCount) {
					WINNING_SOUND.play();
					alert("YOU WIN,CONGRATULATIONS!");
					document.location.reload();
					}	
				}		
			}
		}
	}
}
	
				
	
function drawScore() {
	ctx.font = "16px Arial";
	ctx.fillStyle = "#0095DD";
	ctx.fillText("Score: "+score, 8,20);
	document.getElementById("gamescore").innerHTML = "Score:" + score;
}

function drawLives() {
	ctx.font = "16px Arial";
	ctx.fillStyle = "#0095DD";
	ctx.fillText("Lives: "+lives, canvas.width-65, 20);
	document.getElementById("gamelives").innerHTML ="Lives:" + lives;
}	




setInterval(draw, 10);