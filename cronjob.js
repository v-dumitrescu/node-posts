const cron = require('cron');
const https = require('https');

const url = 'https://node-posts-dyfl.onrender.com/';

const cronJob = new cron.CronJob('*/14 * * * * ', () => {
  https.get(url, (res) => {
    if(res.statusCode === 200) {
      return console.log('Server restarted');
    }
    console.error('failed: ', res.statusCode)
  })
  .on('error', (err) => {
    console.error('Error: ', err.message);
  });
});

cronJob.start();