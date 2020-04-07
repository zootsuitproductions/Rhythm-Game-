let mySound = [];
function preload() {
	for (i = 1; i <= 7; i++) {
  		mySound.push(loadSound("sounds/Cymatics - WRLD Percussion " + String(i) + ".wav"));
	}
}

let fr = 60;
let ready = false;

function setup() {
	createCanvas(windowWidth,windowHeight);
	background(200);
	textSize(30);
}

function draw() {
	if ((currentGame < arr.length) && (ready == true)) {
		background(200);
		text(arr[currentGame].getSequence(),20,50);
		let rhythmSeq = arr[currentGame]
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

}

let arr = [new RhythmSequence([3/8, 3/8, 1/2, 1/4]), new RhythmSequence([1, 1])];
let currentGame = 0;

function keyPressed() {
	ready = true;
	if (currentGame < arr.length) {
		mySound[5].play();
		arr[currentGame].keyPressed();	
	}
}
