import { test, expect } from '@playwright/test';
import { config } from '../reusable';

test('My first test', async ({ page }) => {
    test.setTimeout(120_000);
  console.log('✅ Navigating to Member Portal...');
  await page.goto(config.urlMemberNationwide, { waitUntil: 'domcontentloaded' });

  console.log('✅ Filling in Login form...');
  const emailInput = page.getByRole('textbox', { name: 'Enter your email' });
  await emailInput.type(config.userMemberNationwide, { delay: 10 });

  const passwordInput = page.locator('input[name="password"]');
  await passwordInput.type(config.passwordMemberNationwide, { delay: 10 });

  await page.getByRole('button', { name: 'Sign in' }).click();

  console.log('✅ Waiting for Dashboard to load...');
  await page.waitForTimeout(15000); // Adjust the timeout as needed

   // 1. Click "File new claim"
await page.getByRole('button', { name: 'File new claim' }).click();
console.log('✅ Clicked "File new claim"');

// 2. Wait until the dropdown menu with options becomes visible
const dropdownMenu = page.locator('div.menu.transition.visible');
//await dropdownMenu.waitFor({ state: 'visible' });
console.log('✅ Dropdown menu is now visible');

// 3. Locate the option containing "Primary"
const primaryOption = dropdownMenu.getByRole('option', { name: /Primary/i });

// 4. Wait for the option to be visible
//await expect(primaryOption).toBeVisible();
console.log('✅ Primary member option is visible');

// 5. Click on the "Primary" option
//await primaryOption.click();
//console.log('✅ Successfully clicked "Primary" member');


  await page.getByRole('button', { name: 'Next step' }).click();

  await page.locator('textarea[name="symptoms"]').fill('test');
  await page.locator('textarea[name="providerDiagnosis"]').fill('test');
  await page.locator('textarea[name="treatment"]').fill('test');
  await page.locator('textarea[name="additionalInfo"]').fill('test');
  await page.waitForTimeout(1200);
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
await page.getByRole('button', { name: 'Configure' }).nth(1).click();
await page.locator('input[name="username"]').fill('igor.pejin+anselquotetest@joinansel.com');
await page.locator('input[name="confirmUsername"]').fill('igor.pejin+anselquotetest@joinansel.com');
await page.getByRole('button', { name: 'Submit' }).click();
await page.waitForTimeout(4000);
await page.getByRole('button', { name: 'Next step' }).click();

for (let i = 0; i < 10; i++) {
    await page.mouse.wheel(0, 400);
    await page.waitForTimeout(100);
  }
 await page.locator('label').first().click();

 // Click Submit
await page.getByRole('button', { name: 'Submit' }).click();
console.log('✅ Clicked Submit button');

// Freshly find the "All done" button
await page.getByRole('button', { name: 'All done' }).click();
console.log('✅ Successfully clicked "All done" button');
 
});