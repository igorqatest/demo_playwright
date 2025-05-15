import { test, expect } from '@playwright/test';

test('📄 Extract all visible fields from Roster Member page (multi-section)', async ({ page }) => {
  console.log('🌐 Navigating to account...');
  await page.goto('https://brella--qa.sandbox.lightning.force.com/lightning/r/Account/001QL00000byTTUYA2/view');

  console.log('🔐 Logging into Salesforce...');
  await page.getByRole('textbox', { name: 'Username' }).fill('qa@joinansel.com.qa');
  await page.getByRole('textbox', { name: 'Password' }).fill('q8xPmBoudN1W');
  await page.getByRole('button', { name: 'Log In to Sandbox' }).click();

  console.log('⏳ Waiting for page content...');
  await page.waitForSelector('.test-id__field-label');
  await page.waitForTimeout(3000);

  // 🔄 Scroll to bottom slowly to force lazy-loaded fields
 
 for ( let i= 0; i< 10; i++) {
  await page.mouse.wheel(0,300);
 }
  const labels = await page.locator('.test-id__field-label').all();

 if (labels.length === 0) {
  console.log('⚠️ No field labels found on the page.');
  return;
 }

     console.log(`\n🔍 Found ${labels.length} fields. Extracting values...\n`);

  for (const label of labels) {
    try {
      const labelText = (await label.textContent())?.trim() || '[No Label]';

      const container = label.locator('xpath=../../..'); // Go to field container
      const valueLocator = container.locator('.test-id__field-value');

      let valueText = '[No Value]';
      if (await valueLocator.count()) {
        valueText = (await valueLocator.first().textContent())?.trim() || '[No Value]';
      }

      console.log(`📄 ${labelText}: ${valueText}`);
    } catch (err) {
      console.error('❌ Failed extracting field:', err);
    }
  }

  console.log('\n✅ Extraction complete!');
});