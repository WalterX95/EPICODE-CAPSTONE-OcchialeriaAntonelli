import React, { useState } from 'react';


const ContattiComponent = ({
  address = "Via Roma 123, Napoli, Italia",
  phone = "+39 081 1234567",
  email = "info@occhialeria.it"
}) => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch('/public/data/contact.js', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (!res.ok) {
        // Try parse error message
        let errMsg = `Errore ${res.status}`;
        try {
          const errJson = await res.json();
          errMsg = errJson.error || errMsg;
        } catch {}
        throw new Error(errMsg);
      }
      alert('Messaggio inviato con successo!');
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      alert('Errore nell\'invio: ' + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="container mx-auto px-6 py-8">
      <h2 className="text-3xl font-bold text-center mb-8">Contattaci</h2>
      <div className="flex flex-col lg:flex-row lg:space-x-8">
        {/* Google Map iframe */}
        <div className="w-full lg:w-1/2 h-96 md:h-[500px] rounded-lg overflow-hidden mb-6 lg:mb-0">
          <iframe
            title="Mappa Napoli"
            src={`https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`}
            className="w-full h-full rounded-lg border-0"
            allowFullScreen
            loading="lazy"
          ></iframe>
          <div className="mt-4 space-y-2">
            <p><strong>Indirizzo:</strong> {address}</p>
            <p><strong>Telefono:</strong> {phone}</p>
            <p><strong>Email:</strong> {email}</p>
          </div>
        </div>

        {/* Contact form */}
        <form onSubmit={handleSubmit} className="w-full lg:w-1/2 bg-white p-6 rounded-lg shadow-md">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nome</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-1 w-full px-3 py-2 border rounded-md mb-4"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 w-full px-3 py-2 border rounded-md mb-4"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Messaggio</label>
            <textarea
              name="message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              required
              className="mt-1 w-full px-3 py-2 border rounded-md mb-4"
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md font-semibold disabled:opacity-50"
          >
            {submitting ? 'Invio in corso...' : 'Invia messaggio'}
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContattiComponent;
