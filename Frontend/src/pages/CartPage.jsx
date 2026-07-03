import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { createOrderFromCart, getCart, removeCartItem, updateCartItem } from '../services/api';
import { useAuth } from '../hooks/useAuth';

export default function CartPage() {
  const { isAuthenticated } = useAuth();
  const [cart, setCart] = useState(null);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  async function loadCart() {
    try {
      setError('');
      const data = await getCart();
      setCart(data);
    } catch (err) {
      setError(err.message);
    }
  }

  useEffect(() => {
    loadCart();
  }, []);

  async function changeQty(itemId, nextQty) {
    try {
      if (nextQty <= 0) {
        await removeCartItem(itemId);
      } else {
        await updateCartItem(itemId, nextQty);
      }
      await loadCart();
    } catch (err) {
      setError(err.message);
    }
  }

  async function placeOrder() {
    try {
      setError('');
      await createOrderFromCart();
      setNotice('Order placed successfully.');
      await loadCart();
    } catch (err) {
      setError(err.message);
    }
  }

  const total = useMemo(() => Number(cart?.total_price || 0).toFixed(2), [cart]);

  return (
    <section className="container page-space">
      <h1>Cart</h1>
      {notice ? <p className="notice success">{notice}</p> : null}
      {error ? <p className="notice error">{error}</p> : null}

      <div className="cart-grid">
        <div className="glass-panel cart-items">
          {(cart?.items || []).length === 0 ? (
            <p>Your cart is empty. <Link to="/">Browse products</Link></p>
          ) : (
            (cart?.items || []).map((item) => (
              <article key={item.id} className="cart-item">
                <div>
                  <h3>{item.product.title}</h3>
                  <p>${item.product.price}</p>
                </div>
                <div className="qty-controls">
                  <button type="button" className="btn btn-muted" onClick={() => changeQty(item.id, item.quantity - 1)}>
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button type="button" className="btn btn-muted" onClick={() => changeQty(item.id, item.quantity + 1)}>
                    +
                  </button>
                </div>
              </article>
            ))
          )}
        </div>

        <aside className="glass-panel cart-summary">
          <p>Order Summary</p>
          <h2>${total}</h2>
          {!isAuthenticated ? (
            <p>Login required before checkout.</p>
          ) : null}
          <button
            type="button"
            className="btn btn-primary"
            onClick={placeOrder}
            disabled={!isAuthenticated || (cart?.items || []).length === 0}
          >
            Place order
          </button>
        </aside>
      </div>
    </section>
  );
}
