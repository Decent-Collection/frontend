import type { Product } from '../types';
import './ProductCard.css';

type Props = {
  product: Product;
  onAddToCart?: (product: Product) => void;
  onSelect?: (product: Product) => void;
};

export default function ProductCard({ product, onAddToCart, onSelect }: Props) {
  return (
    <article className="card">
      <div className="card__media" onClick={() => onSelect?.(product)} style={{ cursor: onSelect ? 'pointer' : undefined }}>
        <img src={product.image} alt={product.name} loading="lazy" />
        {product.badge && <span className="card__badge">{product.badge}</span>}
      </div>
      <div className="card__body">
        <p className="card__category">{product.category}</p>
        <h3 className="card__name" onClick={() => onSelect?.(product)} style={{ cursor: onSelect ? 'pointer' : undefined }}>
          {product.name}
        </h3>
        <div className="card__row">
          <span className="card__price">₹{product.price.toLocaleString('en-IN')}</span>
          <button className="card__btn" onClick={() => onAddToCart?.(product)}>
            Add to Cart
          </button>
        </div>
      </div>
    </article>
  );
}
