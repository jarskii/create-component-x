var yargs = require('yargs');
var chooseTemplate = require('./src/chooseTemplate');
var useTemplate = require('./src/useTemplate');

yargs.command('create', 'creare component', (yargs) => {
  yargs.option('name', {
    describe: 'Name of component',
    default: 'Component'
  })
  }, (argv) => {
    if (argv.verbose) {
      console.log('With vverbose')
    }
    chooseTemplate({name: argv.name});
  })
  .option('verbose', {
    alias: 'v',
    default: false
  })
  .argv

yargs.command('use', 'use template', (yargs) => {
  yargs.option('pat', {
    describe: 'Name pattern. $compName$ by deafult',
    default: '$compName$'
  })
  }, (argv) => {

    useTemplate({
      name: argv.name,
      pat: argv.pat,
    });
  })
  .option('name', {
    alias: 'n',
    default: false
  })
  .argv