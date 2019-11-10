const path = require('path');
const exec = require('child_process').exec;

test('Tesling CLI command create', async (done) => {
  const { stdout } = await exec(`node ${path.resolve("./index")} create`);

  const data = await promisifyStdout(stdout);

  done();

  expect(data.toString()).toBe("Create component...");
});


const promisifyStdout = (stdout) => {
  return new Promise((resolve, reject) => {
    stdout.on('data', (data, err) => {
      if (err) {
        reject(err);

        return;
      }

      resolve(data);
    });
  })
};

