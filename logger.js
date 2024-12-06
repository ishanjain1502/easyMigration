const fs = require('fs');
const path = require('path');

const logFolderPath = path.join(__dirname, 'migrationLogs');
const logFilePath = path.join(logFolderPath, 'migration_logs.txt');

// Ensure the migrationLogs folder exists
if (!fs.existsSync(logFolderPath)) {
  fs.mkdirSync(logFolderPath);
}

// Function to write logs
function writeLog(action, data) {
  const timestamp = new Date().toISOString();
  const logEntry = {
    timestamp,
    action,
    data,
  };

  // Append the log entry as a stringified JSON
  fs.appendFileSync(logFilePath, JSON.stringify(logEntry) + '\n', { encoding: 'utf8' });
}

module.exports = {writeLog};