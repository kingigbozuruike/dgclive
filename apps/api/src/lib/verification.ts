import crypto from 'crypto';

/**
 * Generate a 6-digit verification code
 */
export function generateVerificationCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

/**
 * Calculate expiration time for verification code
 */
export function getExpirationTime(): Date {
  const expiresIn = parseInt(process.env.VERIFICATION_CODE_EXPIRES_IN || '900', 10);
  return new Date(Date.now() + expiresIn * 1000); // Convert seconds to milliseconds
}

/**
 * Hash a verification code (for secure storage)
 */
export function hashCode(code: string): string {
  return crypto.createHash('sha256').update(code).digest('hex');
}

/**
 * Verify a code against its hash
 */
export function verifyCodeHash(plainCode: string, hashedCode: string): boolean {
  return hashCode(plainCode) === hashedCode;
}
