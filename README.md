# 🚀 ClawSentinel

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A modular, automated testing suite designed specifically for the **OpenClaw** ecosystem. Ensure your agents are always running on solid ground.

## 🌟 Features

- **API Health Check**: Continuous monitoring of your backend endpoints.
- **UI Smoke Test**: Playwright-powered browser automation for login and dashboard verification.
- **LLM Regression Test**: Smart scoring to detect model performance degradation.
- **Master Orchestrator**: One command to rule them all.
- **Unified Reporting**: Structured JSON reports for every run.

## 🛠️ Installation

### Prerequisites
- Node.js (v18+)
- OpenClaw installed

### Setup
1. **One-Liner Installation (Recommended)**:
   ```bash
   curl -sSL https://raw.githubusercontent.com/liekkasfc/ClawSentinel/main/scripts/install.sh | bash
   ```
   *Alternatively, follow the manual steps below:*

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/openclaw-testing-suite.git
   cd openclaw-testing-suite
   ```

2. Install dependencies:
   ```bash
   npm install
   npx playwright install chromium
   ```

3. Configure Environment:
   ```bash
   cp .env.example .env
   # Add your API keys and credentials to .env
   ```

## 🚀 Usage

### Run All Tests
```bash
npm test
```

### Automation
- **Docker**: Run via `docker build -t openclaw-test .`
- **Scheduled**: Use `node cron.js` to schedule daily runs.

## 📊 Directory Structure
```text
.
├── skills/             # Modular test scripts
├── baseline/           # Reference data for comparisons
├── reports/            # JSON results (auto-generated)
├── Dockerfile          # Containerized setup
└── cron.js             # Automated scheduler
```

## 🤝 Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
