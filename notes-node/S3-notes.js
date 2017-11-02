console.log('Starting notes.js');
// console.log(module);
// module.exports
module.exports.age = 24;

module.exports.addNote = () => {
	console.log('addNote');
	return 'New note';
};

module.exports.add = (x, y) => {
	return x + y;
}





/////////////////////////
/* Learning Syntax */
/////////////////////////

// Section 3, Lect. 15
const fs = require('fs');
var originalNote = {
	title: 'Some title',
	body: 'Some body'
}
var originalNoteString = JSON.stringify(originalNote);
fs.writeFileSync('notes.json', originalNoteString);

var noteString = fs.readFileSync('notes.json');
var note = JSON.parse(noteString);

console.log(typeof note);
console.log(note.title);



// Section 3, Lect. 16
var addNote = (title, body) => {
	var notes = [];
	var note = {
		title,
		body
	};
	try {
		var notesString = fs.readFileSync('notes-data.json');
		notes = JSON.parse(notesString);		
	} catch (e) {
		// don't need anything here
	}

	var duplicateNotes = notes.filter(note => note.title === title);

	if (duplicateNotes.length === 0) {
		notes.push(note);
		fs.writeFileSync('notes-data.json', JSON.stringify(notes));
	}

	notes.push(note);
	fs.writeFileSync('notes-data.json', JSON.stringify(notes));
}



// Section 3, Lect. 17 Refactor w/ functions
var fetchNotes = () => {
	try {
		var notesString = fs.readFileSync('notes-data.json');
		return JSON.parse(notesString);
	} catch (e) {
		return [];
	}
};

var saveNotes = (notes) => {
	fs.writeFileSync('notes-data.json', JSON.stringify(notes));
};


// Section 3, Lect. 18
var removeNote = (title) => {
	var notes = fetchNotes();
	var filteredNotes = notes.filter(note => note.title !== title);
	saveNotes(notes);
	return notes.length !== filteredNotes.length;
}




// Section 3, Lect. 19
var getNote = (title) => {
	var notes = fetchNotes();
	var filteredNotes = notes.filter(note => note.title === title);
	return filteredNotes[0];
};




// Section 3, Lect. 20 : Debugging
node inspect app.js add --title="to buy"
// by default pauses before anything is run

// this prints 10 lines before and after where we are
list(10)

// next
n

// continue til complete
c

// repl mode
repl

// put this to start it in the middle of a program
debugger; // use c to get here

nodemon inspect app.js read --title="to buy"


// Section 3, Lect. 21, Debugging in Chrome

node --inspect-brk app.js

// go to url in Chrome browser
'chrome://inspect/#devices'
// Open dedicated DevTools for Node
// look at Sources tab

nodemon --inspect-brk app.js



// Section 3, Lect. 22
// under list if statement
var allNotes = notes.getAll();
allNotes.forEach(note => notes.logNote(note));

const titleOptions = {
	describe: 'Title of note',
	demand: true,// script will fail if title not given
	alias: 't'//can run with -t instead of --title
}

// Section 3, Lect. 23 Requiring Args & Advanced Yargs
const yargs = require('yargs');
const argv = yargs
	.command('add', 'Add a new note', {
		title: titleOptions,
		body: {
			describe: 'Body of note',
			demand: true,
			alias: 'b'
		}
	})
	.command('list', 'List all notes')
	.command('read', 'Read a note', {
		title: titleOptions
	})
	.command('remove', 'Remove a note', {
		titdle: titleOptions
	})
	.help()
	.argv;



// Section 3, Lect. 24

var user = {
	name: 'Jacky',
	sayHi: () => { // this doesn't work
		console.log(arguments);// this doesn't
		console.log(`Hi. I'm ${this.name}`);
	},
	sayHiAlt () { // this works
		console.log(arguments);// this works
		console.log(`Hi. I'm ${this.name}`);
	}
}

user.sayHi(1,2,3);// will return global args variable
user.sayHiAlt(1,2,3);















