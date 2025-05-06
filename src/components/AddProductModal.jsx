import { useState } from 'react';

const AddProductModal = ({ isOpen, onClose, onSave }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');

  if (!isOpen) return null;

  const handleSubmit = e => {
    e.preventDefault();
    onSave({
      id: Date.now(),
      name,
      price: parseFloat(price),
      image,
      description
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-lg w-80">
        <h3 className="text-lg font-bold mb-4">Nuovo Prodotto</h3>
        <input value={name} onChange={e => setName(e.target.value)} placeholder="Nome" className="w-full mb-2 p-2 border" required/>
        <input value={price} onChange={e => setPrice(e.target.value)} placeholder="Prezzo" type="number" className="w-full mb-2 p-2 border" required/>
        <input value={image} onChange={e => setImage(e.target.value)} placeholder="URL Immagine" className="w-full mb-2 p-2 border" required/>
        <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Descrizione" className="w-full mb-2 p-2 border" required/>
        <div className="flex justify-end">
          <button type="button" onClick={onClose} className="mr-2 px-4 py-2">Annulla</button>
          <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Salva</button>
        </div>
      </form>
    </div>
  );
};

export default AddProductModal;
