const Bull = require("bull");

const myFirstQueue = new Bull("my-first-queue");

const job = myFirstQueue.add({
  foo: "bar",
});

myFirstQueue.process(async (job) => {
  let progress = 0;
  for (i = 0; i < 100; i++) {
    await doSomething(job.data);
    progress += 10;
    job.progress(progress);
  }
  console.log("hi");
});

module.exports = consume;
