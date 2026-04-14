import { useState } from 'react';
import type { Product } from '../types';
import './ProductPage.css';

type Props = {
  product: Product;
  onBack: () => void;
  onAddToCart?: (product: Product) => void;
};

function Stars({ rating }: { rating: number }) {
  const full = Math.round(rating);
  return (
    <span className="stars" aria-label={`${rating} out of 5 stars`}>
      {'★'.repeat(full)}
      <span className="stars__empty">{'★'.repeat(5 - full)}</span>
    </span>
  );
}

const SIZES = ['XS', 'S', 'M', 'L', 'XL'];

export default function ProductPage({ product, onBack, onAddToCart }: Props) {
  const gallery = product.images && product.images.length > 0 ? product.images : [product.image];
  const [index, setIndex] = useState(0);
  const [size, setSize] = useState('M');

  const reviews = product.reviews ?? [];
  const avg =
    reviews.length > 0 ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length : 0;

  const prev = () => setIndex((i) => (i - 1 + gallery.length) % gallery.length);
  const next = () => setIndex((i) => (i + 1) % gallery.length);

  return (
    <section className="pdp">
      <div className="pdp__crumbs">
        <button className="pdp__back" onClick={onBack}>Shop</button>
        <span className="pdp__sep">/</span>
        <span>{product.category}</span>
        <span className="pdp__sep">/</span>
        <span className="pdp__crumb-current">{product.name}</span>
      </div>

      <div className="pdp__top">
        <div className="pdp__gallery">
          <div className="pdp__thumbs" role="tablist" aria-label="Product images">
            {gallery.map((src, i) => (
              <button
                key={src + i}
                className={`pdp__thumb ${i === index ? 'is-active' : ''}`}
                onClick={() => setIndex(i)}
                aria-label={`View image ${i + 1}`}
              >
                <img src={src} alt="" />
              </button>
            ))}
          </div>

          <div className="pdp__stage">
            <div className="pdp__slider">
              {gallery.map((src, i) => (
                <img
                  key={src + i}
                  src={src}
                  alt={product.name}
                  className={`pdp__slide ${i === index ? 'is-active' : ''}`}
                />
              ))}
              {product.badge && <span className="pdp__badge">{product.badge}</span>}

              {gallery.length > 1 && (
                <>
                  <button className="pdp__nav pdp__nav--prev" onClick={prev} aria-label="Previous image">‹</button>
                  <button className="pdp__nav pdp__nav--next" onClick={next} aria-label="Next image">›</button>
                  <div className="pdp__dots">
                    {gallery.map((_, i) => (
                      <button
                        key={i}
                        className={`pdp__dot ${i === index ? 'is-active' : ''}`}
                        onClick={() => setIndex(i)}
                        aria-label={`Go to image ${i + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="pdp__info">
          <p className="pdp__category">{product.category}</p>
          <h1 className="pdp__name">{product.name}</h1>

          <div className="pdp__rating">
            <Stars rating={avg} />
            <span className="pdp__rating-text">
              {avg.toFixed(1)} · {reviews.length} reviews
            </span>
          </div>

          <p className="pdp__price">₹{product.price.toLocaleString('en-IN')}</p>
          <p className="pdp__tax">Inclusive of all taxes · Free shipping over ₹999</p>

          {product.description && <p className="pdp__desc">{product.description}</p>}

          <div className="pdp__choice">
            <div className="pdp__choice-head">
              <span>Size</span>
              <a className="pdp__sizeguide">Size guide</a>
            </div>
            <div className="pdp__sizes">
              {SIZES.map((s) => (
                <button
                  key={s}
                  className={`pdp__size ${s === size ? 'is-active' : ''}`}
                  onClick={() => setSize(s)}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="pdp__actions">
            <button className="pdp__cta" onClick={() => onAddToCart?.(product)}>
              Add to Bag
            </button>
            <button className="pdp__wish" aria-label="Save to wishlist">♡</button>
          </div>

          <ul className="pdp__perks">
            <li><span>✓</span> Free returns within 30 days</li>
            <li><span>✓</span> Crafted with responsibly sourced materials</li>
            <li><span>✓</span> Ships in 2–4 business days</li>
          </ul>
        </div>
      </div>

      {product.features && product.features.length > 0 && (
        <div className="pdp__section">
          <h2 className="pdp__heading">The Details</h2>
          <ul className="pdp__features">
            {product.features.map((f, i) => (
              <li key={i}>{f}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="pdp__section">
        <div className="pdp__reviews-head">
          <h2 className="pdp__heading">What Customers Say</h2>
          <div className="pdp__reviews-summary">
            <span className="pdp__avg">{avg.toFixed(1)}</span>
            <Stars rating={avg} />
            <span className="pdp__rating-text">Based on {reviews.length} reviews</span>
          </div>
        </div>

        {reviews.length === 0 ? (
          <p className="pdp__empty">No reviews yet.</p>
        ) : (
          <ul className="pdp__reviews">
            {reviews.map((r) => (
              <li key={r.id} className="review">
                <div className="review__avatar">{r.author.charAt(0)}</div>
                <div className="review__content">
                  <div className="review__head">
                    <span className="review__author">{r.author}</span>
                    <Stars rating={r.rating} />
                    <span className="review__date">{r.date}</span>
                  </div>
                  <p className="review__body">{r.comment}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
