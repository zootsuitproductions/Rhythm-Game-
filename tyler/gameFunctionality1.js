//make gameendscreen already a size bc it isnt going to change

let fr = 60;
let ready = false;
let bc = 100;
let apple;
let watermelon;
let plum;
let completed = false;
let gameFruits = [];
let currentKey = 0;
let sequence = [];
let explosions = [];
let levels = ['not a level'];
let mySound = [];
let gameEndScreen = {
  x: 0,
  y: 0,
  w: 0,
  h: 0,
  c: [45,45,45,100],
  a: 90
}

// document.addEventListener('keydown', function(){
// 	bc = 50;
// })
// document.addEventListener('keyup', function(){
// 	bc = 100;
// })
for (var i = 1; i < 6; i++) {
  levels.push(document.getElementById(i))
}

function preload(){
  apple = loadImage('/Rhythm-Game-/tyler/pictures/fruit/apple.png');
	watermelon = loadImage('/Rhythm-Game-/tyler/pictures/fruit/watermelon.png');
	plum = loadImage('/Rhythm-Game-/tyler/pictures/fruit/plum.png');

	for (i = 1; i <= 7; i++) {
  		mySound.push(loadSound("/Rhythm-Game-/tyler/sounds/Cymatics - WRLD Percussion " + String(i) + ".wav"));
	}
}

function setup() {
	createCanvas(700,400)
  gameEndScreen.w = width;
  sequence = [apple, apple, watermelon, plum];
	for (var i = 0; i < sequence.length; i++) {
		gameFruits.push(new Fruit((i * (width - 300) / (sequence.length - 1)) + 150 , 25, 25, 20 * i, sequence[i]))
	}
	angleMode(DEGREES)
	print(gameFruits);
}



// danny code

class RhythmSequence {
	constructor(sequence) {
		this.sequence = sequence;
		this.currentKey = -2;
		this.recordedSequence = Array(sequence.length).fill(0);
	}

	getCurrentKey() {
		return this.currentKey;
	}
	incrementCurrentKey() {
		this.currentKey ++;
	}
	getRecordedSequence() {
		return this.recordedSequence;
	}
	setRecordedSequence(val, index) {
		this.recordedSequence[index] = val;
	}
	getSequence() {
		return this.sequence;
	}

	keyPressed() {
		if (this.currentKey < this.sequence.length-1) {
		//this.recordedSequence.push(0);
		this.currentKey ++;
		} else if (this.currentKey === this.sequence.length-1) {
			console.log(this.recordedSequence)
			this.currentKey ++;
			let correct = this.checkCorrectness()
			text(correct,windowWidth/2,windowHeight/2);
			console.log(correct);

		}
	}

	checkCorrectness() {
		let correct = true;
		for (let i = 0; i < this.sequence.length; i ++) {
			let actualNoteLength = this.recordedSequence[0]*(1/this.sequence[0]) * this.sequence[i]; //WORKS WITH ANY TEMPO
			if (Math.abs(this.recordedSequence[i]/actualNoteLength - 1) > 0.15) {
				correct = false;
			}
		}
		currentGame ++;
		ready = false;
		return correct;
	}

}

let arr = [new RhythmSequence([3/8, 3/8, 1/2, 1/4]), new RhythmSequence([1, 1])];
let currentGame = 0;

function keyPressed() {
	ready = true;
	if (currentGame < arr.length) {
		mySound[5].play();
		arr[currentGame].keyPressed();
	}
  else {
    completed = true;
		for (var i = 0; i < gameFruits.length; i++) {
			for (var j = 0; j < 30; j++) {
				explosions.push(new Explosion(gameFruits[i].x,gameFruits[i].y,Math.floor(Math.random()*359),Math.random()*2,gameFruits[i].type));
			}
		}
  }
}

///






// function draw() {
// 	if ((currentGame < arr.length) && (ready == true)) {
// 		background(200);
// 		text(arr[currentGame].getSequence(),20,50);
// 		let rhythmSeq = arr[currentGame]
// 		let currentKey = rhythmSeq.getCurrentKey();
// 		if ((currentKey > -1) && (currentKey < rhythmSeq.getSequence().length)) {
// 			rhythmSeq.setRecordedSequence((rhythmSeq.getRecordedSequence()[currentKey] + 5), currentKey);
// 		}
// 	}
// }

function draw() {
	background(bc)
	noStroke()
	fill(100)
	textSize(50)
	text('key is down', 0, 40)

  fill(gameEndScreen.c[0],gameEndScreen.c[1],gameEndScreen.c[2],gameEndScreen.c[3])
  rect(gameEndScreen.x,gameEndScreen.y,gameEndScreen.w,gameEndScreen.h)

  if (completed) {
    // moveEndScreen(new Date(Date.now()))
    // setInterval(moveEndScreen(gameEndScreen.a),250)
  }

	if ((currentGame < arr.length) && (ready == true)) {
		for (var i = 0; i < gameFruits.length; i++) {
			gameFruits[i].show()
		}
    fill(100)
		text(arr[currentGame].getSequence(),20,50);
		let rhythmSeq = arr[currentGame]
		let currentKey = rhythmSeq.getCurrentKey();
		if ((currentKey > -1) && (currentKey < rhythmSeq.getSequence().length)) {
			rhythmSeq.setRecordedSequence((rhythmSeq.getRecordedSequence()[currentKey] + 5), currentKey);
		}
	} else {
		for (var i = 0; i < explosions.length; i++) {
			explosions[i].move()
		}
	}
}

class Fruit {
	constructor(x,width,height,angle,type){
		this.x = x;
		this.width = width;
		this.height = height;
		this.angle = angle;
		this.type = type;
	}
	show(){
		this.angle += 2.5;
		this.y = map(sin(this.angle),-1,1,(height/2) + 30,(height/2) - 30)
		imageMode(CENTER)
		image(this.type,this.x,this.y,this.width,this.height)
	}
}

class Explosion {
	constructor(x,y,direction,speed,type){
		this.x = x;
		this.y = y;
		this.direction = direction;
		this.speed = speed;
		this.type = type;
	}
	move(){
		fill('red')
		imageMode(CENTER)
		image(this.type,this.x,this.y,10,10)
		this.x+=cos(this.direction)*this.speed;
		this.y+=sin(this.direction)*this.speed;
	}
}

function moveEndScreen() {
  // var startTime = time;
  // var endTime = new Date();
  // console.log(startTime)

  // for (var i = 90; i < 270; i++) {

  if (gameEndScreen.a <= 270) {
    gameEndScreen.h = map(sin(i),-1,1,0,height)
  }
  else {
    gameEndScreen.a = 90;
    gameEndScreen.h = 0
  }

  gameEndScreen.a++
  console.log(gameEndScreen.a)
  // }
}
