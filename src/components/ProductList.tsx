import { useMemo, useState } from 'react';
import type { Product } from '../types';
import ProductCard from './ProductCard';
import './ProductList.css';

type Props = {
  products: Product[];
  onAddToCart?: (product: Product) => void;
  onSelect?: (product: Product) => void;
};

const categories = ['All', 'Men', 'Women', 'Kids'];

export default function ProductList({ products, onAddToCart, onSelect }: Props) {
  const [active, setActive] = useState('All');

  const filtered = useMemo(
    () => (active === 'All' ? products : products.filter((p) => p.category === active)),
    [products, active],
  );

  return (
    <section className="list">
      <div className="list__header">
        <h2 className="list__title">Featured Products</h2>
        <div className="list__filters">
          {categories.map((c) => (
            <button
              key={c}
              className={`list__filter ${active === c ? 'is-active' : ''}`}
              onClick={() => setActive(c)}
            >
              {c}
            </button>
          ))}
        </div>
      </div>
      {filtered.length === 0 ? (
        <p className="list__empty">No products found.</p>
      ) : (
        <div className="list__grid">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} onAddToCart={onAddToCart} onSelect={onSelect} />
          ))}
        </div>
      )}
    </section>
  );
}
