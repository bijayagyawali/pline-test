# Pline Browser Extension Testing

This project is designed to test the Pline browser extension using Playwright. The Pline extension provides free and unlimited data, and our test cases ensure its functionality and performance.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Setup](#setup)
- [Running Tests](#running-tests)
- [GitHub Actions](#github-actions)
- [Writing Tests](#writing-tests)

## Prerequisites

Before setting up the project, ensure you have the following installed:

- Node.js (v20.x or later)
- Yarn (v1.x or later)

## Setup

Follow these steps to set up the project:

1. **Clone the repository:**

   ```bash
   git clone git@github.com:i-ajayd/pline-test.git
   cd pline-test
   ```

2. **Install dependencies:**

   ```bash
   yarn install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the root directory and add any necessary environment variables.

## Running Tests

To run the tests, use the following command:

```bash
yarn playwright test
```

This will execute all test cases defined in the project.

### Running Specific Tests

To run a specific test file, use:

```bash
yarn playwright test path/to/your/testfile.spec.ts
```

### Debugging Tests

To run tests in debug mode, use:

```bash
yarn playwright test --debug
```

## GitHub Actions

This project includes a GitHub Actions workflow to automatically run tests on every pull request. The workflow configuration is in the `.github/workflows` directory.

### GitHub Actions Workflow

The workflow is triggered on pull requests and will run all tests using the configuration defined in the repository.

## Writing Tests

To write new test cases, create a new file in the `tests` directory with the `.test.ts` extension. You can use the existing tests as a reference.

Here is an example of a test file:

```typescript
import { test, expect } from '../fixtures/extensionTest';

test.describe('Load example extension in chrome', () => {
  test('activate the extension and verify its contents', async ({ context, makePopupVisible }) => {
    const page = await context.newPage();
    await page.goto('https://merolagani.com/LatestMarket.aspx');

    await makePopupVisible(page);

    const headerLogo = await page.locator('.header-left svg');
    await expect(headerLogo).toBeVisible();

    const termsOfServiceLink = await page.locator('a[href="https://www.pline.io/tos"]');
    await expect(termsOfServiceLink).toBeVisible();

    const privacyPolicyLink = await page.locator('a[href="https://www.pline.io/privacy-policy"]');
    await expect(privacyPolicyLink).toBeVisible();

    const agreeButton = await page.locator('button:has-text("Agree & Use Pline")');
    await expect(agreeButton).toBeVisible();

    await page.waitForTimeout(3000);
  });
});
```

## Conclusion

This project is set up to test the Pline browser extension efficiently. Follow the instructions to set up the environment, run the tests, and contribute by writing new test cases. If you encounter any issues, please refer to the documentation or raise an issue in the repository. Happy testing!
