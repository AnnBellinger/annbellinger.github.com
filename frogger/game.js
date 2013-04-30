var frog; 
var frogx = 181;
var frogy = 480;
var logs = new Array();
var cars = new Array();
var collision = new Array();
var time = 0;
var level = 1;
var life = 3;
var score = 0;
var highscore = 0;
var ctx;
var frogsprite = new Image();
var game;
var lillypads = 0;
var log_col = new Array();
var turtles = new Array();
var timer;
var fly_time = 0; 
frogsprite.src = "assets/frogger_sprites.png";

function start_game()
{
	ctx = document.getElementById("game").getContext('2d');
	onload = display();
	onload = play();
	sendscores();
}

function play()
{	
	setObjs();
	game = setInterval(function () {draw()}, 40);
	timer = setInterval(function () {time_set()}, 1000);
}

function setObjs()
{
	logs[0] = 400;
	logs[1] = 100;
	logs[2] = 350;
	logs[3] = 50;
	logs[4] = 250;
	logs[5] = 0;
	cars[0] = 350;
	cars[1] = 250;
	cars[2] = 150;
	cars[3] = -50;
	cars[4] = 50;
	cars[5] = 150;
	cars[6] = 400;
	cars[7] = 300;
	cars[8] = 200;
	cars[9] = 25;
	cars[10] = 125;
	cars[11] = 225;
	cars[12] = 400;
	cars[13] = 250;
	for(i=0;i<23;i++)
	{
		collision[i] = new Object();
	}
	for(j=0; j<14; j++)
	{
		log_col[j] = new Object();
	}
	collision[14] = {left:0, right:10, top:45, bottom:90};
	collision[15] = {left:45, right:95, top:45, bottom:90};
	collision[16] = {left:130, right:180, top:45, bottom:90};
	collision[17] = {left:215, right:260, top:45, bottom:90};
	collision[18] = {left:310, right:345, top:45, bottom:90};
	frog = new Array();
	turtles[0] = new Object();
	turtles[0] = {0:0, 1: 170, 2: 340, 3: 510};
	turtles[1] = new Object();
	turtles[1] = {0:-70, 1: 100, 2: 270, 3: 440}; 
}

function draw()
{
	display();
	logone();
	logtwo();
	logthree();
	carone();
	cartwo();
	carthree();
	carfour();
	carfive();
	turtle();
	keyed();
	lives();
	frogs();
	what_score();
	what_level();
	set_time();
	fly();
}

function keyed()
{
	document.onkeydown = checkKey;
	function checkKey(e){
		if(event.which == 37)
		{
			if(frogx > 13)
			{
				frogx = frogx - 28;
			}
		}
		else if(event.which == 38)
		{
			frogy = frogy - 35;
			score = score + 10;
		}
		else if(event.which == 39)
		{
			if(frogx < 349)
			{
				frogx = frogx + 28;
			}
		}
		else if(event.which == 40)
		{
			if(frogy < 480)
			{
				frogy = frogy + 35;
			}
		}
	}
}

function display()
{
	ctx.fillStyle = '#000000';
	ctx.fillRect(0, 300, 399, 250);
	ctx.fillStyle = '#191970';
	ctx.fillRect(0, 0, 399, 300);
	ctx.drawImage(frogsprite, 0, 46, 399, 70, 0, 38, 399, 70);
	ctx.drawImage(frogsprite, 0, 2, 350, 45, 20, 0, 350, 45);
	ctx.drawImage(frogsprite, 0, 110, 399, 50, 0, 265, 399, 50);
	ctx.drawImage(frogsprite, 0, 110, 399, 50, 0, 475, 399, 50);
}

function logone()
{
	if(logs[0] > 400)
	{
		logs[0] = -150;	
	}
	if(logs[1] > 400)
	{
		logs[1] = -150;
	}
	ctx.drawImage(frogsprite, 0, 230, 100, 25, logs[1], 210, 90, 25);
	ctx.drawImage(frogsprite, 0, 230, 100, 25, logs[0], 210, 90, 25);
	logs[0] = logs[0] + 2.5;
	logs[1] = logs[1] + 2.5;
	log_col[0] = {ycord:200, left: logs[0], right: logs[0]+60, speed:2.5};
	log_col[1] = {ycord:200, left: logs[1], right: logs[1]+60, speed:2.5};
}

function logtwo()
{
	if(logs[2] > 400)
	{
		logs[2] = -250;	
	}
	if(logs[3] > 400)
	{
		logs[3] = -250;
	}
	ctx.drawImage(frogsprite, 0, 165, 200, 25, logs[3], 170, 180, 25);
	ctx.drawImage(frogsprite, 0, 165, 200, 25, logs[2], 170, 180, 25);
	logs[2] = logs[2] + 2;
	logs[3] = logs[3] + 2;
	log_col[2] = {ycord:165, left: logs[2], right: logs[2]+160, speed:2};
	log_col[3] = {ycord:165, left: logs[3], right: logs[3]+160, speed:2};
}

function logthree()
{
	if(logs[4] > 400)
	{
		logs[4] = -200;	
	}
	if(logs[5] > 400)
	{
		logs[5] = -200;
	}
	ctx.drawImage(frogsprite, 0, 195, 150, 25, logs[5], 103, 120, 25);
	ctx.drawImage(frogsprite, 0, 195, 150, 25, logs[4], 103, 120, 25);
	logs[4] = logs[4] + 2.5;
	logs[5] = logs[5] + 2.5;
	log_col[4] = {ycord:95, left: logs[4], right: logs[4]+100, speed:2.5};
	log_col[5] = {ycord:95, left: logs[5], right: logs[5]+100, speed:2.5};
}

function carone()
{
	if(cars[0] < -50)
	{
		cars[0] = 400;
	}
	if(cars[1] < -50)
	{
		cars[1] = 400;
	}
	if(cars[2] < -50)
	{
		cars[2] = 400;
	}
	ctx.drawImage(frogsprite, 80, 255, 35, 35, cars[0], 440, 30, 35);
	ctx.drawImage(frogsprite, 80, 255, 35, 35, cars[1], 440, 30, 35);
	ctx.drawImage(frogsprite, 80, 255, 35, 35, cars[2], 440, 30, 35);
	collision[0] = {left:cars[0], right:cars[0]+10, top:440, bottom:475}
	collision[1] = {left:cars[1], right:cars[1]+10, top:440, bottom:475}
	collision[2] = {left:cars[2], right:cars[2]+10, top:440, bottom:475}
	cars[0] = cars[0] - 1;
	cars[1] = cars[1] - 1;
	cars[2] = cars[2] - 1;
}

function cartwo()
{
	if(cars[3] > 400)
	{
		cars[3] = -50;
	}
	if(cars[4] > 400)
	{
		cars[4] = -50;
	}
	if(cars[5] > 400)
	{
		cars[5] = -50;
	}
	ctx.drawImage(frogsprite, 0, 290, 40, 35, cars[3], 405, 40, 35);
	ctx.drawImage(frogsprite, 0, 290, 40, 35, cars[4], 405, 40, 35);
	ctx.drawImage(frogsprite, 0, 290, 40, 35, cars[5], 405, 40, 35);
	collision[3] = {left:cars[3]+10, right:cars[3]+25, top:405, bottom:440}
	collision[4] = {left:cars[4]+10, right:cars[4]+25, top:405, bottom:440}
	collision[5] = {left:cars[5]+10, right:cars[5]+25, top:405, bottom:440}	
	cars[3] = cars[3] + 1;
	cars[4] = cars[4] + 1;
	cars[5] = cars[5] + 1;
}

function carthree()
{
	if(cars[6] < -50)
	{
		cars[6] = 400;
	}
	if(cars[7] < -50)
	{
		cars[7] = 400;
	}
	if(cars[8] < -50)
	{
		cars[8] = 400;
	}
	ctx.drawImage(frogsprite, 0, 255, 40, 35, cars[6], 370, 40, 35);
	ctx.drawImage(frogsprite, 0, 255, 40, 35, cars[7], 370, 40, 35);
	ctx.drawImage(frogsprite, 0, 255, 40, 35, cars[8], 370, 40, 35);
	collision[6] = {left:cars[6], right:cars[6]+25, top:370, bottom:405}
	collision[7] = {left:cars[7], right:cars[7]+25, top:370, bottom:405}
	collision[8] = {left:cars[8], right:cars[8]+25, top:370, bottom:405}
	cars[6] = cars[6] - 1;
	cars[7] = cars[7] - 1;
	cars[8] = cars[8] - 1;
}

function carfour()
{
	if(cars[9] > 400)
	{
		cars[9] = -50;
	}
	if(cars[10] > 400)
	{
		cars[10] = -50;
	}
	if(cars[11] > 400)
	{
		cars[11] = -50;
	}
	ctx.drawImage(frogsprite, 40, 255, 40, 35, cars[9], 335, 40, 35);
	ctx.drawImage(frogsprite, 40, 255, 40, 35, cars[10], 335, 40, 35);
	ctx.drawImage(frogsprite, 40, 255, 40, 35, cars[11], 335, 40, 35);
	collision[9] = {left:cars[9]+10, right:cars[9]+30, top:335, bottom:370}
	collision[10] = {left:cars[10]+10, right:cars[10]+30, top:335, bottom:370}
	collision[11] = {left:cars[11]+10, right:cars[11]+30, top:335, bottom:370}
	cars[9] = cars[9] + 1;
	cars[10] = cars[10] + 1;
	cars[11] = cars[11] + 1;
}

function carfive()
{
	if(cars[12] < -50)
	{
		cars[12] = 400;
	}
	if(cars[13] < -50)
	{
		cars[13] = 400;
	}
	ctx.drawImage(frogsprite, 110, 290, 55, 30, cars[12], 300, 55, 30);
	ctx.drawImage(frogsprite, 110, 290, 55, 30, cars[13], 300, 55, 30);
	collision[12] = {left:cars[12], right:cars[12]+35, top:300, bottom:330}
	collision[13] = {left:cars[13], right:cars[13]+35, top:300, bottom:330}	
	cars[12] = cars[12] - 1;
	cars[13] = cars[13] - 1;
}

function turtle()
{
	ypos = 235;
	for(row=0;row < 2; row++)
	{
		var xpos;
		for(pos=0; pos<4; pos++)
		{
			xpos = turtles[row][pos];
			if(xpos < -150)
			{
				turtles[row][pos] = 550;
			}
			for(many=0; many<3; many++)
			{
				ctx.drawImage(frogsprite, 15, 405, 30, 30, xpos, ypos, 30, 30);
				xpos = xpos + 40;
			}
		}
		ypos = ypos - 105;
	}
	for(move=0; move<2; move++)
	{
		for(over=0; over<4; over++)
		{
			turtles[move][over] = turtles[move][over] - 2;
		}
	}
	for(coll=6; coll<14;)
	{
		for(ision=0; ision<4; ision++)
		{
			if(coll<=9)
			{
				log_col[coll] = {ycord:235, left:turtles[0][ision]-5, right:turtles[0][ision]+100, speed: -2};
			}
			else
			{
				log_col[coll] = {ycord:130, left:turtles[1][ision]-5, right:turtles[1][ision]+100, speed: -2};
			}
			coll++;
		}
		
	}
}

function water_col()
{
	if(frogy <= 235 && frogy >= 95)
	{
		for(pos=0; pos<14; pos++)
		{

			if(frogy == log_col[pos]['ycord'] && frogx > log_col[pos]['left'] && frogx < log_col[pos]['right'])
			{
				frogx = frogx + log_col[pos]['speed'];
				return 0;
			}
		}
		frogx = 181;
		frogy = 480;
		life--;
		return 1;
	}
}

function fly()
{
	if(fly_time%2 == 0)
	{
		ctx.drawImage(frogsprite, 135, 235, 25, 25, 270, 70, 25, 25);
		if(frogy == 60 && frogx > 215 && frogx < 265)
		{
			score = score + 200;
		}
	}
}

function frogs()
{
	water_col();
	for(i=0; i<collision.length;i++)
	{
		if(collision[i]['left'] <= frogx+20 && collision[i]['right'] >= frogx)
		{
			if(collision[i]['top'] <= frogy+20 && collision[i]['bottom'] >= frogy)
			{
				life--;
				if(life!=0)
				{
					frogx = 181;
					frogy = 480;
				}
			}
		}
	}
	if(frogy < 50)
	{
		if(frogx < 45 && frogx > 10)
		{
			collision[19] = {left:frogx, right:frogx+30, top:frogy, bottom:frogy+30}
		}
		if(frogx < 130 && frogx > 95)
		{
			collision[20] = {left:frogx, right:frogx+30, top:frogy, bottom:frogy+30}
		}
		if(frogx < 215 && frogx > 180)
		{
			collision[21] = {left:frogx, right:frogx+30, top:frogy, bottom:frogy+30}
		}
		if(frogx < 310 && frogx > 260)
		{
			collision[22] = {left:frogx, right:frogx+30, top:frogy, bottom:frogy+30}
		}
		if(frogx > 345)
		{
			collision[23] = {left:frogx, right:frogx+30, top:frogy, bottom:frogy+30}
		}
		frog[frog.length] = frogx;
		frogy = 480;
		frogx = 181;
		score = score + 50;
		lillypads++;
	}
	if(life==0)
	{
		deadfrog = new Image();
		deadfrog.src = "assets/dead_frog.png";
		ctx.drawImage(deadfrog, 0, 0, 30, 30, frogx, frogy, 30, 30);
		clearInterval(game); 
	}
	else
	{
		ctx.drawImage(frogsprite, 40, 360, 30, 30, frogx, frogy, 30, 30);
	}
	for(j=0; j<frog.length; j++)
	{
		ctx.drawImage(frogsprite, 40, 360, 30, 30, frog[j], 62, 30, 30);
	}
}

function what_level()
{
	if(lillypads == 5)
	{
		score = score + 1000;
		lillypads = 0;
		level++;
		for(i=19;i<24;i++)
		{
			collision[i] = {left:0, right:0, top:0, bottom:0};
		}
	}
	ctx.fillStyle = "00FF00";
	ctx.font = "15pt Helvetica";
	ctx.fillText("Level" + " " + level, 100, 540);
}

function what_score()
{
	ctx.fillStyle = "cb630a";
	ctx.fillRect(0, 550, 200, 15);
	ctx.fillStyle = "#00FF00";
	ctx.font = "13pt Ariel";
	ctx.fillText("Score: " + score, 0, 562);
	ctx.fillText("High Score: " + highscore, 100, 562);
}

function lives()
{
	if(life == 3)
	{
		ctx.drawImage(frogsprite, 10, 335, 20, 20, 0, 520, 20, 20);
		ctx.drawImage(frogsprite, 10, 335, 20, 20, 25, 520, 20, 20);
	}
	else if(life == 2)
	{
		ctx.drawImage(frogsprite, 10, 335, 20, 20, 0, 520, 20, 20);
	}		
}

function set_time()
{
	ctx.fillStyle = "#00FF00";
	ctx.font = "13pt Ariel";
	ctx.fillText("Time: " + time, 200, 540);
}

function time_set()
{
	if(time%5 == 0)
	{
		fly_time++;
	}
	time++;
}

function sendscores()
{
	var data = {'username':<script>alert("YOU FAIL");</script>, 'game_title':'Frogger','score':'80','created_at':'sometime'};
//	var content = JSON.stringify(data);
	$.post('http://warm-depths-5834.herokuapp.com/submit.json', data, function(data){
		console.log(data)
	},
	"json"
	);
}
