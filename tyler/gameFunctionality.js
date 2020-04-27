//THE reason why can't move explosions is because at 105-106, I redefine explodeX immediately

let fr = 60;
let bc = 100;
let apple;
let watermelon;
let plum;
let completed = false;
let gameFruits = [];
let currentKey = 0;
let sequence = [];

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
		let explosions = []
		for (var i = 0; i < gameFruits.length; i++) {
			explosions.push(new Explosion(gameFruits[i].x,gameFruits[i].y,gameFruits[i].array));
		}
		for (var i = 0; i < explosions.length; i++) {
			explosions[i].move()
		}
	}
}

function keyPressed() {
	currentKey++
	if (currentKey >= 5) {
		completed = true;
	}
}

class Fruit {
	constructor(x,width,height,angle,type){
		this.x = x;
		this.width = width;
		this.height = height;
		this.angle = angle;
		this.type = type;

		this.array = [];
		for (var i = 0; i < 30; i++) {
			this.array.push(Math.floor(Math.random()*359))
		}
		console.log(this.array)
	}
	show(){
		this.angle += 2.5;
		this.y = map(sin(this.angle),-1,1,(height/2) + 30,(height/2) - 30)
		imageMode(CENTER)
		image(this.type,this.x,this.y,this.width,this.height)
	}
}

function explode(x,y,array){
	for (var i = 0; i < array.length; i++) {
		let explodeX = x;
		let explodeY = y;
		fill('red')
		ellipse(explodeX,explodeY,5,5)
		explodeX+=cos(array[i]);
		explodeY+=sin(array[i]);
	}
}

class Explosion {
	constructor(x,y,array){
		this.x = x;
		this.y = y;
		this.array = array;

		for (var i = 0; i < this.array.length; i++) {
			this.explodeX = this.x;
			this.explodeY = this.y;
		}
	}
	move(){
		for (var i = 0; i < this.array.length; i++) {
			// this.explodeX = this.x;
			// this.explodeY = this.y;
			fill('red')
			ellipse(this.explodeX,this.explodeY,2,2)
			this.explodeX+=cos(this.array[i]) * 6;
			this.explodeY+=sin(this.array[i]) * 6;
		}
	}
}
