/**
 * Logger utility for consistent logging across the application
 */

const fs = require('fs');
const path = require('path');

// Create logs directory if it doesn't exist
const logsDir = path.join(__dirname, '../../logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

const logLevels = {
  ERROR: 'ERROR',
  WARN: 'WARN',
  INFO: 'INFO',
  DEBUG: 'DEBUG',
};

class Logger {
  constructor(module) {
    this.module = module;
    this.logFile = path.join(logsDir, `${new Date().toISOString().split('T')[0]}.log`);
  }

  getTimestamp() {
    return new Date().toISOString();
  }

  formatMessage(level, message, data = {}) {
    return JSON.stringify({
      timestamp: this.getTimestamp(),
      level,
      module: this.module,
      message,
      ...data,
    });
  }

  writeLog(level, message, data = {}) {
    const formattedMessage = this.formatMessage(level, message, data);

    // Console output
    const colors = {
      ERROR: '\x1b[31m', // Red
      WARN: '\x1b[33m', // Yellow
      INFO: '\x1b[36m', // Cyan
      DEBUG: '\x1b[35m', // Magenta
      RESET: '\x1b[0m',
    };

    console.log(`${colors[level]}[${level}]${colors.RESET} ${message}`);

    // File output
    if (process.env.NODE_ENV !== 'test') {
      fs.appendFileSync(this.logFile, formattedMessage + '\n');
    }
  }

  error(message, data = {}) {
    this.writeLog(logLevels.ERROR, message, data);
  }

  warn(message, data = {}) {
    this.writeLog(logLevels.WARN, message, data);
  }

  info(message, data = {}) {
    this.writeLog(logLevels.INFO, message, data);
  }

  debug(message, data = {}) {
    if (process.env.NODE_ENV === 'development') {
      this.writeLog(logLevels.DEBUG, message, data);
    }
  }
}

module.exports = Logger;
