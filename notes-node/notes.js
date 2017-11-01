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