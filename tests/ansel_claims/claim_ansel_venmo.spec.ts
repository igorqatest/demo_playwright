import { test, expect } from '@playwright/test';
import { config } from '../reusable';

test('Venmo Claim', async ({ page }) => {
    test.setTimeout(120_000);
  console.log('✅ Navigating to Member Portal...');
  await page.goto(config.urlMemberAnsel, { waitUntil: 'domcontentloaded' });

  console.log('✅ Filling in Login form...');
  const emailInput = page.getByRole('textbox', { name: 'Enter your email' });
  await emailInput.type(config.userMemberAnsel, { delay: 10 });

  const passwordInput = page.locator('input[name="password"]');
  await passwordInput.type(config.passwordMemberAnsel, { delay: 10 });

  await page.getByRole('button', { name: 'Sign in' }).click();

  console.log('✅ Waiting for Dashboard to load...');
  await page.waitForTimeout(15000); // Adjust the timeout as needed

  await page.getByRole('button', { name: 'File new claim' }).click();
  await page.getByRole('button', { name: 'Next step' }).click();

  await page.locator('textarea[name="symptoms"]').fill('test');
  await page.locator('textarea[name="providerDiagnosis"]').fill('test');
  await page.locator('textarea[name="treatment"]').fill('test');
  await page.locator('textarea[name="additionalInfo"]').fill('test');
  await page.waitForTimeout(1000);
  await page.getByRole('button', { name: 'Next step' }).click();


  await page.getByText('Emergency room').click();
  for (let i = 0; i < 10; i++) {
    await page.mouse.wheel(0, 200);
    await page.waitForTimeout(100);
  }
// 1. Type into the hospital field
await page.locator('input.prompt').fill('Hospital');

// 2. Wait for the suggestions to appear
await page.waitForSelector('.results.visible .result');

// 3. Click the first suggestion
await page.locator('.results.visible .result').first().click();

console.log('✅ Successfully clicked the first hospital!');
//Tell us where you were treated
await page.getByRole('button', { name: 'Next step' }).click();
//Let´s prepare your documents
await page.getByRole('button', { name: 'Next step' }).click();
// Upload your pictures
await page.getByRole('button', { name: 'Next step' }).click();
// Confirm uploads
await page.getByRole('button', { name: 'Next step' }).click();
// Payment preference
await page.getByRole('button', { name: '+Add payment method' }).click();
await page.getByRole('row', { name: 'Venmo payout method Configure' }).getByRole('button').click();
await page.locator('input[name="cellNumber"]').fill('4084281427');
await page.locator('input[name="confirmCellNumber"]').fill('4084281427');
await page.getByRole('button', { name: 'Submit' }).click();



await page.waitForTimeout(4000);
await page.getByRole('button', { name: 'Next step' }).click();

for (let i = 0; i < 10; i++) {
    await page.mouse.wheel(0, 400);
    await page.waitForTimeout(100);
  }
 await page.locator('label').first().click();
 await page.getByRole('button', { name: 'Submit' }).click();

// Wait page to settle
await page.waitForLoadState('networkidle');
console.log('✅ Page reloaded or settled');

// Freshly find the "All done" button
await page.getByRole('button', { name: 'All done' }).click();
console.log('✅ Successfully clicked "All done" button'); 

});