var lines;
var apple;
var angle;

function setup() {
  createCanvas(400, 400);
  angle=0;

  lines = [width/5, 2*width/5, 3*width/5, 4*width/5, width];

  apple = {
    x: lines[0],
    y: height/2
  }
}

function draw() {
  angleMode(DEGREES)
  background(100);

  for(var i = 0; i < lines.length; i++){

    lines[i]--
    angle+=0.5

    apple.y = map(sin(angle),-1,1,(height/2) + 20,(height/2)-20)
    ellipse(lines[0],apple.y,25,25)

    if(lines[i] < 0){
      lines[i] = width
    }

    for(var j = 0; j < height / 20; j++){
      line(lines[i],j*20, lines[i], (j*20)+5)
    }
  }
}
