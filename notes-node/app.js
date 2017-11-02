console.log('Starting app.');

const fs = require('fs');
// const os = require('os');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');

const argv = yargs.argv;
var command = process.argv[2];
console.log('Command: ', command);
// console.log('Process', process.argv);//arguments vector
console.log('Yargs', argv);

if (command === 'add') {
	console.log('Adding new note');
	
} else if (command === 'list') {
	console.log('Listing all notes');
} else {
	console.log('Command not recognized');
}



// for console.log() => cmd + shift + l






















/* Section 3 */
/*var res = notes.addNote();
console.log(res);
console.log('Result:', notes.add(5,8));
*/
// var user = os.userInfo();
//console.log(user);

// fs.appendFileSync('greetings.txt', `Hello ${user.username}! You are ${notes.age}`);

/*console.log(_.isString(true));
console.log(_.isString('Jacky'));

var filteredArry = _.uniq(['J', 'Me', 1, 'J', 1, 2, 3]);
console.log(filteredArry);*/