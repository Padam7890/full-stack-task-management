import * as bcrypt from 'bcrypt';

// Function to hash a password using bcrypt
export async function hashPassword(password: string): Promise<string> {
  const saltOrRounds = 10;
  return bcrypt.hash(password, saltOrRounds);
}
