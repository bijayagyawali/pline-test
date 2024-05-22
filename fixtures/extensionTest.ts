import { BrowserContext, chromium, test as base, Page } from '@playwright/test';
import path from 'path';

export const test = base.extend<{
  context: BrowserContext,
  extensionId: string,
  makePopupVisible: (page: Page) => Promise<void>
}>({
  context: async ({}, use) => {
    const pathToExtension = path.join(__dirname, '../extension');
    const context = await chromium.launchPersistentContext('', {
      headless: false,
      args: [
        process.env.CI ? `--headless=new` : '',
        `--disable-extensions-except=${pathToExtension}`,
        `--load-extension=${pathToExtension}`,
      ],
    });

    await use(context);
    await context.close();
  },
  extensionId: async ({ context }, use) => {
    // for manifest v3:
    let [background] = context.serviceWorkers();
    if (!background) {
      background = await context.waitForEvent('serviceworker');
    }

    const extensionId = background.url().split('/')[2];
    await use(extensionId);
  },
  makePopupVisible: async ({}, use) => {
    const makePopupVisible = async (page: Page) => {
      await page.locator('#project-io--root-popup').evaluate(element => element.style.display = 'block');
      const popupContainer = page.locator('#project-io--root-popup');
      await expect(popupContainer).toBeVisible();
    };
    await use(makePopupVisible);
  }
});

export const expect = test.expect;
