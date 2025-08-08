// hashPassword.js
import bcrypt from 'bcryptjs';

const password = 'your_plain_password'; // Change this to your actual password
const saltRounds = 10;




const hashPassword = async () => {
  try {
    const hashed = await bcrypt.hash(password, saltRounds);
    console.log('🔐 Hashed password:\n', hashed);
  } catch (err) {
    console.error('❌ Error hashing password:', err);
  }
};

hashPassword();


