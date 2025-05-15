import fs from 'fs';
import path from 'path';
import { faker } from '@faker-js/faker';
import { createObjectCsvWriter } from 'csv-writer';

// Output file path
const outputDir = 'generated';
const fileName = `roster-${Date.now()}.csv`;
const filePath = path.join(outputDir, fileName);

// Create directory if not exists
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);

// Define columns based on your image
const headers = [
  'Type', 'Family/Tier', 'Relationship', 'Email', 'SSN', 'BirthDate',
  'LastName', 'FirstName', 'Suffix', 'Gender', 'Street', 'City',
  'State', 'ZipCode', 'MobilePhone', 'Phone', 'Eligibility Class',
  'Title', 'Status', 'Date Of Hire', 'Effective Date',
  'Benefit', 'Severe', 'Catastrophic', 'Mental', 'Chronic', 'Received Date'
];

function generateFakeRow() {
  return {
    'Type': 'Employee',
    'Family/Tier': 'Employee',
    'Relationship': 'Primary',
    'Email': faker.internet.email(),
    'SSN': faker.helpers.replaceSymbols('###-##-####'),
    'BirthDate': faker.date.between({ from: '1940-01-01', to: '2000-12-31' }).toLocaleDateString('en-US'),
    'LastName': faker.person.lastName(),
    'FirstName': faker.person.firstName(),
    'Suffix': '',
    'Gender': faker.helpers.arrayElement(['M', 'F']),
    'Street': '123 RandStreet',
    'City': 'Dallas',
    'State': 'Texas',
    'ZipCode': '17001',
    'MobilePhone': faker.phone.number(),
    'Phone': faker.helpers.replaceSymbols('###-###-####'),
    'Eligibility Class': 'Class A',
    'Title': 'Title Test',
    'Status': 'Active',
    'Date Of Hire': faker.date.past({ years: 10 }).toLocaleDateString('en-US'),
    'Effective Date': '6/1/26',
    'Benefit': 500,
    'Severe': 1500,
    'Catastrophic': 3000,
    'Mental': 2000,
    'Chronic': 1000,
    'Received Date': '01/13/2021'
  };
}

async function createCSV(count: number = 10) {
  const rows = Array.from({ length: count }, generateFakeRow);

  const csvWriter = createObjectCsvWriter({
    path: filePath,
    header: headers.map(name => ({ id: name, title: name }))
  });

  await csvWriter.writeRecords(rows);
  console.log(`✅ CSV generated: ${filePath}`);
  return filePath;
}

// Export for use in Playwright test
export default createCSV;