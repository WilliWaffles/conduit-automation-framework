# conduit-automation-framework

![Playwright Tests](https://github.com/WilliWaffles/conduit-automation-framework/actions/workflows/playwright.yml/badge.svg)

A Playwright automation framework built as a professional implementation of QA automation best practices. Targets the [Conduit](https://demo.realworld.show) demo application — a real-world blogging platform.

---

## Why this project exists

Most automation tutorials teach you how to write a test. This project goes further: it demonstrates how to **build a framework** — the structure, patterns, and tooling that make a test suite maintainable and scalable in a real team environment.

---

## Features

- **Page Object Model (POM)** — locators and actions encapsulated per page, decoupled from test logic
- **Custom fixtures** — reusable setup/teardown via Playwright's `test.extend`, with proper isolation between parallel tests
- **Test data factories** — `createUser()` generates unique test data per test invocation, preventing data collisions under parallel execution
- **Explicit wait strategies** — Page Objects handle navigation and element waits internally, keeping tests clean and readable
- **Test tagging** — tests are tagged as `@smoke` and `@regression`, enabling targeted execution of critical paths vs. the full suite
- **HTML reporting** — generates a visual test report locally without auto-opening (`open: 'never'`); failures automatically capture a screenshot for immediate visual diagnosis
- **CI pipeline** — GitHub Actions runs the full suite on every push to `main`, with retries enabled for flaky-prone environments, and the HTML report uploaded as a downloadable artifact

---

## Tech stack

- [TypeScript](https://www.typescriptlang.org/)
- [Playwright](https://playwright.dev/)
- [GitHub Actions](https://docs.github.com/en/actions)

---

## Project structure

```
conduit-automation-framework/
├── fixtures/         # Custom Playwright fixtures
├── pages/            # Page Object classes
├── tests/            # Test specs
├── utils/            # Factories and shared utilities
└── playwright.config.ts
```

---

## Getting started

**Prerequisites:** Node.js LTS

```bash
# Install dependencies
npm ci

# Install Playwright browsers
npx playwright install --with-deps

# Run all tests
npm test

# Run smoke tests only (critical path)
npm run smoke-test

# Run full regression suite
npm run regression-test

# Open the last HTML report
npx playwright show-report
```

---

## CI

The pipeline runs automatically on every push to `main`. Retries are enabled in CI to account for network-level flakiness in the target demo application. The HTML report is available as a downloadable artifact from the [Actions](https://github.com/WilliWaffles/conduit-automation-framework/actions) tab, retained for 30 days.