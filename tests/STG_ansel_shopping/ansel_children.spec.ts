import { test, expect } from '@playwright/test';
import { te } from 'date-fns/locale';

test('Shopping only Children', async ({ page, context }) => {
  test.setTimeout(120_000);
  console.log('🚀 Starting test...');

  await page.goto('https://brella--staging.sandbox.lightning.force.com/lightning/r/Contract/800U700000FDTgHIAX/view?ws=%2Flightning%2Fr%2FQuote%2F0Q0U70000028aRlKAI%2Fview');
  await page.getByRole('textbox', { name: 'Username' }).fill('qa@joinansel.com.staging');
  await page.getByRole('textbox', { name: 'Password' }).fill('8ub4kaLqooPM');
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
await page.getByRole('link', { name: /^Prospectives/ }).click();
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
   await newPage.getByText('Yes', { exact: true }).click();
  for (let i = 0; i < 10; i++) await page.mouse.wheel(0, 60);

  await newPage.getByText('Yes, my youngest child is over 18 years old').click();
  await newPage.getByRole('button', { name: 'Next step' }).click();
  console.log('👪 Household questions');

  // ⏭ Continue steps
  for (let i = 1; i <= 8; i++) {
    await newPage.getByRole('button', { name: 'Next step' }).click();
    console.log(`➡️ Page ${i + 2} complete`);
  }
   // Let's talk about medical expenses
  await newPage.getByText('Yes').click();
  await newPage.getByText('I typically pay the full cost').click();
  await newPage.getByRole('button', { name: 'Next step' }).click();
  console.log('💰 Medical expenses questions');

  // We'll keep your budget in mind
  await newPage.getByText('I can purchase what I want').click();
    await newPage.getByRole('button', { name: 'Next step' }).click();
    console.log('✅ Purchasing what I want');


await newPage.getByText('My child(ren) and me').click();

console.log('✅ Select ansel benefits');
await newPage.waitForTimeout(1000);


  await newPage.getByRole('button', { name: 'Next step' }).click();
  await newPage.waitForTimeout(1000);

  await newPage.getByRole('button', { name: 'Next step' }).click();

  
  for (let i = 0; i < 10; i++) {
    await page.mouse.wheel(0, 400);
    await page.waitForTimeout(100);
  }
  await newPage.waitForTimeout(2000);
  await newPage.getByRole('listbox').filter({ hasText: 'FemaleMale' }).click();

  await newPage.waitForTimeout(1000);

// Generate a random 9-digit phone number
const random9Digits = Math.floor(100000000 + Math.random() * 900000000);

// Format it properly like (XXX) XXX-XXXX
const formattedPhone = `(${String(random9Digits).slice(0, 3)}) ${String(random9Digits).slice(3, 6)}-${String(random9Digits).slice(6)}`;

await newPage.getByRole('textbox', { name: '(XXX) XXX-XXXX' }).type(formattedPhone, { delay: 100 });
console.log(`📱 Filled formatted phone number: ${formattedPhone}`);  
await newPage.waitForTimeout(1000);

await newPage.getByRole('listbox').filter({ hasText: 'MobileStandard' }).click();
  await newPage.locator('input[name="SET_STREET_ADDRESS"]').fill('123 Main St');
  await newPage.waitForTimeout(1000);

  await newPage.locator('input[name="SET_ZIP_CODE"]').fill('12345');
  await newPage.locator('input[name="SET_CITY"]').fill('Random City');




// SSN
function generateRandomSSN() {
  const part1 = Math.floor(100 + Math.random() * 400);
  const part2 = Math.floor(10 + Math.random() * 90);
  const part3 = Math.floor(1000 + Math.random() * 9000);
  return `${part1}-${part2}-${part3}`;
}



// Scroll down
for (let i = 0; i < 10; i++) {
  await page.mouse.wheel(0, 400);
  await page.waitForTimeout(100);
}

// ------------- CHILD (Mark) ---------------
await newPage.getByRole('button', { name: '+ Add dependent' }).click();
await newPage.waitForTimeout(500);

await newPage.getByRole('listbox').filter({ hasText: 'Child' }).click();
await newPage.getByRole('option', { name: 'Child' }).click();
await newPage.waitForTimeout(500);

await newPage.locator('input[name="firstName"]').fill('Mark');
await newPage.locator('input[name="lastName"]').fill('Smith');


/* // DOB
await newPage.locator('input[name="birthdate"]').fill('01/01/2004');

// SSN for Mark
const randomSSN1 = generateRandomSSN();
await newPage.getByRole('textbox', { name: 'XXX-XX-XXXX' }).fill(randomSSN1);
console.log(`✅ SSN for Mark: ${randomSSN1}`);

// Open gender dropdown
await newPage.getByRole('listbox').filter({ hasText: /^FemaleMale$/ }).click();



// Now click the first available option (Female or Male)
await newPage.locator('.visible.menu.transition div[role="option"]').first().click({ force: true });
console.log('✅ Successfully selected the first gender option');
await newPage.getByRole('button', { name: 'Save' }).click(); */


// ------------- CHILD (Mark) ---------------
await newPage.getByRole('button', { name: '+ Add dependent' }).click();
await newPage.waitForTimeout(500);

await newPage.getByRole('listbox').filter({ hasText: 'SpouseChildDomestic' }).click({ force: true });
await newPage.getByRole('option', { name: 'Child' }).click();
await newPage.waitForTimeout(500);

await newPage.locator('input[name="firstName"]').fill('Dave');
await newPage.locator('input[name="lastName"]').fill('Jones');


// DOB
await newPage.locator('input[name="birthdate"]').fill('01/01/2002');

// SSN for Mark
const randomSSN2 = generateRandomSSN();
await newPage.getByRole('textbox', { name: 'XXX-XX-XXXX' }).fill(randomSSN2);
console.log(`✅ SSN for Mark: ${randomSSN2}`);

// Open gender dropdown
await newPage.getByRole('listbox').filter({ hasText: /^FemaleMale$/ }).click();



// Now click the first available option (Female or Male)
await newPage.locator('.visible.menu.transition div[role="option"]').first().click({ force: true });
console.log('✅ Successfully selected the first gender option');
await newPage.getByRole('button', { name: 'Save' }).click();


// Save dependent
await newPage.getByRole('button', { name: 'Next step' }).click();
console.log('📬 Contact info filled');



// PASSWORDS
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
  //await newPage.getByRole('button', { name: 'Submit' }).click();
  console.log(' Final step complete, Shopping Finished');

});