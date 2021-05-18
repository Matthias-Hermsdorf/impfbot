const fetch = require("./fetch")
const CronJob = require('cron').CronJob;

var jobFetch = new CronJob('2 */1 * * * *', function() {
  fetch()
});

jobFetch.start();
fetch()