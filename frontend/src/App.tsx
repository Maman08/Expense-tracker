import { useState, useEffect } from 'react';
import { Moon, Sun, Plus, PieChart, DollarSign, Wallet, LogIn, UserPlus, Trash2, Calendar, Filter } from 'lucide-react';
import { useTheme } from './hooks/use-theme.ts';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './components/ui/select.tsx';
import { PieChart as RechartsChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './components/ui/dialog.tsx';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import axios from 'axios';
import api from './utils/axios-config.ts';
import { jwtDecode } from "jwt-decode";

type Expense = {
  id: string;
  amount: number;
  category: string;
  description: string;
  date: Date;
};

const categories = [
  'Food & Dining',
  'Transportation',
  'Shopping',
  'Entertainment',
  'Bills & Utilities',
  'Others',
];

const COLORS = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD', '#D4A5A5'];

function App() {
  const { theme, toggleTheme } = useTheme();
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState<Date>(new Date());
  const [filterCategory, setFilterCategory] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState<string | null>(null);
  const [firstName, setFirstName] = useState('');
  const[lastName,setLastName]=useState('');
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [firstNamee, setFirstNamee] = useState('');

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    api.get('/expenses')
      .then((response) => {
        setExpenses(response.data);
      })
      .catch((error) => {
        console.error("Error fetching expenses:", error);
        if (error.response?.status === 401) {
          // Handle unauthorized error
        }
      });
  }, []);

  const getFirstNameFromToken = () => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      console.log(decodedToken.firstName)
      return decodedToken.firstName; 
    }
    return null;
  };
  useEffect(() => {
    const userId = getFirstNameFromToken();
    if (userId) {
      setFirstNamee(firstName);
    }
  }, []);
  

  const handleAddExpense = async () => {
    if (!amount || !category) return;
  
    const newExpense = {
      amount: parseFloat(amount),
      category,
      date,
      description,
    };
  
    try {
      const response = await api.post('/expense', newExpense);
      setExpenses((prev) => [response.data, ...prev]);
      setAmount("");
      setCategory("");
      setDescription("");
      setDate(new Date());
    } catch (error:any) {
      console.error("Error adding expense:", error);
      // Handle unauthorized error
      if (error.response?.status === 401) {
        setIsLoggedIn(false);
        setShowAuthModal(true);
        console.log('login kro ')
      }
    }
  };
  

  const handleDeleteExpense = (id: string) => {
    setSelectedExpense(id);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    if (selectedExpense) {
      try {
        await axios.delete(`${'http://localhost:8000/api/expense'}/${selectedExpense}`);
        setExpenses((prev) => prev.filter((exp) => exp.id !== selectedExpense));
        setShowDeleteConfirm(false);
        setSelectedExpense(null);
      } catch (error) {
        console.error("Error deleting expense:", error);
      }
    }
  };
  // const handleSignup=async()=>{

  // const handleSignup = async () => {
  //   try {
  //     localStorage.removeItem('token');
  //     const response = await axios.post('http://localhost:8000/api/signup', {
  //       firstName, lastName, email, password,
  //     });
      
  //     localStorage.setItem('token', response.data.token);
  //     setIsLoggedIn(true);
  //     setShowAuthModal(false);
  //     const expensesResponse = await api.get('/expenses');
  //     setExpenses(expensesResponse.data);
  //   } catch (error:any) {
  //     console.log('Signup error:', error.response?.data?.message);
  //   }
  // };
  

  const handleSignup = async () => {
    try {
      localStorage.removeItem('token');
      
      // Step 1: Call signup API
      const signupResponse = await axios.post('http://localhost:8000/api/signup', {
        firstName, lastName, email, password,
      });
  
      // Step 2: Now, immediately sign in after successful signup
      const signinResponse = await api.post('/signin', {
        email,
        password,
      });
  
      localStorage.setItem('token', signinResponse.data.token);
      console.log("fid",signinResponse.data.token)
      setIsLoggedIn(true);
      setShowAuthModal(false);
  
      // Fetch the user's expenses after signing in
      const expensesResponse = await api.get('/expenses');
      setExpenses(expensesResponse.data);
  
    } catch (error:any) {
      console.log('Signup error:', error.response?.data?.message);
    }
  };

  
  const handleSignin=async()=>{
    try {
      const response = await api.post('/signin', {
        email,
        password,
      });
      localStorage.setItem('token', response.data.token);
      console.log("fid",response.data.token)
      const decodedToken = jwtDecode(response.data.token);
    const userId = decodedToken.firstName;

    setFirstNamee(userId);
      setIsLoggedIn(true);
      setShowAuthModal(false);
      const expensesResponse = await api.get('/expenses');
      setExpenses(expensesResponse.data);
    }catch(error){
      console.log('error in signin/frontend')
    }
  }
  
  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:8000/api/logout');
      localStorage.removeItem('token');
      setIsLoggedIn(false);
      setExpenses([]);
    } catch (error) {
      console.error('Error during logout', error);
    }
  };
  function capitalizeFirstLetter(str:any) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
  const filteredExpenses = expenses.filter(expense => 
    !filterCategory || filterCategory === 'all' || expense.category === filterCategory
  );

  const totalExpenses = filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0);

  const chartData = categories.map(cat => ({
    name: cat,
    value: filteredExpenses
      .filter(expense => expense.category === cat)
      .reduce((sum, expense) => sum + expense.amount, 0),
  })).filter(item => item.value > 0);

  return (
    <div className="min-h-screen bg-background bg-[url('https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&q=80')] bg-cover bg-fixed bg-center">
      <div className="min-h-screen backdrop-blur-sm bg-background/50">
        <div className="max-w-6xl mx-auto p-8">
          <div className="flex justify-between items-center mb-8 animate-slide-down">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-primary rounded-xl rotate-12 hover:rotate-0 transition-transform duration-300">
                <Wallet className="h-8 w-8 text-primary-foreground" />
              </div>
              <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
                Expense Tracker
              </h1>
            </div>
            <div>
              {isLoggedIn?(
                <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
                Welcome {capitalizeFirstLetter(firstNamee)} !!
              </h1>
              ):(
                <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
               
              </h1>
              )}
              
            </div>
            <div className="flex items-center gap-4">
             

              <Button 
                variant="ghost" 
                size="icon" 
                onClick={toggleTheme} 
                className="ml-2 hover:scale-110 transition-transform"
              >
                {theme === 'dark' ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </Button>
              {isLoggedIn?(
                 <Button onClick={handleLogout} variant="destructive" className="gap-2 hover:scale-105 transition-transform">
                 Logout
               </Button>

              ):(
                <div>
                   <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="gap-2 hover:scale-105 transition-transform">
                    <LogIn className="h-4 w-4" /> Login
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] glass-effect">
                  <DialogHeader>
                    <DialogTitle>Login to your account</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="Enter your email" value={email}
                      onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <Input id="password" type="password" placeholder="Enter your password" value={password}
                      onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <Button className="w-full hover:scale-[1.02] transition-transform" onClick={handleSignin}>Login</Button>
                  </div>
                </DialogContent>
              </Dialog>

              <Dialog>
                <DialogTrigger asChild>
                  <Button className="gap-2 hover:scale-105 transition-transform">
                    <UserPlus className="h-4 w-4" /> Sign Up
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] glass-effect">
                  <DialogHeader>
                    <DialogTitle>Create an account</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                  <div className="space-y-2">
                      <Label htmlFor="signup-firstName">First Name</Label>
                      <Input id="signup-firstName" type="firstName" placeholder="Enter your First Name" value={firstName}
                      onChange={(e) => setFirstName(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-lastName">Last Name</Label>
                      <Input id="signup-lastName" type="lastName" placeholder="Enter your Last Name" value={lastName}
                      onChange={(e) => setLastName(e.target.value)}/>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-email">Email</Label>
                      <Input id="signup-email" type="email" placeholder="Enter your email" value={email}
                      onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-password">Password</Label>
                      <Input id="signup-password" type="password" placeholder="Create a password" value={password}
                      onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    
                    <Button className="w-full hover:scale-[1.02] transition-transform" onClick={handleSignup}>Create Account</Button>
                  </div>
                </DialogContent>
              </Dialog>
                </div>
              )}
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <Card className="p-8 shadow-lg animate-slide-up glass-effect hover:shadow-xl transition-shadow">
              <h2 className="text-2xl font-semibold flex items-center gap-2 mb-6">
                <Plus className="h-6 w-6" /> Add Expense
              </h2>
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="amount">Amount</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="amount"
                      type="number"
                      placeholder="0.00"
                      className="pl-10"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <CalendarComponent
                        mode="single"
                        selected={date}
                        onSelect={(date) => date && setDate(date)}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description (Optional)</Label>
                  <Input
                    id="description"
                    placeholder="Enter description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <Button 
                  className="w-full text-lg py-6 transition-all hover:scale-[1.02] bg-gradient-to-r from-primary to-primary/80" 
                  onClick={handleAddExpense}
                >
                  Add Expense
                </Button>
              </div>
            </Card>

            <Card className="p-8 shadow-lg animate-slide-up glass-effect hover:shadow-xl transition-shadow">
              <h2 className="text-2xl font-semibold flex items-center gap-2 mb-6">
                <PieChart className="h-6 w-6" /> Expense Overview
              </h2>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {chartData.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </RechartsChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-6 text-center p-6 rounded-lg bg-gradient-to-r from-primary/10 to-primary/5">
                <p className="text-muted-foreground">Total Expenses</p>
                <p className="text-4xl font-bold mt-2 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
                  ${totalExpenses.toFixed(2)}
                </p>
              </div>
            </Card>
          </div>

          <Card className="mt-8 p-8 shadow-lg animate-fade-in glass-effect hover:shadow-xl transition-shadow">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Recent Expenses</h2>
              <div className="flex items-center gap-4">
                <Select value={filterCategory} onValueChange={setFilterCategory}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-4">
              {filteredExpenses.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground text-lg">
                    No expenses found. {filterCategory === 'all' || !filterCategory ? "Start by adding your first expense!" : "Try changing the filter."}
                  </p>
                </div>
              ) : (
                filteredExpenses.map((expense) => (
                  <div
                    key={expense.id}
                    className="flex items-center justify-between p-4 rounded-lg bg-primary/5 hover:bg-primary/10 transition-all hover:scale-[1.01] group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-2 rounded-full bg-primary/10">
                        <Calendar className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-lg">{expense.category}</p>
                        <div className="flex items-center gap-2">
                          <p className="text-sm text-muted-foreground">
                            {format(new Date(expense.date), 'PPP')}
                          </p>
                          {expense.description && (
                            <>
                              <span className="text-muted-foreground">•</span>
                              <p className="text-sm text-muted-foreground">{expense.description}</p>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <p className="text-xl font-semibold">${expense.amount.toFixed(2)}</p>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => handleDeleteExpense(expense.id)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </Card>
        </div>
      </div>

      <Dialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <DialogContent className="sm:max-w-[425px] glass-effect">
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p>Are you sure you want to delete this expense?</p>
            <div className="flex justify-end gap-4 mt-4">
              <Button variant="outline" onClick={() => setShowDeleteConfirm(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={confirmDelete}>
                Delete
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default App;
