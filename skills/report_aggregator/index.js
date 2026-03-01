const fs = require('fs');
const path = require('path');

function runAggregator(results) {
    const failedModules = results.filter(r => !r.pass).map(r => r.module);
    const overall = failedModules.length === 0 ? "pass" : "fail";
    const timestamp = new Date().toISOString();

    const report = {
        overall,
        failed_modules: failedModules,
        timestamp,
        detailed_results: results
    };

    const reportPath = path.join(__dirname, '../../reports', `${timestamp.replace(/:/g, '-')}.json`);
    const reportDir = path.dirname(reportPath);
    if (!fs.existsSync(reportDir)) {
        fs.mkdirSync(reportDir, { recursive: true });
    }
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

    return {
        overall,
        failed_modules: failedModules,
        report_file: reportPath
    };
}

if (require.main === module) {
    // Example usage
    const mockResults = [
        { module: "api_health_test", pass: true },
        { module: "ui_smoke_test", pass: false }
    ];
    console.log(JSON.stringify(runAggregator(mockResults), null, 2));
}

module.exports = runAggregator;
