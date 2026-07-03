import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { addToCart, getProduct } from '../services/api';

export default function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  useEffect(() => {
    let mounted = true;

    async function run() {
      try {
        const data = await getProduct(id);
        if (mounted) setProduct(data);
      } catch (err) {
        if (mounted) setError(err.message);
      }
    }

    run();
    return () => {
      mounted = false;
    };
  }, [id]);

  async function handleAdd() {
    try {
      await addToCart(id, 1);
      setNotice('Added to cart.');
      setTimeout(() => setNotice(''), 1600);
    } catch (err) {
      setError(err.message);
    }
  }

  if (error) return <section className="container page-space"><p className="notice error">{error}</p></section>;
  if (!product) return <section className="container page-space"><p className="notice">Loading product...</p></section>;

  return (
    <section className="container page-space">
      <div className="detail-card glass-panel">
        <div className="detail-media" />
        <div>
          <p className="eyebrow">Product detail</p>
          <h1>{product.title}</h1>
          <p className="detail-copy">{product.description || 'No description provided yet.'}</p>
          <p className="detail-price">${product.price}</p>
          <p className="detail-stock">Inventory: {product.inventory}</p>
          <div className="detail-actions">
            <button type="button" className="btn btn-primary" onClick={handleAdd}>
              Add to cart
            </button>
            <button type="button" className="btn btn-muted" onClick={() => navigate('/cart')}>
              Go to cart
            </button>
          </div>
          {notice ? <p className="notice success">{notice}</p> : null}
        </div>
      </div>
    </section>
  );
}
