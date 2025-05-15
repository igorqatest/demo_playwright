/*  import {test, expect} from '@playwright/test';
import {config} from './reusable.ts';
import { fa } from '@faker-js/faker';

test('My first test', async ({ page }) => {
    await page.goto(config.urlMemberAnsel, { waitUntil: 'domcontentloaded' });
    
    const emailInput = page.getByRole('textbox', { name: 'Enter your email' });
  
    // 👉 Now safely type with a delay
    await emailInput.type(config.userMemberAnsel, { delay: 10 });
    const passwordInput = page.locator('input[name="password"]');
    await passwordInput.type(config.passwordMemberAnsel, { delay: 10 });
    await page.getByRole('button', { name: 'Sign in' }).click();
    // ✅ Check the page title
  await expect(page).toHaveTitle(/Member Portal/);
  await page.waitForTimeout(15000);
  // ✅ Check important text exists
  await expect(page.getByRole('heading', { name: 'Coverage' })).toBeVisible();

  //await expect(page.getByText('Note: This is a summary of')).toBeVisible();
  await expect(
    page.getByText('Note: This is a summary of', { exact: false })
  ).toHaveText(
    "Note: This is a summary of the important features of your coverage. This is not the insurance contract. Please refer to your certificate below for all details including the rights and obligations of both you and Ansel."
  );
  // --- Header ---
  await expect(page.getByRole('link', { name: 'Coverage' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Claims' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'My info' })).toBeVisible();

  await expect(page.getByRole('heading', { name: 'Coverage' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Family info' })).toBeVisible();

  await expect(page.getByRole('heading', { name: 'Costs' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Policy document(s)' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Benefit limits' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Limitations and exclusions' })).toBeVisible();

  await expect(page.getByText('A complete description of', { exact: false })).toContainText('A complete description of benefits, limitations, and exclusions will be provided in your certificate of Insurance and applicable Riders. All coverage is subject to the terms and conditions of the master group policy. We’ve provided a summary below.');
  // --- User Name ---
  await expect(page.getByText('Andres Fatima').nth(1)).toBeVisible();
  // --- Effective Date ---
  await expect(page.getByText('Effective 01/01/2025')).toBeVisible();

await expect(page.locator('a').filter({ hasText: /^Summary$/ })).toHaveText('Summary');
await expect(page.locator('a').filter({ hasText: 'Coverage timeline' })).toHaveText('Coverage timeline');


  // --- Buttons ---
  await expect(page.getByRole('button', { name: 'File new claim' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Condition lookup' })).toBeVisible();

  // --- Coverage values ---
  await expect(page.getByText('$200')).toBeVisible();
  await expect(page.getByText('$500')).toBeVisible();
  await expect(page.getByText('$1,000')).toBeVisible();

  // --- Policy Document (Coverage Packet PDF) ---
  await expect(page.getByText('Coverage packet')).toBeVisible();

  // --- Family Info ---
  await expect(page.getByText('Myself')).toBeVisible();
  await expect(page.getByText('Covered', { exact: true })).toBeVisible();
  await expect(page.getByRole('alert').filter({ hasText: 'Andres Fatima' })).toBeVisible();

  // --- Footer Text ---
  await expect(page.getByText(/©2025 Ansel Health, Inc. All Rights Reserved./, { exact: true })).toBeVisible();

  // --- Benefit Limits Section ---
  await expect(page.getByText('Benefit limits')).toBeVisible();

  await expect(page.getByText('Benefits are paid if the', { exact: false })).toContainText(
'Benefits are paid if the insured is diagnosed with a covered condition. Members may receive a benefit more than once as noted below.'
  );
  await expect(page.locator('span').filter({ hasText: 'Moderate' })).toBeVisible();
  await expect(page.locator('span').filter({ hasText: 'Severe' })).toBeVisible();


  await expect(page.locator('span').filter({ hasText: 'Catastrophic' })).toBeVisible();

  // --- Limitations and Exclusions Section ---
  await expect(page.getByText('Limitations and exclusions')).toBeVisible();
  await expect(
    page.getByText('A complete description of', { exact: false })).toHaveText(
    'A complete description of benefits, limitations, and exclusions will be provided in your certificate of Insurance and applicable Riders. All coverage is subject to the terms and conditions of the master group policy. We’ve provided a summary below.'
  );

  await expect(page.getByText('Exclusions', { exact: true })).toBeVisible();
  await expect(page.getByText('We will not pay benefits for any condition that is contributed to, caused by,', { exact: false }))
  .toContainText('We will not pay benefits for any condition that is contributed to, caused by, or resulting from:');
  
  await expect(page.getByText('commission of or attempt to', { exact: false }))
  .toContainText('commission of or attempt to commit a felony, or voluntary participation in a riot or insurrection;')
  
  await expect(page.getByText('incarceration or imprisonment', { exact: false })).toContainText('incarceration or imprisonment following conviction for a crime;');
  await expect(page.getByText('seeking non-emergency', { exact: false })).toContainText('seeking non-emergency treatment during travel or activity outside the United States, Mexico, or Canada, unless the Insured receives confirmation of the diagnosis in the United States, Mexico, or Canada;');

  await expect(page.getByText('active duty service or', { exact: false })).toContainText('active duty service or training in the military (naval force, air force or National Guard/Reserves or equivalent) for service/training extending beyond 180 days of any state, country or international organization, unless specifically allowed by a provision of this Certificate;');
  await expect(page.getByText('involvement in any declared', { exact: false })).toContainText('involvement in any declared or undeclared war or act of war (not including acts of terrorism), while serving in the military or an auxiliary unit attached to the military, or working in an area of war whether voluntarily or as required by an employer;');
  await expect(page.getByText('a member of the Insured’s', { exact: false })).toContainText('a member of the Insured’s Immediate Family;');
  
  await expect(page.getByText('In addition, We will not pay', { exact: false })).toContainText('In addition, We will not pay benefits for any of the following:');
  await expect(page.getByText('a Chronic Condition;', { exact: true })).toContainText('a Chronic Condition;');
  await expect(page.getByText('a Mental Illness;', { exact: true })).toContainText('a Mental Illness;');
  await expect(page.getByText('a Maternity Condition;', { exact: true })).toContainText('a Maternity Condition;');
  await expect(page.getByText('“Not Covered” conditions as', { exact: false })).toContainText('“Not Covered” conditions as designated in the Conditions List.');


  await expect(page.getByText('Waiting periods', { exact: true })).toBeVisible();
  await expect(page.getByText('Waiting periodsIf you enroll', { exact: false })).toContainText('If you enroll or add a family member outside of an open enrollment period (annual, new hire, or other qualifying life event), your benefits or any increases are subject to a60 day waiting period. Any diagnoses that occur during the waiting period will not be covered.');
  await expect(page.getByText('Renewability, cancellation, & termination', { exact: true })).toBeVisible();

  await expect(page.getByText('Renewability, cancellation, & terminationThis coverage is offered under a group', { exact: false })).toContainText('This coverage is offered under a group policy, and is annually renewable. Your continued coverage depends on whether your employer renews the group policy. If your employer does not renew the policy, coverage ends for all employees. You may be eligible to continue, or “port”, your coverage if you leave your employer or if your employer discontinues the group policy. If your employer renews the policy, you will have the option to continue your coverage. Premiums may change on the policy anniversary and your employer’s contribution to policy premiums may also change. You may choose to terminate coverage before the next policy anniversary by letting your employer know your choice in writing.');

  // --- Call to Support ---
  //await expect(page.getByText('(888) 300-5382', { exact: true })).toBeVisible();

  // --- Check a Button Background Color (optional) ---
  const newClaimBtn = page.getByRole('button', { name: 'File new claim' });
  const backgroundColor = await newClaimBtn.evaluate((el) => {
    return window.getComputedStyle(el).backgroundColor;
  });
  console.log('File New Claim Button color:', backgroundColor);
  // You can validate color if needed, e.g.
  // expect(backgroundColor).toBe('rgb(33, 133, 208)');
}); 

 */

import { test, expect } from '@playwright/test';
import { config } from './reusable.ts';

test('My first test', async ({ page }) => {
  console.log('✅ Navigating to Member Portal...');
  await page.goto(config.urlMemberAnsel, { waitUntil: 'domcontentloaded' });

  console.log('✅ Filling in Login form...');
  const emailInput = page.getByRole('textbox', { name: 'Enter your email' });
  await emailInput.type(config.userMemberAnsel, { delay: 10 });

  const passwordInput = page.locator('input[name="password"]');
  await passwordInput.type(config.passwordMemberAnsel, { delay: 10 });

  await page.getByRole('button', { name: 'Sign in' }).click();

  console.log('✅ Waiting for Dashboard to load...');
  await expect(page).toHaveTitle(/Member Portal/);
  await page.waitForTimeout(15000);

  console.log('✅ Checking main headings and navigation...');
  await expect(page.getByRole('heading', { name: 'Coverage' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Coverage' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Claims' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'My info' })).toBeVisible();

  console.log('✅ Verifying Coverage Summary section...');
  await expect(page.getByText('Note: This is a summary of', { exact: false }))
    .toHaveText("Note: This is a summary of the important features of your coverage. This is not the insurance contract. Please refer to your certificate below for all details including the rights and obligations of both you and Ansel.");

  console.log('✅ Verifying Coverage Timeline and Buttons...');
  await expect(page.locator('a').filter({ hasText: /^Summary$/ })).toHaveText('Summary');
  await expect(page.locator('a').filter({ hasText: 'Coverage timeline' })).toHaveText('Coverage timeline');
  await expect(page.getByRole('button', { name: 'File new claim' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Condition lookup' })).toBeVisible();

await expect(page.getByRole('button', { name: 'Condition lookup' })).toHaveText('Condition lookup');
await expect(page.getByRole('heading', { name: 'Benefit categories' })).toHaveText('Benefit categories');

  console.log('✅ Verifying Coverage values...');
  await expect(page.getByText('$200')).toBeVisible();
  await expect(page.getByText('$500')).toBeVisible();
  await expect(page.getByText('$1,000')).toBeVisible();

  console.log('✅ Verifying Policy Document section...');
  await expect(page.getByText('Coverage packet')).toBeVisible();

  console.log('✅ Verifying Family Info section...');
  await expect(page.getByText('Myself')).toBeVisible();
  await expect(page.getByText('Covered', { exact: true })).toBeVisible();
  await expect(page.getByRole('alert').filter({ hasText: 'Andres Fatima' })).toBeVisible();

  console.log('✅ Verifying Footer...');
  await expect(page.getByText(/©2025 Ansel Health, Inc. All Rights Reserved./, { exact: true })).toBeVisible();

  console.log('✅ Verifying Benefit Limits section...');
  await expect(page.getByText('Benefit limits')).toBeVisible();
  await expect(page.getByText('Benefits are paid if the', { exact: false }))
    .toContainText('Benefits are paid if the insured is diagnosed with a covered condition. Members may receive a benefit more than once as noted below.');

    await expect(page.getByRole('cell', { name: 'Category' })).toHaveText('Category');
    await expect(page.getByRole('cell', { name: 'PERIOD/MAXIMUM*' })).toHaveText('PERIOD/MAXIMUM*');
  await expect(page.locator('span').filter({ hasText: 'Moderate' })).toBeVisible();
  await expect(page.locator('span').filter({ hasText: 'Severe' })).toBeVisible();
  await expect(page.locator('span').filter({ hasText: 'Catastrophic' })).toBeVisible();

  console.log('✅ Verifying Limitations and Exclusions...');
  await expect(page.getByText('Limitations and exclusions')).toBeVisible();
  await expect(page.getByText('Exclusions', { exact: true })).toBeVisible();
  
  await expect(page.getByText('We will not pay benefits for any condition that is contributed to, caused by,', { exact: false }))
    .toContainText('We will not pay benefits for any condition that is contributed to, caused by, or resulting from:');
  
  console.log('✅ Verifying Exclusion Items...');
  await expect(page.getByText('commission of or attempt to', { exact: false })).toContainText('commission of or attempt to commit a felony, or voluntary participation in a riot or insurrection;');
  await expect(page.getByText('incarceration or imprisonment', { exact: false })).toContainText('incarceration or imprisonment following conviction for a crime;');
  await expect(page.getByText('seeking non-emergency', { exact: false })).toContainText('seeking non-emergency treatment during travel or activity outside the United States, Mexico, or Canada, unless the Insured receives confirmation of the diagnosis in the United States, Mexico, or Canada;');
  await expect(page.getByText('active duty service or', { exact: false })).toContainText('active duty service or training in the military (naval force, air force or National Guard/Reserves or equivalent) for service/training extending beyond 180 days of any state, country or international organization, unless specifically allowed by a provision of this Certificate;');
  await expect(page.getByText('involvement in any declared', { exact: false })).toContainText('involvement in any declared or undeclared war or act of war (not including acts of terrorism), while serving in the military or an auxiliary unit attached to the military, or working in an area of war whether voluntarily or as required by an employer;');
  await expect(page.getByText('a member of the Insured’s', { exact: false })).toContainText('a member of the Insured’s Immediate Family;');

  console.log('✅ Verifying Additional Exclusions...');
  await expect(page.getByText('In addition, We will not pay', { exact: false })).toContainText('In addition, We will not pay benefits for any of the following:');
  await expect(page.getByText('a Chronic Condition;', { exact: true })).toContainText('a Chronic Condition;');
  await expect(page.getByText('a Mental Illness;', { exact: true })).toContainText('a Mental Illness;');
  await expect(page.getByText('a Maternity Condition;', { exact: true })).toContainText('a Maternity Condition;');
  await expect(page.getByText('“Not Covered” conditions as', { exact: false })).toContainText('“Not Covered” conditions as designated in the Conditions List.');

  console.log('✅ Verifying Waiting Periods and Renewability...');
  await expect(page.getByText('Waiting periods', { exact: true })).toBeVisible();
  await page.waitForTimeout(1000);
  
   await expect(page.getByText('Waiting periodsIf you enroll', { exact: false })).toContainText('If you enroll or add a family member outside of an open enrollment period (annual, new hire, or other qualifying life event), your benefits or any increases are subject to a60 day waiting period. Any diagnoses that occur during the waiting period will not be covered.');

   await expect(page.getByText('Renewability, cancellation, & termination', { exact: true })).toBeVisible();
  await expect(page.getByText('Renewability, cancellation, & terminationThis coverage is offered under a group', { exact: false }))
    .toContainText('This coverage is offered under a group policy, and is annually renewable. Your continued coverage depends on whether your employer renews the group policy. If your employer does not renew the policy, coverage ends for all employees. You may be eligible to continue, or “port”, your coverage if you leave your employer or if your employer discontinues the group policy. If your employer renews the policy, you will have the option to continue your coverage. Premiums may change on the policy anniversary and your employer’s contribution to policy premiums may also change. You may choose to terminate coverage before the next policy anniversary by letting your employer know your choice in writing.');

  console.log('✅ Verifying Button color...');
  const newClaimBtn = page.getByRole('button', { name: 'File new claim' });
  const backgroundColor = await newClaimBtn.evaluate((el) => {
    return window.getComputedStyle(el).backgroundColor;
  });
  console.log('🎨 File New Claim Button color:', backgroundColor);

  // ✅ Optionally assert the color:
  // expect(backgroundColor).toBe('rgb(33, 133, 208)');
});