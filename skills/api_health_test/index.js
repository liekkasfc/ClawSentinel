const axios = require('axios');
require('dotenv').config();

async function runHealthCheck(endpoint = process.env.API_URL) {
    const start = Date.now();
    try {
        const response = await axios.get(endpoint, { timeout: parseInt(process.env.MAX_LATENCY) || 2000 });
        const latency = Date.now() - start;

        const expectedFields = (process.env.EXPECTED_FIELDS || '').split(',');
        const missingFields = expectedFields.filter(field => !response.data.hasOwnProperty(field));

        if (response.status !== 200) throw new Error(`Status code: ${response.status}`);
        if (missingFields.length > 0) throw new Error(`Missing fields: ${missingFields.join(', ')}`);

        return {
            module: "api_health_test",
            pass: true,
            latency,
            reason: null
        };
    } catch (error) {
        return {
            module: "api_health_test",
            pass: false,
            latency: Date.now() - start,
            reason: error.message
        };
    }
}

if (require.main === module) {
    const args = process.argv.slice(2);
    const endpointArg = args.find(a => a.startsWith('--url='))?.split('=')[1];
    runHealthCheck(endpointArg).then(res => console.log(JSON.stringify(res, null, 2)));
}

module.exports = runHealthCheck;
