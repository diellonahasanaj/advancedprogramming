# User Profile Microservice

Ky është një mikroshërbim për menaxhimin e profileve të përdoruesve.

## Varësitë

- Node.js
- Express
- jsonwebtoken
- bcryptjs
- cors

## Instalimi

1. Klono repozitorinë
2. Instalo varësitë:
   ```bash
   npm install
   ```
3. Nis serverin:
   ```bash
   npm start
   ```

## API Dokumentacioni

### `GET /health`
Kontrollo shëndetin e shërbimit.

### `POST /users`
Regjistro një përdorues të ri.

**Shembull Request:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe",
  "address": {
    "street": "123 Main St",
    "city": "Anytown",
    "zipCode": "12345",
    "country": "Exampleland"
  }
}
```

### `POST /auth/login`
Identifikohu dhe merr token.

**Shembull Request:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

### `GET /users/me`
Merr profilin aktual (kërkohet autentifikim).

**Header:**
```
Authorization: Bearer <token_jotaj>
```

## Testimi
Përdor Postman ose cURL për të testuar endpointet.

## Screenshot
![alt text](<● product-service.test.js - product-catalog-api - Visual Studio Code 3_24_2025 10_50_09 AM.png>)
![alt text](<● product-service.test.js - product-catalog-api - Visual Studio Code 3_24_2025 10_50_37 AM.png>)