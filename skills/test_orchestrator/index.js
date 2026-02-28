const apiTest = require('../api_health_test');
const uiTest = require('../ui_smoke_test');
const llmTest = require('../llm_regression_test');
const aggregate = require('../report_aggregator');

async function main() {
    console.log("🚀 Starting OpenClaw Testing Suite...");

    const results = [];

    console.log("🔍 Running API Health Test...");
    results.push(await apiTest());

    console.log("🔍 Running UI Smoke Test...");
    results.push(await uiTest());

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
