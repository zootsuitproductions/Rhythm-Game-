let fr = 60;
let apple;
let watermelon;
let plum;
let bc = 100;
let completed = false;
let gameFruits = [];

let currentKey = -1
let keySequence = [0,0,0,0,0,0,0,0];

let desiredSequence2 = [3/8, 3/8, 1/2, 1/4]


let score = [];

document.addEventListener('keydown', function(){
	bc = 50;
})
document.addEventListener('keyup', function(){
	bc = 100;
})

function preload(){
  apple = loadImage('/tyler/pictures/fruit/apple.png');
	watermelon = loadImage('/tyler/pictures/fruit/watermelon.png');
	plum = loadImage('/tyler/pictures/fruit/plum.png');
}

function setup() {
	createCanvas(700,400)
	
  let desiredSequence = [apple, apple, watermelon, plum];

	for (var i = 0; i < desiredSequence.length; i++) {
		gameFruits.push(new Fruit((i * (width - 300) / (desiredSequence.length - 1)) + 150 , 25, 25, 20 * i, desiredSequence[i]))
	}


	angleMode(DEGREES)
	print(gameFruits);
}

function draw() {
	background(bc)

	noStroke()
	fill(100)
	textSize(50)
	text('key is down', 0, 40)


	if(!completed){
		for (var i = 0; i < gameFruits.length; i++) {
			gameFruits[i].show()
		}
	}
	if(completed){
		for (var i = 0; i < gameFruits.length; i++) {
			gameFruits[i].boom()
		}
	}

	if ((currentKey > -1) && (currentKey < 5)) {
		keySequence[currentKey] += 5;
	}

	// let sumOfScores = 0;
	// for (var i = 0; i < score.length; i++) {
	// 	sumOfScores += score[i]
	// }
	// if(sumOfScores >= 1){
	// 	totalScore = 5stars;
	// }
}


function keyPressed() {
	if (currentKey < 4) {
		keySequence.push(0);
		currentKey ++;
		console.log(keySequence);
	} else if (currentKey === 4) {
		currentKey ++;
		console.log(checkCorrectness());
		console.log(score)
		completed = true;
	}
}

function checkCorrectness() {
	let correct = true;
	for (i = 0; i < desiredSequence.length; i ++) {
		let actualNoteLength = keySequence[0]*(1/desiredSequence[0]) * desiredSequence[i]; //WORKS WITH ANY TEMPO
		console.log(actualNoteLength);
		if (Math.abs(keySequence[i]/actualNoteLength - 1) > 0.15) {
			correct = false;
			console.log("bad");
			score.push(0);
		} else {
			console.log("good");
			score.push(1);
		}
	}
	return correct;
}

class Fruit {
	constructor(x,width,height,angle,type){
		this.x = x;
		// this.y;
		this.width = width;
		this.height = height;
		this.angle = angle;
		this.type = type;

		this.array = [];
		for (var i = 0; i < 30; i++) {
			this.array.push(Math.floor(Math.random()*359))
		}
	}
	show(){
		this.angle += 2.5;
		this.y = map(sin(this.angle),-1,1,(height/2) + 20,(height/2)-20)
		imageMode(CENTER)
		console.log(this.type)
		image(this.type,this.x,this.y,this.width,this.height)
	}
	boom(){
		// let applePoof = new Bang(this.x,this.y)
		// applePoof.pow()

		// this.x += cos(this.d);
		// this.y += sin(this.d);
		// fill('red')
		// ellipse(this.x,this.y,3,3)

		for (var i = 0; i < this.array.length; i++) {
			// this.bang(this.x,this.y, this.array[i])
			let bingX = this.x;
			let bingY = this.y;
			bingX += cos(this.array[i]);
			bingY += sin(this.array[i]);
			fill('red')
			ellipse(bingX,bingY,3,3)
		}
	}
	bang(bangx,bangy,bangAngle){
		bangx += cos(bangAngle);
		bangy += sin(bangAngle);
		for (var i = 0; i < 10; i++) {
			fill('red')
			ellipse(bangx,bangy,3,3)
		}
	}
}

// class Bang {
// 	constructor(x,y){
// 		this.x = x;
// 		this.y = y;
		// this.array = [];
		// for (var i = 0; i < 30; i++) {
		// 	this.array.push(Math.floor(Math.random()*359))
		// }
// 	}
// 	pow(){
// 		for (var i = 0; i < this.array.length; i++) {
// 			fill('red')
// 			ellipse(this.x,this.y,3,3)
// 			this.x += cos(this.array[i]) * 10;
// 			this.y += sin(this.array[i]) * 10;
// 		}
// 		console.log(this.array)
// 	}
// }
