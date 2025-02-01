// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Input } from '../ui/input.tsx';
// import {Button} from "../ui/button.tsx";
// import {Label} from "../ui/label.tsx"
// import axios from 'axios';

// const LoginPage = () => {
//   const [email, setEmail] = useState<string>('');
//   const [password, setPassword] = useState<string>('');
//   const [error, setError] = useState<string>('');
//   const navigate = useNavigate();

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('http://localhost:5000/login', {
//         email,
//         password,
//       });
//       localStorage.setItem('jwt_token', response.data.token);
//       navigate('/');
//     } catch (err) {
//       setError('Invalid credentials');
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto p-4">
//       <h2 className="text-xl font-bold mb-4">Login</h2>
//       <form onSubmit={handleLogin}>
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
//             onChange={(e:any) => setPassword(e.target.value)}
//             className="w-full"
//           />
//         </div>
//         {error && <p className="text-red-500">{error}</p>}
//         <Button type="submit" className="w-full mt-4">Login</Button>
//       </form>
//     </div>
//   );
// };

// export default LoginPage;
