const validateUserData = require('./validateUserData');

describe('User Data Validation', () => {
    test('should return valid for correct user data', () => {
        const result = validateUserData({
            username: 'validUser1',
            email: 'valid@example.com',
            password: 'Password1!',
            age: 25,
            referralCode: 'abcdefgh'
        });
        expect(result.isValid).toBe(true);
    });

    test('should return error for null input', () => {
        const result = validateUserData(null);
        expect(result.isValid).toBe(false);
        expect(result.errors.global).toContain('Invalid user data format');
    });

    test('should return error for undefined input', () => {
        const result = validateUserData(undefined);
        expect(result.isValid).toBe(false);
        expect(result.errors.global).toContain('Invalid user data format');
    });

    test('should return error for username with special characters', () => {
        const result = validateUserData({ username: 'user@name' });
        expect(result.isValid).toBe(false);
        expect(result.errors.username).toContain('Username can only contain letters, numbers, and underscores');
    });

    test('should return error for password missing a number', () => {
        const result = validateUserData({ password: 'Password!' });
        expect(result.isValid).toBe(false);
        expect(result.errors.password).toContain('Password must contain at least one number');
    });

    test('should return error for password missing a special character', () => {
        const result = validateUserData({ password: 'Password123' });
        expect(result.isValid).toBe(false);
        expect(result.errors.password).toContain('Password must contain at least one special character');
    });

    test('should return error for email with space', () => {
        const result = validateUserData({ email: 'invalid email@example.com' });
        expect(result.isValid).toBe(false);
        expect(result.errors.email).toContain('Invalid email format');
    });

    test('should return error for referral code longer than 8 characters', () => {
        const result = validateUserData({ referralCode: 'ABCDEFGHIJK' });
        expect(result.isValid).toBe(false);
        expect(result.errors.referralCode).toContain('Referral code must be exactly 8 characters');
    });

    test('should return error for referral code shorter than 8 characters', () => {
        const result = validateUserData({ referralCode: 'ABC' });
        expect(result.isValid).toBe(false);
        expect(result.errors.referralCode).toContain('Referral code must be exactly 8 characters');
    });

    test('should return error for age as a string', () => {
        const result = validateUserData({ age: '25' });
        expect(result.isValid).toBe(false);
        expect(result.errors.age).toContain('Age must be a number');
    });

    test('should return error for long password missing number and special character', () => {
        const result = validateUserData({ password: 'LongPassword' });
        expect(result.isValid).toBe(false);
        expect(result.errors.password).toContain('Password must contain at least one number');
        expect(result.errors.password).toContain('Password must contain at least one special character');
    });

    test('should return error for missing email', () => {
        const result = validateUserData({ username: 'user123', password: 'Password1!' });
        expect(result.isValid).toBe(false);
        expect(result.errors.email).toContain('Email is required');
    });

    test('should return error for username too short', () => {
        const result = validateUserData({ username: 'us', email: 'test@example.com', password: 'Password1!' });
        expect(result.isValid).toBe(false);
        expect(result.errors.username).toContain('Username must be between 3 and 20 characters');
    });

    test('should return error for username too long', () => {
        const result = validateUserData({ username: 'a'.repeat(21), email: 'test@example.com', password: 'Password1!' });
        expect(result.isValid).toBe(false);
        expect(result.errors.username).toContain('Username must be between 3 and 20 characters');
    });

    test('should return valid for a valid referral code', () => {
        const result = validateUserData({ referralCode: 'abcdefgh' });
        expect(result.isValid).toBe(true);
    });

    test('should return error for referral code with non-string type', () => {
        const result = validateUserData({ referralCode: 12345678 });
        expect(result.isValid).toBe(false);
        expect(result.errors.referralCode).toContain('Referral code must be a string');
    });

    test('should return valid for age 18 or above', () => {
        const result = validateUserData({ age: 18 });
        expect(result.isValid).toBe(true);
    });

    test('should return error for age below 18', () => {
        const result = validateUserData({ age: 17 });
        expect(result.isValid).toBe(false);
        expect(result.errors.age).toContain('User must be at least 18 years old');
    });

    test('should return error for invalid email format', () => {
        const result = validateUserData({ email: 'invalid@com' });
        expect(result.isValid).toBe(false);
        expect(result.errors.email).toContain('Invalid email format');
    });

    test('should return error for missing password', () => {
        const result = validateUserData({ username: 'user123', email: 'test@example.com' });
        expect(result.isValid).toBe(false);
        expect(result.errors.password).toContain('Password is required');
    });
});
