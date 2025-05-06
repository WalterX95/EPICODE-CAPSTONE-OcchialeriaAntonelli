// utils/userService.js
export async function fetchUsers() {
    const res = await fetch('/data/users.json');
    if (!res.ok) throw new Error(`Impossibile caricare users.json: ${res.status}`);
    return res.json();
  }
  
  export async function createUser(user) {
    const res = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || 'Errore nella creazione utente');
    }
    return res.json();
  }
  