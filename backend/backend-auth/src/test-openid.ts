import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from backend-auth folder
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// Test if env variables are loaded
console.log('COGNITO_REGION:', process.env.COGNITO_REGION);
console.log('COGNITO_USER_POOL_ID:', process.env.COGNITO_USER_POOL_ID);
console.log('COGNITO_CLIENT_ID:', process.env.COGNITO_CLIENT_ID);
console.log('COGNITO_CLIENT_SECRET:', process.env.COGNITO_CLIENT_SECRET);
console.log('COGNITO_REDIRECT_URI:', process.env.COGNITO_REDIRECT_URI);
