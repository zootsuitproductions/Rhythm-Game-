let fr = 60;

//let currentKey = -1
let keySequence = [0,0,0,0,0,0,0,0];

let desiredSequence = [3/8, 3/8, 1/2, 1/4]



function setup() {
	createCanvas(windowWidth,windowHeight);
	background(200);
}

function draw() {
	if (currentGame < arr.length) {
		let rhythmSeq = arr[currentGame]
		let currentKey = rhythmSeq.getCurrentKey();
		if ((currentKey > -1) && (currentKey < 5)) {
			rhythmSeq.setRecordedSequence((rhythmSeq.getRecordedSequence()[currentKey] + 5), currentKey);
			//keySequence[currentKey] += 5;
		}
	}
}

class RhythmSequence {
	constructor(sequence) {
		this.sequence = sequence;
		this.currentKey = -1;
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
		if (this.currentKey < 4) {
		this.recordedSequence.push(0); 
		this.currentKey ++; 
		} else if (this.currentKey === 4) {	
			console.log(this.recordedSequence)
			this.currentKey ++;
			console.log(this.checkCorrectness());
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
		return correct;
	}

}

let game1 = new RhythmSequence(desiredSequence);
let game2 = new RhythmSequence([1, 1, 1, 1]);

let arr = [game1, game2];
let currentGame = 0;

function keyPressed() {
	if (currentGame < arr.length) {
		arr[currentGame].keyPressed();	
	}
}
