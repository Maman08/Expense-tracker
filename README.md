# Mini Expense Tracker with Intelligent Insights

## Overview
The Mini Expense Tracker is a full-stack application designed to allow users to securely manage their expenses and gain insights into their spending habits. This app includes features like JWT-based authentication, CRUD operations for expenses, and intelligent insights with visualizations on the frontend. The backend is designed to efficiently handle large datasets and provide spending insights.

### Tech Stack
- **Frontend**: ReactJS, Shadcn, Recharts for the graphs
- **Backend**: Node.js with TypeScript, JWT for authentication, MongoDB (using Mongoose ORM) for database management
- **Authentication**: JWT
- **Database**: MongoDB (Mongoose)

## Features
1. **Authentication**: 
    - JWT-based authentication.
    - Users can register, log in, log out, and handle token expiry gracefully, including refresh tokens.

2. **Expense Management (CRUD)**:
    - Add, update, delete, and view expenses.
    - Each expense includes: Amount, Category, Date, and Description.
    - Paginated and filterable by date range and category.

3. **Spending Insights**:
    - Total spending per category.
    - Percentage distribution of expenses across categories.
    - Frontend: Visualizes data using a bar chart or pie chart.

4. **Frontend Pages**:
    - **Login/Registration**: Secure handling of JWT.
    - **Dashboard**: Display expenses, insights, and chart visualizations.
    - **Add/Edit Expense**: Simple form for adding and editing expenses.
    - **Delete Expense**: Ability to delete mistakenly added expenses.
![image](https://github.com/user-attachments/assets/007ce283-b65c-47e4-8453-206f23201bd5)
