# test_validateUserData.py

import unittest
from validate_user_data import validate_user_data 

class TestValidateUserData(unittest.TestCase):
    def test_valid_user_data(self):
        user_data = {
            "username": "valid_user123",
            "email": "test@example.com",
            "password": "Password1!",
            "age": 25,
            "referral_code": "REFCODE1"
        }
        result = validate_user_data(user_data)
        self.assertTrue(result["is_valid"])
        self.assertEqual(result["errors"], {})

    def test_missing_required_fields(self):
        user_data = {}
        result = validate_user_data(user_data)
        self.assertFalse(result["is_valid"])
        self.assertIn("username", result["errors"])
        self.assertIn("email", result["errors"])
        self.assertIn("password", result["errors"])

    def test_invalid_username_length(self):
        user_data = {
            "username": "ab",
            "email": "test@example.com",
            "password": "Password1!"
        }
        result = validate_user_data(user_data)
        self.assertFalse(result["is_valid"])
        self.assertEqual(result["errors"]["username"], "Username must be between 3 and 20 characters long.")

    def test_invalid_username_characters(self):
        user_data = {
            "username": "invalid@user",
            "email": "test@example.com",
            "password": "Password1!"
        }
        result = validate_user_data(user_data)
        self.assertFalse(result["is_valid"])
        self.assertEqual(result["errors"]["username"], "Username can only include letters, numbers, and underscores.")

    def test_invalid_email_format(self):
        user_data = {
            "username": "valid_user123",
            "email": "invalid-email",
            "password": "Password1!"
        }
        result = validate_user_data(user_data)
        self.assertFalse(result["is_valid"])
        self.assertEqual(result["errors"]["email"], "Invalid email format")

    def test_password_too_short(self):
        user_data = {
            "username": "valid_user123",
            "email": "test@example.com",
            "password": "Pass1!"
        }
        result = validate_user_data(user_data)
        self.assertFalse(result["is_valid"])
        self.assertEqual(result["errors"]["password"], "Password must be at least 8 characters long")

    def test_password_missing_number(self):
        user_data = {
            "username": "valid_user123",
            "email": "test@example.com",
            "password": "Password!"
        }
        result = validate_user_data(user_data)
        self.assertFalse(result["is_valid"])
        self.assertEqual(result["errors"]["password"], "Password must contain at least one number")

    def test_password_missing_special_char(self):
        user_data = {
            "username": "valid_user123",
            "email": "test@example.com",
            "password": "Password1"
        }
        result = validate_user_data(user_data)
        self.assertFalse(result["is_valid"])
        self.assertEqual(result["errors"]["password"], "Password must contain at least one special character")

    def test_age_under_18(self):
        user_data = {
            "username": "valid_user123",
            "email": "test@example.com",
            "password": "Password1!",
            "age": 17
        }
        result = validate_user_data(user_data)
        self.assertFalse(result["is_valid"])
        self.assertEqual(result["errors"]["age"], "User must be at least 18 years old")

    def test_invalid_age_type(self):
        user_data = {
            "username": "valid_user123",
            "email": "test@example.com",
            "password": "Password1!",
            "age": "eighteen"
        }
        result = validate_user_data(user_data)
        self.assertFalse(result["is_valid"])
        self.assertEqual(result["errors"]["age"], "Age must be a number")

    def test_referral_code_wrong_length(self):
        user_data = {
            "username": "valid_user123",
            "email": "test@example.com",
            "password": "Password1!",
            "referral_code": "REF123"
        }
        result = validate_user_data(user_data)
        self.assertFalse(result["is_valid"])
        self.assertEqual(result["errors"]["referral_code"], "Referral code must be exactly 8 characters")

    def test_referral_code_invalid_type(self):
        user_data = {
            "username": "valid_user123",
            "email": "test@example.com",
            "password": "Password1!",
            "referral_code": 12345678
        }
        result = validate_user_data(user_data)
        self.assertFalse(result["is_valid"])
        self.assertEqual(result["errors"]["referral_code"], "Referral code must be a string")

    def test_optional_fields_not_provided(self):
        user_data = {
            "username": "valid_user123",
            "email": "test@example.com",
            "password": "Password1!"
        }
        result = validate_user_data(user_data)
        self.assertTrue(result["is_valid"])
        self.assertEqual(result["errors"], {})

    def test_empty_user_data(self):
        user_data = None
        result = validate_user_data(user_data)
        self.assertFalse(result["is_valid"])
        self.assertEqual(result["errors"]["global"], "Invalid user data format")

    def test_non_dict_user_data(self):
        user_data = "not_a_dict"
        result = validate_user_data(user_data)
        self.assertFalse(result["is_valid"])
        self.assertEqual(result["errors"]["global"], "Invalid user data format")


if __name__ == "__main__":
    unittest.main()