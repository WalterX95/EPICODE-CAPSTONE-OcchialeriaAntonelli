import { useState } from 'react';
import { hashPassword } from '../utils/hashPassword';
import { createUser, fetchUsers } from '../utils/userService';

const RegisterModal = ({ isOpen, onClose }) => {
  const [role, setRole] = useState('customer');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  if (!isOpen) return null;

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Le password non corrispondono.");
      return;
    }

    const hashed = await hashPassword(password);
    const newUser = { name, email, password: hashed, role };

    const users = await fetchUsers();
    if (users.some((u) => u.email === email)) {
      alert("Questa email è già registrata.");
      return;
    }
    if (role === 'admin' && users.some((u) => u.role === 'admin')) {
      alert("Esiste già un amministratore.");
      return;
    }

    try {
      await createUser(newUser);
      alert("Registrazione completata!");
      onClose();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm relative">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-purple-500 to-indigo-500"></div>
        <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700" onClick={onClose}>✕</button>

        <div className="text-center mb-6">
          <img src="src/assets/img/occhialeriaAntonelli-logo.jpg" alt="Logo" className="w-14 h-14 rounded-full mx-auto" />
          <h2 className="text-xl font-semibold mt-2">Crea un Account</h2>
          <p className="text-sm text-gray-500">Registrati per iniziare a comprare</p>
        </div>

        <form onSubmit={handleRegister}>
          <label className="block text-sm font-medium text-gray-700 mt-4">Ruolo</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
          >
            <option value="customer">Customer</option>
            <option value="admin">Admin</option>
          </select>

          <label className="block text-sm font-medium text-gray-700 mt-4">Nome</label>
          <input type="text" className="mt-1 w-full px-3 py-2 border rounded-md" value={name} onChange={(e) => setName(e.target.value)} required />

          <label className="block text-sm font-medium text-gray-700 mt-4">Email</label>
          <input type="email" className="mt-1 w-full px-3 py-2 border rounded-md" value={email} onChange={(e) => setEmail(e.target.value)} required />

          <label className="block text-sm font-medium text-gray-700 mt-4">Password</label>
          <div className="relative">
            <input type={showPassword ? 'text' : 'password'} className="mt-1 w-full px-3 py-2 border rounded-md" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <span className="absolute right-3 top-3 cursor-pointer text-gray-500" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? '🔒' : '👁'}
            </span>
          </div>

          <label className="block text-sm font-medium text-gray-700 mt=4">Conferma Password</label>
          <input type="password" className="mt-1 w-full px-3 py-2 border rounded-md" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />

          <button type="submit" className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md font-semibold">
            Registrati
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterModal;
