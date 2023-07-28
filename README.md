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
- Retrieve all contacts and filter based on title.
- Robust error handling and validation.

## Prerequisites

Before running the project, ensure you have the following installed:

- Node.js (version >= 12)
- npm or yarn
- PostgreSQL or MySQL database (adjust database configuration in `config/config.json`)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/contacts-management-api.git
   cd contacts-management-api
