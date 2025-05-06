import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import { addProduct, fetchProducts } from '../redux/productSlice';
import ShopFilterComponent from './ShopFilterComponent';
import AddProductModal from './AddProductModal';

const ShopProductPage = ({ dataUrl }) => {
  const [products, setProducts] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);

  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.user.currentUser);

  useEffect(() => {
    if (dataUrl) {
      dispatch(fetchProducts(dataUrl))
        .unwrap()
        .then(data => setProducts(data))
        .catch(err => {
          console.error("Errore durante il fetch dei prodotti:", err);
          setProducts([]);
        });
    }
  }, [dataUrl, dispatch]);

  const handleSave = (newProd) => {
    dispatch(addProduct(newProd));
    setProducts(prev => [...prev, newProd]);
    setIsAddOpen(false);
  };

  return (
    <div className="bg-gray-900 py-16">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-white">I nostri Prodotti</h2>
          <div className="flex gap-4">
            <button
              onClick={() => setIsFilterOpen(true)}
              className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-500"
            >
              Filtra Prodotti
            </button>
            {currentUser?.role === 'admin' && (
              <button
                onClick={() => setIsAddOpen(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500"
              >
                Aggiungi Prodotto
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.length > 0 ? (
            products.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-lg p-8">
                <img
                  className="object-cover w-full h-48 mb-4"
                  src={product.image}
                  alt={product.name}
                />
                <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                <p className="text-gray-500 text-sm mb-4">{product.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-gray-900 font-bold text-lg">€{product.price.toFixed(2)}</span>
                  <button
                    onClick={() => dispatch(addToCart(product))}
                    className="bg-gray-900 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800"
                  >
                    Aggiungi al carrello
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-white col-span-full text-center">Nessun prodotto disponibile.</p>
          )}
        </div>
      </div>

      {/* Modale di filtro */}
      <ShopFilterComponent
        dataUrl={dataUrl}
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
      />

      {/* Modale aggiungi prodotto per admin */}
      <AddProductModal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onSave={handleSave}
      />
    </div>
  );
};

export default ShopProductPage;
