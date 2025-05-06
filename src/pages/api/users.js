// pages/api/users.js
import { promises as fs } from 'fs';
import path from 'path';

const USERS_PATH = path.join(process.cwd(), 'src', 'assets', 'data', 'users.json');

export default async function handler(req, res) {
  let users = [];
  try {
    const txt = await fs.readFile(USERS_PATH, 'utf8');
    users = JSON.parse(txt);
  } catch (e) {
    users = [];
  }

  if (req.method === 'GET') {
    return res.status(200).json(users);
  }

  if (req.method === 'POST') {
    const newUser = req.body;
    if (newUser.role === 'admin' && users.some(u => u.role === 'admin')) {
      return res.status(400).json({ message: 'Esiste già un amministratore.' });
    }
    newUser.id = Date.now();
    users.push(newUser);
    await fs.writeFile(USERS_PATH, JSON.stringify(users, null, 2));
    return res.status(201).json(newUser);
  }

  res.setHeader('Allow', ['GET','POST']);
  res.status(405).end(`Method ${req.method} non consentito`);
}
