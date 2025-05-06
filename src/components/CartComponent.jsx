import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, updateQuantity, clearCart } from '../redux/cartSlice';

const CartComponent = () => {
  const cartItems = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);

  if (cartItems.length === 0) {
    return <p className="text-center text-white">Il carrello è vuoto.</p>;
  }

  return (
    <div className="p-6 bg-white rounded-xl shadow max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Carrello</h2>

      {cartItems.map(item => (
        <div key={item.id} className="flex justify-between items-center py-2 border-b">
          <div>
            <p className="font-medium">{item.name}</p>
            <p className="text-sm text-gray-500">${item.price} × {item.quantity}</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))}
              disabled={item.quantity <= 1}
              className="px-2 bg-gray-200 rounded"
            >−</button>
            <span>{item.quantity}</span>
            <button
              onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}
              className="px-2 bg-gray-200 rounded"
            >+</button>
            <button
              onClick={() => dispatch(removeFromCart(item.id))}
              className="text-red-500 ml-4 hover:underline text-sm"
            >Rimuovi</button>
          </div>
        </div>
      ))}

      <div className="mt-4 font-bold text-lg flex justify-between">
        <span>Totale:</span>
        <span>${total}</span>
      </div>

      <button
        onClick={() => dispatch(clearCart())}
        className="mt-6 w-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
      >
        Svuota Carrello
      </button>
    </div>
  );
};

export default CartComponent;
