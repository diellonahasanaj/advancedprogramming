def validate_user_data(user_data):
    """
    Validates user registration data
    
    Args:
        user_data (dict): The user data to validate with the following keys:
            - username (str): Required, 3-20 chars, alphanumeric
            - email (str): Required, valid format
            - password (str): Required, min 8 chars, at least 1 number and 1 special char
            - age (int, optional): The user's age, must be 18+ if provided
            - referral_code (str, optional): Must be exactly 8 chars if provided
            
    Returns:
        dict: Object with is_valid flag and any error messages
    """
    import re
    
    result = {
        "is_valid": True,
        "errors": {}
    }
    
    # Kontrollo nëse user_data është i zbrazët ose jo i tipit dict
    if not isinstance(user_data, dict):
        result["is_valid"] = False
        result["errors"]["global"] = "Invalid user data format"
        return result
    
    # Validimi i username
    if "username" not in user_data or not user_data["username"]:
        result["is_valid"] = False
        result["errors"]["username"] = "Please provide a valid username."
    elif len(user_data["username"]) < 3 or len(user_data["username"]) > 20:
        result["is_valid"] = False
        result["errors"]["username"] = "Username must be between 3 and 20 characters long."
    elif not re.match(r'^[a-zA-Z0-9_]+$', user_data["username"]):
        result["is_valid"] = False
        result["errors"]["username"] = "Username can only include letters, numbers, and underscores."
    
    # Validimi i email
    if "email" not in user_data or not user_data["email"]:
        result["is_valid"] = False
        result["errors"]["email"] = "Email is required"
    elif not re.match(r'^[^\s@]+@[^\s@]+\.[^\s@]+$', user_data["email"]):
        result["is_valid"] = False
        result["errors"]["email"] = "Invalid email format"
    
    # Validimi i password
    if "password" not in user_data or not user_data["password"]:
        result["is_valid"] = False
        result["errors"]["password"] = "Password is required"
    elif len(user_data["password"]) < 8:
        result["is_valid"] = False
        result["errors"]["password"] = "Password must be at least 8 characters long"
    elif not re.search(r'\d', user_data["password"]):
        result["is_valid"] = False
        result["errors"]["password"] = "Password must contain at least one number"
    elif not re.search(r'[!@#$%^&*(),.?":{}|<>]', user_data["password"]):
        result["is_valid"] = False
        result["errors"]["password"] = "Password must contain at least one special character"
    
    # Validimi i age (opsional)
    if "age" in user_data:
        if not isinstance(user_data["age"], int):
            result["is_valid"] = False
            result["errors"]["age"] = "Age must be a number"
        elif user_data["age"] < 18:
            result["is_valid"] = False
            result["errors"]["age"] = "User must be at least 18 years old"
    
    # Validimi i referral_code (opsional)
    if "referral_code" in user_data:
        if not isinstance(user_data["referral_code"], str):
            result["is_valid"] = False
            result["errors"]["referral_code"] = "Referral code must be a string"
        elif len(user_data["referral_code"]) != 8:
            result["is_valid"] = False
            result["errors"]["referral_code"] = "Referral code must be exactly 8 characters"
    
    return result