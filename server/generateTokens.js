import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current file location (ESM-safe __dirname)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to .env (in same folder as this script)
const envPath = path.join(__dirname, '.env');

// Generate secrets
const accessTokenSecret = crypto.randomBytes(64).toString('hex');
const refreshTokenSecret = crypto.randomBytes(64).toString('hex');

// Format new entries
const envEntry = `\nACCESS_TOKEN_SECRET=${accessTokenSecret}\nREFRESH_TOKEN_SECRET=${refreshTokenSecret}\n`;

// Append to .env file
fs.appendFile(envPath, envEntry, (err) => {
  if (err) {
    console.error('❌ Failed to write secrets to .env:', err);
  } else {
    console.log('✅ Secrets generated and added to .env');
    console.log('ACCESS_TOKEN_SECRET:', accessTokenSecret);
    console.log('REFRESH_TOKEN_SECRET:', refreshTokenSecret);
  }
});



/*
| Variable     | Holds this value                                         |
| ------------ | -------------------------------------------------------- |
| `__filename` | Full path to the current file (`generateTokens.js`)      |
| `__dirname`  | Full path to the folder containing this file (`server/`) |

__filename = "/Users/flare/Projects/blog/server/generateTokens.js"
__dirname = "/Users/flare/Projects/blog/server"
*/