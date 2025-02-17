import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BarChart3, ArrowUpDown } from 'lucide-react';

const MonthlyExpenseChart = ({ expenses }: { expenses: Array<{
  _id: string;
  amount: number;
  category: string;
  description: string;
  date: string;
}> }) => {
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc' | 'none'>('none');
  const [selectedView, setSelectedView] = useState<'monthly' | 'category'>('monthly');

  const categories = [
    'Food & Dining',
    'Transportation',
    'Shopping',
    'Entertainment',
    'Bills & Utilities',
    'Others',
  ];

  const COLORS = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD', '#D4A5A5'];
  
  const generateMonthlyData = () => {
    const monthlyExpenses: Record<string, number> = {};
    const monthlyCategories: Record<string, Record<string, number>> = {};
    
    const currentYear = new Date().getFullYear();
    for (let i = 0; i < 12; i++) {
      const monthName = new Date(currentYear, i, 1).toLocaleString('default', { month: 'short' });
      monthlyExpenses[monthName] = 0;
      monthlyCategories[monthName] = {};
      categories.forEach(cat => {
        monthlyCategories[monthName][cat] = 0;
      });
    }
    
    expenses.forEach(expense => {
      const date = new Date(expense.date);
      const monthName = date.toLocaleString('default', { month: 'short' });
      
      if (date.getFullYear() === currentYear) {
        monthlyExpenses[monthName] += expense.amount;
        
        if (!monthlyCategories[monthName][expense.category]) {
          monthlyCategories[monthName][expense.category] = 0;
        }
        monthlyCategories[monthName][expense.category] += expense.amount;
      }
    });
    
    const chartData = Object.keys(monthlyExpenses).map(month => {
      return {
        month,
        total: monthlyExpenses[month],
        ...monthlyCategories[month]
      };
    });
    
    return chartData;
  };

  const monthlyData = generateMonthlyData();
  
  const sortedData = [...monthlyData].sort((a, b) => {
    if (sortDirection === 'asc') {
      return a.total - b.total;
    } else if (sortDirection === 'desc') {
      return b.total - a.total;
    } else {
      // Sort by month order if no sorting specified
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      return months.indexOf(a.month) - months.indexOf(b.month);
    }
  });

  const toggleSortDirection = () => {
    if (sortDirection === 'none') setSortDirection('asc');
    else if (sortDirection === 'asc') setSortDirection('desc');
    else setSortDirection('none');
  };

  const getCategoryColor = (category: string) => {
    const index = categories.indexOf(category);
    return index >= 0 ? COLORS[index] : '#888888';
  };

  return (
    <Card className="mt-8 p-8 shadow-lg glass-effect hover:shadow-xl transition-shadow">
      <CardHeader className="p-0 mb-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <BarChart3 className="h-6 w-6 text-primary" />
            <CardTitle className="text-2xl font-semibold">Monthly Expenses</CardTitle>
          </div>
          <div className="flex items-center gap-4">
            <Select value={selectedView} onValueChange={(value: 'monthly' | 'category') => setSelectedView(value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="View type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="monthly">Monthly View</SelectItem>
                <SelectItem value="category">Category Breakdown</SelectItem>
              </SelectContent>
            </Select>
            <button 
              onClick={toggleSortDirection}
              className="p-2 rounded-full hover:bg-primary/10 transition-colors"
              title={sortDirection === 'asc' ? 'Sort Descending' : sortDirection === 'desc' ? 'No Sorting' : 'Sort Ascending'}
            >
              <ArrowUpDown className="h-5 w-5 text-muted-foreground" />
            </button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={sortedData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.8)', 
                  backdropFilter: 'blur(4px)',
                  borderRadius: '8px',
                  border: 'none',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                }} 
                formatter={(value, name) => [`$${value}`, name === 'total' ? 'Total' : name]}
              />
              <Legend />
              {selectedView === 'monthly' ? (
                <Bar 
                  dataKey="total" 
                  fill="#4f46e5" 
                  radius={[4, 4, 0, 0]}
                  name="Total"
                />
              ) : (
                categories.map((category) => (
                  <Bar 
                    key={category} 
                    dataKey={category} 
                    stackId="a" 
                    fill={getCategoryColor(category)} 
                    radius={[4, 4, 0, 0]}
                  />
                ))
              )}
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-3">Expense Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-primary/5">
              <p className="text-sm text-muted-foreground">Average Monthly Total</p>
              <p className="text-2xl font-semibold">
                ${Math.round(sortedData.reduce((sum, month) => sum + month.total, 0) / sortedData.filter(item => item.total > 0).length || 1)}
              </p>
            </div>
            <div className="p-4 rounded-lg bg-primary/5">
              <p className="text-sm text-muted-foreground">Highest Month</p>
              {sortedData.some(item => item.total > 0) ? (
                <>
                  <p className="text-2xl font-semibold">
                    ${Math.max(...sortedData.map(month => month.total))}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {sortedData.find(month => month.total === Math.max(...sortedData.map(month => month.total)))?.month}
                  </p>
                </>
              ) : (
                <p className="text-2xl font-semibold">$0</p>
              )}
            </div>
            <div className="p-4 rounded-lg bg-primary/5">
              <p className="text-sm text-muted-foreground">Lowest Month</p>
              {sortedData.some(item => item.total > 0) ? (
                <>
                  <p className="text-2xl font-semibold">
                    ${Math.min(...sortedData.filter(item => item.total > 0).map(month => month.total))}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {sortedData.find(month => month.total === Math.min(...sortedData.filter(item => item.total > 0).map(month => month.total)))?.month}
                  </p>
                </>
              ) : (
                <p className="text-2xl font-semibold">$0</p>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MonthlyExpenseChart;