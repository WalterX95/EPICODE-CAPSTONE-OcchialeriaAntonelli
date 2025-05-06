import { useState } from 'react';
import { hashPassword } from '../utils/hashPassword';
import { useDispatch } from 'react-redux';
import { login } from '../redux/userSlice';
import { fetchUsers } from '../utils/userService';

const LoginModal = ({ isOpen, onClose, onLogin, onForgotPassword, onRegister }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const hashed = await hashPassword(password);
    const users = await fetchUsers();
    const user = users.find((u) => u.email === email && u.password === hashed);
    
    if (user) {
      dispatch(login(user));
      localStorage.setItem('currentUser', JSON.stringify(user));
      alert(`Bentornato, ${user.name}`);
      onLogin?.({ email, rememberMe });
      onClose();
    } else {
      alert("Email o password errati.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm border relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-500 to-purple-500"></div>
        <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700" onClick={onClose}>✕</button>

        <div className="flex flex-col items-center">
          <img src="src/assets/img/occhialeriaAntonelli-logo.jpg" alt="Logo" className="w-14 h-14 rounded-full mt-4" />
          <h2 className="text-xl font-semibold mt-2">Benvenuto</h2>
          <p className="text-gray-500 text-sm">Loggati per acquistare</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-6">
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
            className="mt-1 w-full px-3 py-2 border rounded-md" />

          <label className="block text-sm font-medium text-gray-700 mt-4">Password</label>
          <div className="relative">
            <input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} required
              className="mt-1 w-full px-3 py-2 border rounded-md" />
            <span className="absolute right-3 top-3 cursor-pointer text-gray-500" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? '🔒' : '👁'}
            </span>
          </div>

          <div className="flex items-center justify-between mt-4">
            <label className="flex items-center text-sm text-gray-600">
              <input type="checkbox" className="mr-2" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />
              Ricordami
            </label>
            <button type="button" className="text-sm text-blue-500 hover:underline" onClick={onForgotPassword}>Password dimenticata?</button>
          </div>

          <button type="submit" className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md font-semibold">
            Sign In
          </button>

          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Non hai un account?
              <button type="button" className="text-blue-500 hover:underline ml-1" onClick={onRegister}>Registrati</button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
