import { test, expect } from '@playwright/test';
import path from 'path';

test('should greet user on button click', async ({ page }) => {
  const filePath = path.resolve(__dirname, 'index_test.html');
  const fileUrl = `file://${filePath}`;

  await page.goto(fileUrl);
  await page.locator('#nameInput').fill('John');
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.locator('#output')).toHaveText('Welcome, John!');
});