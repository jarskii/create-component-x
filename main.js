const yargs = require('yargs');
const chooseTemplate = require('./lib/chooseTemplate');
const useTemplate = require('./lib/useTemplate');

yargs.command('create', 'creare component', (yargs) => {
  yargs.option('name', {
    describe: 'Component name',
  })
}, (argv) => {
  chooseTemplate({name: argv.name});
})
  .option('verbose', {
    alias: 'v',
    default: false
  })
  .argv;

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
  .argv;


process.on('unhandledRejection', error => {
  if (error) {
    console.error('UnhandledRejection create-component-x: ', error.message);
  }
});

