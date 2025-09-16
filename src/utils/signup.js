const fs = require('fs');
const path = require('path');

const USERS_CSV = path.join(__dirname, '../../users.csv');

function saveSignup({ name, email, password, course, level }) {
  const row = `${name},${email},${password},${course},${level}\n`;
  fs.appendFileSync(USERS_CSV, row, { encoding: 'utf8' });
}

function getAllSignups() {
  if (!fs.existsSync(USERS_CSV)) return [];
  const data = fs.readFileSync(USERS_CSV, 'utf8');
  return data.trim().split('\n').map(line => {
    const [name, email, password, course, level] = line.split(',');
    return { name, email, password, course, level };
  });
}

module.exports = { saveSignup, getAllSignups };
