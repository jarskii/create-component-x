var yargs = require('yargs');
var chooseTemplate = require('./src/chooseTemplate');
var useTemplate = require('./src/useTemplate');

yargs.command('create', 'creare component', (yargs) => {
  yargs.option('name', {
    describe: 'Component name',
    default: 'Component'
  })
  }, (argv) => {
    chooseTemplate({name: argv.name});
  })
  .option('verbose', {
    alias: 'v',
    default: false
  })
  .argv

yargs.command('use', 'use template', (yargs) => {
  yargs.option('pat', {
    describe: 'Pattern name. $compName$ by deafult',
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