# Library Management System (LMS)

# Admin 
**userId="admin"**

**password=""

*Overview*


The Library Management System (LMS) is a web application designed to manage library operations efficiently. It includes features for maintaining book records, managing user memberships, and handling transactions such as book issues and returns. This system is developed to cater to both admin users and regular users, with specific functionalities and access controls.

# Table of Contents

*Features*


*Modules*

*User Roles*

*Installation*

*Usage* 

##  Features

*Maintenance Module*: For creating reports and managing transactions (accessible only to admin users).


*Reports and Transactions Module:* Accessible by both admin and regular users.

*Book Management:* Includes features for adding, updating, and searching for books.

*User Management:* Allows the addition of new users and management of existing users.

*Membership Management:* Facilitates adding and updating user memberships.

*Transaction Management:* Handles book issues and returns with validation.

## Modules

## Maintenance Module

Admin can access this module to create and manage reports and transactions.
Reports Module


Available to both admin and regular users for viewing various reports.
Transactions Module


Admins and users can access to manage book issue and return transactions.
User Management


Users can manage their own accounts and view transaction history.
Book Management


Admins can add, update, and manage books in the library.

*User Roles Admin*
Access to all modules including Maintenance, Reports, Transactions, and User Management.

*User*

Access to Reports and Transactions only; cannot access Maintenance.

*Book Issue:* Requires book name; author name is auto-filled.

Issue Date cannot be earlier than today.


*Add/Update Book:* All fields are mandatory with an error message displayed if required fields are not filled.


## Installation
*Clone the repository:*

## git clone https://github.com/deen-2k3/Acxiom-assignment

*cd <project-directory>*

## Install the required dependencies:

*npm install*

## Set up your database and configure the connection settings in the .env file.
Usage
Start the application:

**npm run for frontend and nodemon app.js for backend**

