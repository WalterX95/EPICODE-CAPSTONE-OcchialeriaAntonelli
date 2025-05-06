import { useSelector, useDispatch } from 'react-redux';
import { clearCart, removeFromCart, updateQuantity } from '../redux/cartSlice';
import { useState } from 'react';

const CartDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const toggleDropdown = () => setIsOpen(!isOpen);

  const total = cartItems
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2);

  const handleCheckout = () => {
    alert('Grazie per il tuo acquisto!');
    dispatch(clearCart());
    setIsOpen(false);
  };

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleQuantityChange = (id, newQty) => {
    dispatch(updateQuantity({ id, quantity: newQty }));
  };

  return (
    <div className="relative ml-4">
      <button
        onClick={toggleDropdown}
        className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
      >
        Carrello ({cartItems.length})
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-96 bg-white border border-gray-200 rounded shadow-lg z-50">
          <div className="p-4 max-h-80 overflow-y-auto">
            {cartItems.length === 0 ? (
              <p className="text-gray-600 text-sm">Il carrello è vuoto.</p>
            ) : (
              cartItems.map((item) => (
                <div key={item.id} className="mb-3 border-b pb-2">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-semibold">{item.name}</div>
                      <div className="text-sm text-gray-500">
                        €{item.price.toFixed(2)}
                      </div>
                    </div>
                    <button
                      onClick={() => handleRemove(item.id)}
                      className="text-red-500 hover:underline text-sm"
                    >
                      Rimuovi
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center">
                      <button
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        className="px-2 py-1 bg-gray-200 rounded disabled:opacity-50"
                      >
                        −
                      </button>
                      <span className="px-3">{item.quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        className="px-2 py-1 bg-gray-200 rounded"
                      >
                        +
                      </button>
                    </div>
                    <div className="font-medium">
                      Tot: €{(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="border-t p-4">
            <div className="flex justify-between font-semibold mb-4">
              <span>Totale:</span>
              <span>€{total}</span>
            </div>
            <button
              onClick={handleCheckout}
              disabled={cartItems.length === 0}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded disabled:opacity-50"
            >
              Acquista Subito
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartDropdown;
