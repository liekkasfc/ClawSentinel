const apiTest = require('../api_health_test');
const uiTest = require('../ui_smoke_test');
const llmTest = require('../llm_regression_test');
const aggregate = require('../report_aggregator');

async function main() {
    const args = process.argv.slice(2);
    const targetUrl = args.find(a => a.startsWith('--url='))?.split('=')[1] || process.env.BASE_URL || 'http://localhost:3000';

    console.log(`🚀 Starting OpenClaw Testing Suite for ${targetUrl}...`);

    const results = [];

    console.log("🔍 Running API Health Test...");
    // For geo-seo, the root should return 200
    results.push(await apiTest(targetUrl));

    console.log("🔍 Running UI Smoke Test...");
    // Default to /sign-in for this project
    results.push(await uiTest('/sign-in', targetUrl));

    console.log("🔍 Running LLM Regression Test...");
    results.push(await llmTest());

    console.log("📊 Aggregating Results...");
    const summary = aggregate(results);

    console.log("\n--- TEST SUMMARY ---");
    console.log(`Status: ${summary.overall.toUpperCase()}`);
    if (summary.failed_modules.length > 0) {
        console.log(`Failed: ${summary.failed_modules.join(', ')}`);
    }
    console.log(`Report: ${summary.report_file}`);
    console.log("---------------------\n");
}

main().catch(err => {
    console.error("❌ Orchestrator failed:", err);
    process.exit(1);
});
