import { test, expect } from '../fixtures/extensionTest';

test.describe('Test Pline Browser Extenstion', () => {
  test('activate the extension and verify its contents', async ({ context, makePopupVisible }) => {
    // Use the context to open a new page
    const page = await context.newPage();
    await page.goto('https://merolagani.com/LatestMarket.aspx');

    // Make the popup visible using the helper function
    // await makePopupVisible(page);

    // Verify specific elements within the popup
    const headerLogo = await page.locator('.header-left svg');
    await expect(headerLogo).toBeVisible();

    const termsOfServiceLink = await page.locator('a[href="https://www.pline.io/tos"]');
    await expect(termsOfServiceLink).toBeVisible();

    const privacyPolicyLink = await page.locator('a[href="https://www.pline.io/privacy-policy"]');
    await expect(privacyPolicyLink).toBeVisible();

    const agreeButton = await page.locator('button:has-text("Agree & Use Pline")');
    await expect(agreeButton).toBeVisible();

    // Keep the page open for 3s to show extension works
    await page.waitForTimeout(3000);
  });

  test('Terms of Service link should navigate to the correct page', async ({ context, makePopupVisible }) => {
    const page = await context.newPage();
    await page.goto('https://merolagani.com/LatestMarket.aspx');

    // Wait for the Privacy Policy link to be visible
    const tosLink = await page.waitForSelector('a[href="https://www.pline.io/tos"]');

    // Clicking the Privacy Policy link
    const [newPage] = await Promise.all([
      context.waitForEvent('page'),
      tosLink.click({ button: 'middle' }), // Open link in a new tab
    ]);

    // Switch to the new page context
    await newPage.waitForLoadState('domcontentloaded');

    // Verify if the page navigated correctly
    const currentUrl = newPage.url();
    await expect(currentUrl).toBe('https://www.pline.io/tos/');
  });

  test('Privacy Policy link should navigate to the correct page', async ({ context }) => {
    const page = await context.newPage();
    await page.goto('https://merolagani.com/LatestMarket.aspx');
    
    // Wait for the Privacy Policy link to be visible
    const privacyPolicyLink = await page.waitForSelector('a[href="https://www.pline.io/privacy-policy"]');
    
    // Clicking the Privacy Policy link
    const [newPage] = await Promise.all([
      context.waitForEvent('page'),
      privacyPolicyLink.click({ button: 'middle' }), // Open link in a new tab
    ]);
    
    // Switch to the new page context
    await newPage.waitForLoadState('domcontentloaded');
    
    // Verify if the page navigated correctly
    const currentUrl = newPage.url();
    await expect(currentUrl).toBe('https://www.pline.io/privacy-policy/');
  });
});

test('Privacy Policy link should navigate to the correct page', async ({ context }) => {
  const page = await context.newPage();
  await page.goto('https://merolagani.com/LatestMarket.aspx');

  const agreeButton = await page.locator('button:has-text("Agree & Use Pline")');
  await expect(agreeButton).toBeVisible();

  // Interact with the extension's UI
  await agreeButton.click();

  // Verify data capture container exist
  const dataCapture = await page.locator('.project-io__types-data-capture');
  await expect(dataCapture).toBeVisible();

  // Verify Sign Button exist
  const signInHeader = await page.locator('button:has-text("Sign in")');
  await expect(signInHeader).toBeVisible();

  // Keep the page open for 3s to show extension works
  await page.waitForTimeout(3000);
});


test ('Automated Data Extraction button should navigate to the correct page', async ({ context }) => {
  const page = await context.newPage();
  await page.goto('https://merolagani.com/LatestMarket.aspx');

  const agreeButton = await page.locator('button:has-text("Agree & Use Pline")');
  await expect(agreeButton).toBeVisible();

  // Interact with the extension's UI
  await agreeButton.click();

  // Locate the parent div that contains both "Automated Data Extraction" and the button with "Get started"
  const aAndEparentDiv = await page.locator('.project-io__container-item.data-captures')
    .filter({
      has: page.locator('.data-capture-type-wrapper .data-capture-type:has-text("Automated Data Extraction")')
    });

  // Locate the button within that parent div
  const aAndEGetStartedButton = await aAndEparentDiv.locator('button.ant-btn.project-io__button-third:has-text("Get started")');

  // Assert the button is visible and then click it
  await expect(aAndEGetStartedButton).toBeVisible();
  await aAndEGetStartedButton.click();

  // Keep the page open for 3s to show extension works
  await page.waitForTimeout(3000);
});


test ('Browse And Capture button should navigate to the correct page', async ({ context }) => {

  const page = await context.newPage();
  await page.goto('https://merolagani.com/LatestMarket.aspx');

  const agreeButton = await page.locator('button:has-text("Agree & Use Pline")');
  await expect(agreeButton).toBeVisible();

  // Interact with the extension's UI
  await agreeButton.click();

  // Locate the parent div that contains both "Automated Data Extraction" and the button with "Get started"
  const bAndCParentDiv = await page.locator('.project-io__container-item.data-captures')
  .filter({
    has: page.locator('.data-capture-type-wrapper .data-capture-type:has-text("Automated Data Extraction")')
  });

  // Locate the button within that parent div
  const bAndCGetStartedButton = await bAndCParentDiv.locator('button.ant-btn.project-io__button-third:has-text("Get started")');

  // Assert the button is visible and then click it
  await expect(bAndCGetStartedButton).toBeVisible();
  await bAndCGetStartedButton.click();

  // Keep the page open for 3s to show extension works
  await page.waitForTimeout(3000);

  // Locate the button with the specified class and text
  const buildWorkflowButton = await page.locator('button.ant-btn-primary:has-text("Build workflow")');

  // Assert the button is visible
  await expect(buildWorkflowButton).toBeVisible();
  await buildWorkflowButton.click();
  
  // Keep the page open for 3s to show extension works
  await page.waitForTimeout(3000);
});