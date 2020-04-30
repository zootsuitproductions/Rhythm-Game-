//have explosion speed (might need to change the .move function)
let fr = 60;
let bc = 100;
let apple;
let watermelon;
let plum;
let completed = false;
let gameFruits = [];
let currentKey = 0;
let sequence = [];
let explosions = [];
let score = "good job"

document.addEventListener('keydown', function(){
	bc = 50;
})
document.addEventListener('keyup', function(){
	bc = 100;
})

function preload(){
  apple = loadImage('/Rhythm-Game-/tyler/pictures/fruit/apple.png');
	watermelon = loadImage('/Rhythm-Game-/tyler/pictures/fruit/watermelon.png');
	plum = loadImage('/Rhythm-Game-/tyler/pictures/fruit/plum.png');
}

function setup() {
	createCanvas(700,400)
  sequence = [apple, apple, watermelon, plum];
	for (var i = 0; i < sequence.length; i++) {
		gameFruits.push(new Fruit((i * (width - 300) / (sequence.length - 1)) + 150 , 25, 25, 20 * i, sequence[i]))
	}
	angleMode(DEGREES)
	textAlign(CENTER)
}

function draw() {
	background(bc)
	noStroke()
	fill(100)
	textSize(50)
	text('key is down', 140, 40)

	if(!completed){
		for (var i = 0; i < gameFruits.length; i++) {
			gameFruits[i].show()
		}
	}
	if(completed){
		for (var i = 0; i < explosions.length; i++) {
			explosions[i].move()
		}

		bc = 50;
		text("game over\n" + score,width/2,height/2)
	}
}

function keyPressed() {
	currentKey++
	if (currentKey >= 5) {
		completed = true;
	}
	if (currentKey == 5){
		for (var i = 0; i < gameFruits.length; i++) {
			for (var j = 0; j < 30; j++) {
				explosions.push(new Explosion(gameFruits[i].x,gameFruits[i].y,Math.floor(Math.random()*359)));
			}
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
	constructor(x,y,direction){
		this.x = x;
		this.y = y;
		this.direction = direction;
	}
	move(){
		fill('red')
		ellipse(this.x,this.y,2,2)
		this.x+=cos(this.direction);
		this.y+=sin(this.direction);
	}
}
