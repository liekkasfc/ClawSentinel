const cron = require('node-cron');
const { exec } = require('child_process');

// Schedule: Run every day at 03:00 AM
// You'll need to install node-cron: npm install node-cron
console.log('📅 Scheduler started. Waiting for the next run (03:00 AM daily)...');

cron.schedule('0 3 * * *', () => {
    console.log('⏰ Starting 03:00 AM Scheduled Test Run...');
    exec('npm test', (error, stdout, stderr) => {
        if (error) {
            console.error(`❌ Execution error: ${error}`);
            return;
        }
        console.log(stdout);
        console.error(stderr);
        console.log('✅ Scheduled Run Completed.');
    });
});
