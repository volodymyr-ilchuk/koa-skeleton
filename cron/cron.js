const { CronJob } = require('cron');
const {
  updateProductsInAlgolia
} = require('./jobs');

const jobs = [
  new CronJob('*/1 * * * *', updateProductsInAlgolia)
];

// Initial and run jobs
for (let i = 0; i < jobs.length; i += 1) { // i += 1 це те саме що й i = i + 1,  i++
  jobs[i].start();
}
