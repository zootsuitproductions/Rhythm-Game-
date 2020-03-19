var lines;
var apple;
var angle;
var img;

function preload(){
  img = loadImage('/tyler/pictures/apples/apple1.png');
  fr = createImg('/tyler/pictures/flames/flame1.gif');
}

function setup() {
  createCanvas(400, 400);
  angle=0;

  lines = [width/5, 2*width/5, 3*width/5, 4*width/5, width];

  apple = {
    x: 0,
    y: 0,
    width: 25,
    height: 25
  }
}

function draw() {

  angleMode(DEGREES)
  angle+=2.5

  cnv=document.getElementById('defaultCanvas0');
  console.log(window.innerWidth)

  background(100);
  fr.position(((window.innerWidth - cnv.width) / 2) + apple.x, apple.y)
  fr.elt.width = apple.width

  stroke('blue')
  line(20,0,20,height)

  for(var i = 0; i < lines.length; i++){
    lines[i]--
    if(lines[i] < 0){
      lines[i] = width
    }

    for(var j = 0; j < height / 20; j++){
      stroke('black')
      line(lines[i],j*20, lines[i], (j*20)+5)
    }
  }

  apple.y = map(sin(angle),-1,1,(height/2) + 20,(height/2)-20)
  apple.x = lines[0]
  imageMode(CENTER)
  image(img,apple.x,apple.y,apple.width,apple.height)

}
