import { useEffect, useMemo, useState } from 'react';
import ProductCard from '../components/ProductCard';
import { addToCart, listProducts } from '../services/api';

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  useEffect(() => {
    let mounted = true;

    async function run() {
      setLoading(true);
      setError('');
      try {
        const data = await listProducts(page, search);
        if (!mounted) return;
        setProducts(data.results || []);
        setCount(data.count || 0);
      } catch (err) {
        if (!mounted) return;
        setError(err.message);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    run();
    return () => {
      mounted = false;
    };
  }, [page, search]);

  async function handleAdd(productId) {
    try {
      await addToCart(productId, 1);
      setNotice('Product added to cart.');
      setTimeout(() => setNotice(''), 1700);
    } catch (err) {
      setError(err.message);
    }
  }

  const totalPages = useMemo(() => Math.max(1, Math.ceil(count / 10)), [count]);

  return (
    <section className="container page-space">
      <div className="hero">
        <p className="eyebrow">High-performance commerce experience</p>
        <h1>Build trust with a storefront that feels premium on every screen.</h1>
        <p>
          Responsive layouts, clean interactions, and backend-driven products from your Django API.
        </p>
      </div>

      <div className="toolbar glass-panel">
        <input
          value={search}
          onChange={(e) => {
            setPage(1);
            setSearch(e.target.value);
          }}
          placeholder="Search products by title or description"
        />
        <div className="pager">
          <button type="button" className="btn btn-muted" disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>
            Prev
          </button>
          <span>
            Page {page} / {totalPages}
          </span>
          <button
            type="button"
            className="btn btn-muted"
            disabled={page >= totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </button>
        </div>
      </div>

      {notice ? <p className="notice success">{notice}</p> : null}
      {error ? <p className="notice error">{error}</p> : null}
      {loading ? <p className="notice">Loading products...</p> : null}

      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} onAdd={handleAdd} />
        ))}
      </div>
    </section>
  );
}
