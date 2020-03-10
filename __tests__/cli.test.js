const path = require('path');
const exec = require('child_process').exec;
const bddStdin = require('bdd-stdin');

const timeout = (time) => new Promise((resovle) => {
  setTimeout(() => resovle(), time)
});

describe('Tesling CLI', () => {
  it('Create command', async (done) => {
    const { stdout } = await exec(`node ${path.resolve("./index")} create`);

    const data = await promisifyStdout(stdout);

    expect(data.trim()).toBe('Create component...');

    done();
  })
});

const promisifyStdout = (stdout) => {
  return new Promise((resolve, reject) => {
    stdout.on('data', (data, err) => {
      if (err) {
        reject(err);

        return;
      }

      resolve(data.toString());
    });
  })
};

