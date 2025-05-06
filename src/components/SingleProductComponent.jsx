import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const SingleProductComponent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`/src/assets/data/products.json`)
      .then(res => res.json())
      .then(data => {
        const foundProduct = data.find(p => p.id.toString() === id);
        setProduct(foundProduct);
      })
      .catch(err => console.error('Errore durante il fetch:', err));
  }, [id]);

  const handleClose = () => {
    navigate(-1); // Torna alla pagina precedente
  };

  if (!product) return <div>Caricamento...</div>;

  return (
    <div style={modalBackdropStyle}>
      <div style={modalContentStyle}>
        <button 
          onClick={handleClose} 
          style={closeButtonStyle}
          aria-label="Chiudi modale"
        >
          &times;
        </button>
        
        <div style={productInfoStyle}>
          <h2 style={{ marginTop: 0 }}>{product.name}</h2>
          <p>{product.description}</p>
          <p style={priceStyle}>€{product.price}</p>
        </div>
      </div>
    </div>
  );
}

// Stili inline (puoi sostituire con CSS classes)
const modalBackdropStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000,
};

const modalContentStyle = {
  backgroundColor: 'white',
  padding: '2rem',
  borderRadius: '8px',
  position: 'relative',
  maxWidth: '600px',
  width: '90%',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
};

const closeButtonStyle = {
  position: 'absolute',
  top: '1rem',
  right: '1rem',
  background: 'none',
  border: 'none',
  fontSize: '1.5rem',
  cursor: 'pointer',
  color: '#666',
};

const productInfoStyle = {
  lineHeight: '1.6',
};

const priceStyle = {
  fontSize: '1.4rem',
  fontWeight: 'bold',
  color: '#2c3e50',
  marginTop: '1rem',
};

export default SingleProductComponent;