# BiteSpeedBackendTask

# Contacts Management API

This is a Contacts Management API built with Node.js and Express.js, using Sequelize as the ORM for database interactions.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Endpoints](#endpoints)
- [Contributing](#contributing)
- [License](#license)

## Introduction

The Contacts Management API provides functionality to create and retrieve contacts from a database. It allows users to add contacts with email and/or phone number and provides support for linking primary and secondary contacts.

## Features

- Create a new contact with email and/or phone number.
- Prevent duplicate contacts with the same email and/or phone number.
- Link primary and secondary contacts.
- Retrieve all contacts based on title.
- Robust error handling and validation.

## Prerequisites

Before running the project, ensure you have the following installed:

- Node.js (version >= 12)
- npm or yarn
- PostgreSQL or MySQL database (adjust database configuration in `config/config.json`)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Anandhu09/BiteSpeedBackendTask.git
   
2. Install the dependencies:
   npm install

3. Set up the database:

   Create a new database in MySQL.
   Update the database configuration in config/db.config.json to match your database credentials.

## Usage
To start the API server, use the following command:

npm start

The server will start running on http://localhost:8082

## Endpoints

- **POST /identify**
  - Create a new contact with email and/or phone number.
  - If either email or phoneNumber is missing, it will return a 400 (Bad Request) response.
  - If the contact already exists, it will check if it's a primary contact and create a secondary contact linked to the existing primary contact.
  - If the contact does not exist, it will be saved as a primary contact.

- **GET /identify**
  - Retrieve all contacts.
  - Supports filtering contacts based on the "title" query parameter.

