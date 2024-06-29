# AGRISENSE BACKEND API Documentation

Welcome to the AGRISENSE Backend API documentation. This API provides functionality for Firebase Authentication and Machine Learning Prediction. Below you will find information about the available endpoints, the required parameters, and the response formats.

## Table of Contents
- [API Information](#api-information)
- [Authentication Endpoints](#authentication-endpoints)
  - [Register User](#register-user)
  - [Login User](#login-user)
  - [Get Current User](#get-current-user)
  - [Logout User](#logout-user)
  - [Reset Password](#reset-password)
- [Machine Learning Endpoints](#machine-learning-endpoints)
  - [Make a Prediction](#make-a-prediction)
  - [Get Prediction Histories](#get-prediction-histories)
  - [Get Prediction Data by ID](#get-prediction-data-by-id)
- [Schemas](#schemas)
  - [User Schema](#user-schema)
  - [EmailOnly Schema](#emailonly-schema)
  - [Prediction Schema](#prediction-schema)

## API Information
- **Title:** AGRISENSE BACKEND API
- **Version:** 1.0.0
- **Description:** API for Firebase Authentication and Machine Learning Prediction

## Authentication Endpoints

### Register User
- **Endpoint:** `/api/register`
- **Method:** `POST`
- **Tags:** AUTH API
- **Summary:** Register a new user
- **Request Body:**
  ```json
  {
    "email": "email@example.com",
    "password": "password123"
  }
  ```
- **Responses:**
  - `201 Created`
    ```json
    {
      "message": "User created successfully, verification email sent! Please verify your email in 3 minutes.",
      "user": { /* user object */ }
    }
    ```
  - `422 Validation error`
    ```json
    {
      "email": "Invalid email format",
      "password": "Password too short"
    }
    ```
  - `500 Internal Server Error`
    ```json
    {
      "error": "Error message"
    }
    ```

### Login User
- **Endpoint:** `/api/login`
- **Method:** `POST`
- **Tags:** AUTH API
- **Summary:** Login a user
- **Request Body:**
  ```json
  {
    "email": "email@example.com",
    "password": "password123"
  }
  ```
- **Responses:**
  - `200 OK`
    ```json
    {
      "message": "User logged in successfully"
    }
    ```
  - `422 Validation error`
    ```json
    {
      "email": "Invalid email format",
      "password": "Incorrect password"
    }
    ```
  - `500 Internal Server Error`
    ```json
    {
      "error": "Error message"
    }
    ```

### Get Current User
- **Endpoint:** `/api/user`
- **Method:** `GET`
- **Tags:** AUTH API
- **Summary:** Get current user
- **Responses:**
  - `200 OK`
    ```json
    {
      "userData": { /* user object */ }
    }
    ```
  - `401 Unauthorized`
    ```json
    {
      "error": "Unauthorized"
    }
    ```
  - `404 Not Found`
    ```json
    {
      "error": "User not found"
    }
    ```
  - `500 Internal Server Error`
    ```json
    {
      "error": "Error message"
    }
    ```

### Logout User
- **Endpoint:** `/api/logout`
- **Method:** `POST`
- **Tags:** AUTH API
- **Summary:** Logout a user
- **Responses:**
  - `200 OK`
    ```json
    {
      "message": "User logged out successfully"
    }
    ```
  - `500 Internal Server Error`
    ```json
    {
      "error": "Error message"
    }
    ```

### Reset Password
- **Endpoint:** `/api/reset-password`
- **Method:** `POST`
- **Tags:** AUTH API
- **Summary:** Reset password
- **Request Body:**
  ```json
  {
    "email": "email@example.com"
  }
  ```
- **Responses:**
  - `200 OK`
    ```json
    {
      "message": "Password reset email sent"
    }
    ```
  - `422 Validation error`
    ```json
    {
      "email": "Invalid email format"
    }
    ```
  - `500 Internal Server Error`
    ```json
    {
      "error": "Error message"
    }
    ```

## Machine Learning Endpoints

### Make a Prediction
- **Endpoint:** `/api/predict`
- **Method:** `POST`
- **Tags:** ML API
- **Summary:** Make a prediction
- **Request Body:**
  ```json
  {
    "image": "image.jpg / image.png / image.jpeg"
  }
  ```
- **Responses:**
  - `200 OK`
    ```json
    {
      "predictId": "Prediction ID",
      "result": "Prediction result"
    }
    ```
  - `500 Internal Server Error`
    ```json
    {
      "error": "Error message"
    }
    ```

### Get Prediction Histories
- **Endpoint:** `/api/history`
- **Method:** `GET`
- **Tags:** ML API
- **Summary:** Get prediction histories by user ID
- **Parameters:**
  - `userId` (query) - Required
- **Responses:**
  - `200 OK`
    ```json
    [
      {
        /* prediction object */
      }
    ]
    ```
  - `500 Internal Server Error`
    ```json
    {
      "error": "Error message"
    }
    ```

### Get Prediction Data by ID
- **Endpoint:** `/api/history/:predictId`
- **Method:** `GET`
- **Tags:** ML API
- **Summary:** Get prediction data by prediction ID
- **Parameters:**
  - `predictId` (query) - Required
- **Responses:**
  - `200 OK`
    ```json
    {
      /* prediction object */
    }
    ```
  - `500 Internal Server Error`
    ```json
    {
      "error": "Error message"
    }
    ```

## Schemas

### User Schema
- **Type:** `object`
- **Required:** `email`, `password`
- **Properties:**
  - `email` (string, format: email) - Email of the user
  - `password` (string, format: password) - Password of the user
- **Example:**
  ```json
  {
    "email": "email@example.com",
    "password": "password123"
  }
  ```

### EmailOnly Schema
- **Type:** `object`
- **Required:** `email`
- **Properties:**
  - `email` (string, format: email) - Email of the user
- **Example:**
  ```json
  {
    "email": "email@example.com"
  }
  ```

### Prediction Schema
- **Type:** `object`
- **Properties:**
  - `image` (file, format: binary) - Image file for prediction
- **Example:**
  ```json
  {
    "image": "image.jpg / image.png / image.jpeg"
  }
  ```

This concludes the documentation for the AGRISENSE Backend API. For further details and updates, please refer to the official documentation or contact support.
