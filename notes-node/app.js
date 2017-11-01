console.log('Starting app.');

const fs = require('fs');
const os = require('os');
const notes = require('./notes.js');
const _ = require('lodash');

var res = notes.addNote();
console.log(res);
console.log('Result:', notes.add(5,8));
// var user = os.userInfo();
//console.log(user);

// fs.appendFileSync('greetings.txt', `Hello ${user.username}! You are ${notes.age}`);



/* Section 3 */

console.log(_.isString(true));
console.log(_.isString('Jacky'));

var filteredArry = _.uniq(['J', 1, 'J', 1, 2, 3]);
console.log(filteredArry);