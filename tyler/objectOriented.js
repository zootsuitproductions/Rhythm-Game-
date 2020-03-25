let fr = 60;

//let currentKey = -1
let keySequence = [0,0,0,0,0,0,0,0];

let desiredSequence = [3/8, 3/8, 1/2, 1/4]



function setup() {
	createCanvas(windowWidth,windowHeight);
	background(200);
}

function draw() {
	let currentKey = game1.getCurrentKey();
	if ((currentKey > -1) && (currentKey < 5)) {
		game1.setRecordedSequence((game1.getRecordedSequence()[currentKey] + 5), currentKey);
		//keySequence[currentKey] += 5;
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

	// keyPressed() {
	// 	if (this.currentKey < 4) {
	// 	this.recordedSequence.push(0); 
	// 	this.currentKey ++; 
	// 	} else if (this.currentKey === 4) {	
	// 		this.currentKey ++;
	// 		console.log(this.checkCorrectness());
	// 	}
	// }

	// checkCorrectness() {
	// 	let correct = true;
	// 	for (i = 0; i < this.sequence.length; i ++) {
	// 		let actualNoteLength = this.recordedSequence[0]*(1/this.sequence[0]) * this.sequence[i]; //WORKS WITH ANY TEMPO
	// 		if (Math.abs(this.recordedSequence[i]/actualNoteLength - 1) > 0.15) {
	// 			correct = false;
	// 		} 
	// 	}
	// 	return correct;
	// }

}

let game1 = new RhythmSequence(desiredSequence);

function keyPressed() {
	let currentKey = game1.getCurrentKey();
	if (currentKey < 4) {
		//keySequence.push(0); 
		game1.incrementCurrentKey();
	} else if (currentKey === 4) {	
		game1.incrementCurrentKey();
		console.log(checkCorrectness());
	}
}

function checkCorrectness() {
	let correct = true;
	for (i = 0; i < desiredSequence.length; i ++) {
		let actualNoteLength = keySequence[0]*(1/desiredSequence[0]) * desiredSequence[i]; //WORKS WITH ANY TEMPO
		if (Math.abs(keySequence[i]/actualNoteLength - 1) > 0.15) {
			correct = false;
		} else {
		}
	}
	return correct;
}
