const path = require('path');
const exec = require('child_process').exec;

test('Tesling CLI commands', async (done) => {
  let result = await cli(['use'], '.');

  expect(result.stdout).toContain("Create component");
});

function cli(args, cwd) {
  return new Promise(resolve => {
    exec(
      `node ${path.resolve("./index")} ${args.join(" ")}`,
      { cwd },
      (error, stdout, stderr) => {
        resolve({
          code: error && error.code ? error.code : 0,
          error,
          stdout,
          stderr
        });
      }
    );
  });
}
