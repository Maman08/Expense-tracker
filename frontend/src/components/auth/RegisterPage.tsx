// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Input } from '../ui/input.tsx';
// import {Button} from "../ui/button.tsx";
// import {Label} from "../ui/label.tsx"
// import axios from 'axios';

// const RegisterPage = () => {
//   const [email, setEmail] = useState<string>('');
//   const [password, setPassword] = useState<string>('');
//   const [error, setError] = useState<string>('');
//   const navigate = useNavigate();

//   const handleRegister = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       await axios.post('http://localhost:5000/register', { email, password });
//       navigate('/login');
//     } catch (err) {
//       setError('Registration failed');
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto p-4">
//       <h2 className="text-xl font-bold mb-4">Register</h2>
//       <form onSubmit={handleRegister}>
//         <div className="mb-4">
//           <Label htmlFor="email">Email</Label>
//           <Input
//             id="email"
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="w-full"
//           />
//         </div>
//         <div className="mb-4">
//           <Label htmlFor="password">Password</Label>
//           <Input
//             id="password"
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="w-full"
//           />
//         </div>
//         {error && <p className="text-red-500">{error}</p>}
//         <Button type="submit" className="w-full mt-4">Register</Button>
//       </form>
//     </div>
//   );
// };

// export default RegisterPage;
