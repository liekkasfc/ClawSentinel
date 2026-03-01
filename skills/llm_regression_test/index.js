const { OpenAI } = require('openai');
const fs = require('fs');
const path = require('path');
require('dotenv').config();


async function runRegressionTest(model = process.env.LLM_MODEL || 'gpt-4o') {
    if (!process.env.OPENAI_API_KEY) {
        return {
            module: "llm_regression_test",
            pass: true,
            skipped: true,
            reason: "OPENAI_API_KEY is missing. Skipping LLM regression test."
        };
    }
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    try {
        const inputs = JSON.parse(fs.readFileSync(path.join(__dirname, '../../baseline/inputs.json'), 'utf8'));
        const baseline = JSON.parse(fs.readFileSync(path.join(__dirname, '../../baseline/scores.json'), 'utf8'));

        let totalScore = 0;
        for (const input of inputs) {
            const completion = await openai.chat.completions.create({
                model: model,
                messages: [{ role: "user", content: input.prompt }],
            });

            const response = completion.choices[0].message.content;

            const scoringPrompt = `
你是质量评估专家。
请给以下文本打分 0-10。
维度：
- 结构完整性
- 逻辑一致性
- 具体程度

文本内容：
${response}

只返回 JSON:
{
  "score": number
}
`;
            const evaluation = await openai.chat.completions.create({
                model: model,
                messages: [{ role: "system", content: scoringPrompt }],
                response_format: { type: "json_object" }
            });

            const scoreResult = JSON.parse(evaluation.choices[0].message.content);
            totalScore += scoreResult.score;
        }

        const averageScore = totalScore / inputs.length;
        const pass = averageScore >= (baseline.average_score - 1.0);

        return {
            module: "llm_regression_test",
            pass,
            average_score: averageScore,
            baseline_score: baseline.average_score,
            delta: averageScore - baseline.average_score
        };
    } catch (error) {
        return {
            module: "llm_regression_test",
            pass: false,
            reason: error.message
        };
    }
}

if (require.main === module) {
    runRegressionTest().then(res => console.log(JSON.stringify(res, null, 2)));
}

module.exports = runRegressionTest;
