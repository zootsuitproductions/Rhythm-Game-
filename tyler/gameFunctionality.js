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
let explosions = [];

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
	for (var i = 0; i < gameFruits.length; i++) {
		explosions.push(new Explosion(200,200,gameFruits[i].array));
	}
	angleMode(DEGREES)
}

function draw() {
	background(bc)
	noStroke()
	fill(100)
	textSize(50)
	text('key is down', 0, 40)
	// for (var i = 0; i < explosions.length; i++) {
	// 	explosions[i].move()
	// 	console.log(explosions[i].x)
	// }

	if(!completed){
		for (var i = 0; i < gameFruits.length; i++) {
			gameFruits[i].show()
		}
	}
	if(completed){
		for (var i = 0; i < gameFruits.length; i++) {
			explosions[i].x = gameFruits[i].x;
			explosions[i].y = gameFruits[i].y;
		}
		for (var i = 0; i < explosions.length; i++) {
			explosions[i].move()
			console.log(explosions[i].x)
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
	}
	show(){
		this.angle += 2.5;
		this.y = map(sin(this.angle),-1,1,(height/2) + 30,(height/2) - 30)
		imageMode(CENTER)
		image(this.type,this.x,this.y,this.width,this.height)
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
			this.explodeX+=cos(this.array[i]);
			this.explodeY+=sin(this.array[i]);
		}
	}
}
