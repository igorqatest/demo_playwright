import { test, expect } from '@playwright/test';
import { te } from 'date-fns/locale';

test('Shopping only Primary', async ({ page, context }) => {
  test.setTimeout(120_000);
  console.log('🚀 Starting test...');

  await page.goto('https://brella--qa.sandbox.lightning.force.com/lightning/r/Contract/800QL00000JoabdYAB/view');
  await page.getByRole('textbox', { name: 'Username' }).fill('qa@joinansel.com.qa');
  await page.getByRole('textbox', { name: 'Password' }).fill('q8xPmBoudN1W');
  await page.getByRole('button', { name: 'Log In to Sandbox' }).click();
  console.log('✅ Logged into Salesforce');

  await page.getByRole('tab', { name: 'Related' }).click();
  console.log('📂 Opened Related tab');

  for (let i = 0; i < 10; i++) await page.mouse.wheel(0, 60);

  const csLink = page.getByRole('link', { name: /^CS-/ });
  await page.waitForTimeout(2000);
  await csLink.click();
  console.log('🔗 Clicked CS- link');

  await page.waitForTimeout(1000);
  await page.getByRole('tab', { name: 'Related' }).click();
  await page.waitForTimeout(1000);
// Wait until the link is visible and stable before clicking
 await page.getByRole('link', { name: 'Prospectives (6+)' }).click();

  const firstNameLink = page.locator('a.slds-truncate >> visible=true').first();
  await firstNameLink.click({ force: true });
  console.log('✅ Opened first prospective record');

  await page.waitForTimeout(1000);
  await page.getByRole('tab', { name: 'Details' }).click();
  for (let i = 0; i < 10; i++) await page.mouse.wheel(0, 100);

  // Extract SSN
  const ssnElement = page.locator('lightning-formatted-text').filter({ hasText: /^\d{3}-\d{2}-\d{4}$/ }).first();
  const ssn = await ssnElement.innerText();
  console.log(`🔐 Extracted SSN: ${ssn}`);

  // Extract and format DOB
  const dobElement = page.locator('lightning-formatted-text')
    .locator('xpath=../../..')
    .filter({ hasText: 'Date of Birth' })
    .locator('lightning-formatted-text');

  const dobRaw = await dobElement.innerText();
  let [month, day, year] = dobRaw.split('/');
  month = month.padStart(2, '0');
  day = day.padStart(2, '0');
  const dob = `${month}/${day}/${year}`;
  console.log(`🎂 Extracted and formatted DOB: ${dob}`);

  // Click Get The Link
  await page.getByRole('button', { name: 'Get The Link' }).click();
  console.log('🎯 Clicked "Get The Link"');

  const validTextarea = page.locator('textarea').filter({ hasText: /^https:\/\/.+/ }).first();
  await expect(validTextarea).toBeVisible({ timeout: 10000 });

  const shoppingLink = await validTextarea.inputValue();
  console.log(`🔗 Extracted shopping link`);

  // Open in a new tab (ensures fresh state and skips remembering old flow)
  const newPage = await context.newPage();
  await newPage.goto(shoppingLink, { waitUntil: 'domcontentloaded' });
  console.log('🆕 Navigated to shopping link in new tab');

  // Proceed with verify step
  await newPage.getByRole('button', { name: 'Next step' }).click();
  console.log('🔐 Verification started');
  await newPage.getByRole('textbox', { name: 'MM/DD/YYYY' }).fill(dob);
  await newPage.getByRole('textbox', { name: 'XXX-XX-XXXX' }).fill(ssn);
  await newPage.getByRole('button', { name: 'Next step' }).click();
  console.log('🔓 Verification passed');

  await newPage.getByRole('button', { name: 'Next step' }).click();

  // ✅ Ensure fresh continuation from the correct start page

   // Select "No" for married, and "I'm not a parent"
   await newPage.getByText('No', { exact: true }).click();
  for (let i = 0; i < 10; i++) await page.mouse.wheel(0, 60);

  await newPage.getByText('I\'m not a parent').click();
  await newPage.getByRole('button', { name: 'Next step' }).click();
  console.log('👪 Household questions');

  // ⏭ Continue steps
  for (let i = 1; i <= 8; i++) {
    await newPage.getByRole('button', { name: 'Next step' }).click();
    console.log(`➡️ Page ${i + 2} complete`);
  }

  await newPage.getByRole('link', { name: 'Skip this' }).click();
  console.log('🏃 Skipped optional promo');

  await newPage.getByRole('button', { name: 'Next step' }).click();
  await newPage.getByRole('button', { name: 'Next step' }).click();

  await newPage.waitForTimeout(1000);
  await newPage.getByRole('listbox').filter({ hasText: 'FemaleMale' }).click();
// Generate a random 10-digit phone number
const randomPhone = `9${Math.floor(100000000 + Math.random() * 900000000)}`;

await newPage.getByRole('textbox', { name: '(XXX) XXX-XXXX' }).fill(randomPhone);
console.log(`📱 Filled random phone number: ${randomPhone}`);  

await newPage.getByRole('listbox').filter({ hasText: 'MobileStandard' }).click();
  await newPage.locator('input[name="SET_STREET_ADDRESS"]').fill('123 Main St');
  await newPage.locator('input[name="SET_ZIP_CODE"]').fill('12345');
  await newPage.locator('input[name="SET_CITY"]').fill('Random City');
  await newPage.getByRole('button', { name: 'Next step' }).click();
  console.log('📬 Contact info filled');

  await newPage.locator('input[name="password"]').fill('Demo123456');
  await newPage.locator('input[name="confirmPassword"]').fill('Demo123456');
  await newPage.evaluate(() => {
    const cb = document.querySelector('input[name="agreeToTerms"]');
    if (cb) cb.removeAttribute('readonly');
    (cb as HTMLInputElement)?.click();
  });


  // Done!
  console.log('✅ Flow completed to this point.'); 
  for (let i = 0; i < 10; i++) await page.mouse.wheel(0, 200);
  await newPage.getByRole('button', { name: 'Submit' }).click();
  console.log('🔐 Final step complete');

});