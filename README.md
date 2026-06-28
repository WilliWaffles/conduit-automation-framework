# conduit-automation-framework

![Playwright Tests](https://github.com/WilliWaffles/conduit-automation-framework/actions/workflows/playwright.yml/badge.svg)

A Playwright automation framework built as a professional implementation of QA automation best practices. Targets the [Conduit](https://demo.realworld.show) demo application — a real-world blogging platform.

---

## Why this project exists

Most automation tutorials teach you how to write a test. This project goes further: it demonstrates how to **build a framework** — the structure, patterns, and tooling that make a test suite maintainable and scalable in a real team environment.

---

## Features

- **Page Object Model (POM)** — locators and actions encapsulated per page, decoupled from test logic
- **Custom fixtures** — reusable setup/teardown via Playwright's `test.extend`, with proper isolation between parallel tests; separate fixtures for UI and API layers
- **Test data factories** — `createUser()` generates unique test data per test invocation, preventing data collisions under parallel execution
- **API testing** — contract tests and negative tests for REST endpoints using Playwright's `request` fixture, covering status codes, response structure, and validation
- **Explicit wait strategies** — Page Objects handle navigation and element waits internally, keeping tests clean and readable
- **Test tagging** — tests are tagged as `@smoke` and `@regression`, enabling targeted execution of critical paths vs. the full suite
- **HTML reporting** — generates a visual test report locally without auto-opening (`open: 'never'`); failures automatically capture a screenshot for immediate visual diagnosis
- **CI pipeline** — GitHub Actions runs UI and API tests in separate jobs on every push to `main`, with the HTML report uploaded as a downloadable artifact for each layer

---

## Tech stack

- [TypeScript](https://www.typescriptlang.org/)
- [Playwright](https://playwright.dev/)
- [GitHub Actions](https://docs.github.com/en/actions)

---

## Project structure

```
conduit-automation-framework/
├── fixtures/
│   ├── auth.fixtures.ts    # UI fixtures (registered user via browser)
│   └── api.fixtures.ts     # API fixtures (registered user via HTTP)
├── pages/                  # Page Object classes
├── tests/
│   ├── ui/                 # End-to-end UI tests
│   └── api/                # API contract and validation tests
├── utils/                  # Factories and shared utilities
└── playwright.config.ts
```

---

## Getting started

**Prerequisites:** Node.js LTS

```bash
# Install dependencies
npm ci

# Install Playwright browsers (required for UI tests only)
npx playwright install --with-deps

# Run all tests
npm test

# Run UI tests only
npm run test:ui

# Run API tests only
npm run test:api

# Run smoke tests only (critical path)
npm run smoke-test

# Run full regression suite
npm run regression-test

# Open the last HTML report
npx playwright show-report
```

---

## CI

The pipeline runs automatically on every push to `main` with two independent jobs:

- **ui-tests** — installs browsers and runs the full E2E suite against the Conduit web app
- **api-tests** — runs the API test suite without browser installation, targeting the Conduit REST API directly

Each job uploads its own HTML report as a downloadable artifact from the [Actions](https://github.com/WilliWaffles/conduit-automation-framework/actions) tab, retained for 30 days.