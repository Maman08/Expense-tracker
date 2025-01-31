import { useState, useEffect } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';

interface Expense {
  id: number;
  category: string;
  amount: number;
}

const DashboardPage = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const token = localStorage.getItem('jwt_token');

//   useEffect(() => {
//     if (!token) {
//       return <Navigate to="/login" />;
//     }

//     const fetchExpenses = async () => {
//       const response = await axios.get('http://localhost:5000/expenses', {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setExpenses(response.data);
//       setLoading(false);
//     };

//     fetchExpenses();
//   }, [token]);

//   if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Your Expenses</h2>
      <div>
        {expenses.map((expense) => (
          <Card key={expense.id} className="mb-4">
            <CardHeader>
              <CardTitle>{expense.category}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>${expense.amount}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;
