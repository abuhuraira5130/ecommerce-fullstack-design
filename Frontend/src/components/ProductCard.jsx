import { Link } from 'react-router-dom';

export default function ProductCard({ product, onAdd }) {
  return (
    <article className="product-card glass-panel">
      <div className="product-media">
        <span>PKR</span>
      </div>
      <div className="product-body">
        <h3>{product.title}</h3>
        <p className="product-description">{product.description || 'Quality curated product ready to ship.'}</p>
        <div className="product-meta">
          <strong>${product.price}</strong>
          <span>Stock: {product.inventory}</span>
        </div>
        <div className="product-actions">
          <Link to={`/product/${product.id}`} className="btn btn-muted">
            View
          </Link>
          <button type="button" className="btn btn-primary" onClick={() => onAdd(product.id)}>
            Add to cart
          </button>
        </div>
      </div>
    </article>
  );
}
