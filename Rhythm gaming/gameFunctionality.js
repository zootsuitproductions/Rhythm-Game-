let mySound = [];

let images;
function preload() {
	for (i = 1; i <= 7; i++) {
  		mySound.push(loadSound("/Rhythm-Game-/Rhythm%20gaming/sounds/Cymatics - WRLD Percussion " + String(i) + ".wav"));
	}

	images = {
		1: loadImage('/Rhythm-Game-/Rhythm%20gaming/images/1.png'),
		0.5: loadImage('/Rhythm-Game-/Rhythm%20gaming/images/0.5.png'),
		0.25: loadImage('/Rhythm-Game-/Rhythm%20gaming/images/0.25.png'),
		0.125: loadImage('/Rhythm-Game-/Rhythm%20gaming/images/0.125.png'),
		0.375: loadImage('/Rhythm-Game-/Rhythm%20gaming/images/0.375.png')
	};
}


let fr = 60;
let ready = false;

function setup() {
	createCanvas(windowWidth,windowHeight);
	background(200);
	textSize(30);

	text("Press any key to begin",20,50);
	//arr[currentGame].displayNotes();

}

let previousGame = -1;

function draw() {
	if ((currentGame < arr.length) && (ready == true)) {
		let rhythmSeq = arr[currentGame]
		if (currentGame > previousGame) {
			background(200);
			//text(rhythmSeq.getSequence(),20,50);
			previousGame = currentGame
			//print("hello");
			rhythmSeq.displayNotes();
		}
		let currentKey = rhythmSeq.getCurrentKey();
		if ((currentKey > -1) && (currentKey < rhythmSeq.getSequence().length)) {
			rhythmSeq.setRecordedSequence((rhythmSeq.getRecordedSequence()[currentKey] + 5), currentKey);
		}
	}
}

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

	displayNotes() {
		print(this.sequence);
		for (i = 0; i < this.sequence.length; i++) {
			let string = String(this.sequence[i]);
			let index = i;
			image(images[string], index*100, 0, 100, 100);
			// loadImage('images/' + string + '.png', img => {
   //  			image(img, index*100, 0, 100, 100);
  	// 		});

		}
	}

}

let noteTypes = [1,1/2,1/4,1/8,0.375];

function generateRhythm(rhythmLength) {
	let rhythm = [];
	for (i = 0; i < rhythmLength; i++) {
		rhythm.push(noteTypes[Math.round((noteTypes.length-1)*Math.random())]);
	}
	return rhythm;
}

let arr = [new RhythmSequence(generateRhythm(5)),new RhythmSequence(generateRhythm(6)),new RhythmSequence(generateRhythm(5))];//[new RhythmSequence([3/8, 3/8, 1/2, 1/4]), new RhythmSequence([1, 1])];
let currentGame = 0;

function keyPressed() {
	ready = true;
	if (currentGame < arr.length) {
		mySound[5].play();
		arr[currentGame].keyPressed();	
	}
}
