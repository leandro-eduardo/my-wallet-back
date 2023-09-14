# MyWallet (Financial Management App)

A web-based financial management application developed with ReactJS to help you efficiently track your personal finances.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Routes](#routes)
- [Installation](#installation)
- [Usage](#usage)

## Overview

This financial management app is designed to allow users to record and track their expenses, income, and financial balances. It provides a user-friendly and intuitive tool for effectively managing your personal finances.

### Key Technologies Used

- Node.js
- JavaScript
- Express
- MongoDB
- Other dependencies (listed in the `package.json` file)

## Features

- Record and manage your expenses and income
- View a summary of your balances and transactions

## Routes

### Authentication:

- **POST /sign-up**: Route to register a new user. Users can create an account by providing necessary information such as name, email, and password.

  Request body example:

  ```json
  {
    "name": "User",
    "email": "user@email.com",
    "password": "my-strong-password"
  }
  ```

- **POST /sign-in**: Route to authenticate a user. Users can log in by providing their credentials such as email and password. This route will return an authentication token if the user has successfully logged in.

  Request body example:

  ```json
  {
    "email": "user@email.com",
    "password": "strong-password"
  }
  ```

- **DELETE /sign-out**: Route to log out an authenticated user. This will invalidate the authentication token and prevent unauthorized access.

### Transactions:

All of these routes are authenticated and require an Bearer authentication token sent in the request header.

```json
  headers: {
    Authorization: `Bearer ${token}`
  }
```

- **GET /transactions**: Route to retrieve transactions for the authenticated user. This allows users to view a history of their financial transactions.

- **POST /transactions**: Route to create a new transaction. Users can add transaction details such as type (income or expense), amount, and description.

  Request body example:

  ```json
  {
    "description": "Lunch",
    "type": "expense",
    "amount": 1000
  }
  ```

- **DELETE /transactions/:id**: Route to delete a specific transaction based on its ID. This allows users to remove unwanted or incorrect transactions.

## Installation

Follow these steps to set up the project on your local machine:

1. Make sure you have MongoDB installed so that the API has access to the database. You can also use MongoDB Atlas if you prefer and change the DB_URL environment variable to the connection string of your database deployment.

2. Clone the repository:

   ```bash
   git clone https://github.com/leandro-eduardo/my-wallet-back.git
   ```

3. Navigate to the project directory:
   ```bash
    cd my-wallet-back
   ```
4. Install the dependencies
   ```bash
    npm install
   ```
5. Rename .env.example file to .env

6. (Optional) Change the DB_URL value if you are using MongoDB Atlas

## Usage

After installation, you can start the API server with the following command:

```bash
 npm start
```

This will start the back-end server at http://localhost:5000.
