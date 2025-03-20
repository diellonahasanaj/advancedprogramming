function validateUserData(userData) {
    const result = {
        isValid: true,
        errors: {},
    };

    if (!userData || typeof userData !== 'object') {
        result.isValid = false;
        result.errors.global = 'Invalid user data format';
        return result;
    }

    // Username validation
    if (!userData.username || userData.username.length < 3 || userData.username.length > 20) {
        result.isValid = false;
        result.errors.username = 'Username must be between 3 and 20 characters';
    } else if (!/^[a-zA-Z0-9_]+$/.test(userData.username)) {
        result.isValid = false;
        result.errors.username = 'Username can only contain letters, numbers, and underscores';
    }

    // Email validation
    if (!userData.email) {
        result.isValid = false;
        result.errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.email)) {
        result.isValid = false;
        result.errors.email = 'Invalid email format';
    }

    // Password validation
    if (!userData.password || userData.password.length < 8) {
        result.isValid = false;
        result.errors.password = 'Password is required and must be at least 8 characters long';
    } else {
        if (!/\d/.test(userData.password)) {
            result.isValid = false;
            result.errors.password = 'Password must contain at least one number';
        }
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(userData.password)) {
            result.isValid = false;
            result.errors.password = 'Password must contain at least one special character';
        }
    }

    // Age validation
    if (userData.age !== undefined) {
        if (typeof userData.age !== 'number') {
            result.isValid = false;
            result.errors.age = 'Age must be a number';
        } else if (userData.age < 18) {
            result.isValid = false;
            result.errors.age = 'User must be at least 18 years old';
        }
    }

    // Referral code validation
    if (userData.referralCode !== undefined) {
        if (typeof userData.referralCode !== 'string') {
            result.isValid = false;
            result.errors.referralCode = 'Referral code must be a string';
        } else if (userData.referralCode.length !== 8) {
            result.isValid = false;
            result.errors.referralCode = 'Referral code must be exactly 8 characters';
        }
    }

    return result;
}

module.exports = validateUserData;
