const yargs = require('yargs');
const argv = yargs
	.command('add', 'Add a new note', {
		title: {
			describe: 'Title of note',
			demand: true,// script will fail if title not given
			alias: 't'//can run with -t instead of --title
		},
		body: {
			describe: 'Body of note',
			demand: true,
			alias: 'b'
		}
	})
	.help()
	.argv;

console.log(argv);

/* //Try these
node sampleYargs.js add
node sampleYargs.js --help
node sampleYargs.js add -t='me' -b='Jacky'
*/