import type { Product } from '../types';
import './CartPage.css';

export type CartItem = {
  product: Product;
  quantity: number;
};

type Props = {
  items: CartItem[];
  onUpdateQty: (productId: string, quantity: number) => void;
  onRemove: (productId: string) => void;
  onContinue: () => void;
};

const SHIPPING_THRESHOLD = 999;
const SHIPPING_FEE = 99;

export default function CartPage({ items, onUpdateQty, onRemove, onContinue }: Props) {
  const subtotal = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
  const shipping = subtotal === 0 || subtotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
  const total = subtotal + shipping;
  const remaining = Math.max(0, SHIPPING_THRESHOLD - subtotal);
  const progress = Math.min(100, (subtotal / SHIPPING_THRESHOLD) * 100);

  if (items.length === 0) {
    return (
      <section className="cart">
        <header className="cart__header">
          <p className="cart__eyebrow">Your Bag</p>
          <h1 className="cart__title">Shopping Bag</h1>
        </header>
        <div className="cart__empty">
          <div className="cart__empty-icon">◇</div>
          <h2>Your bag is empty</h2>
          <p>Discover timeless pieces curated for every occasion.</p>
          <button className="cart__continue" onClick={onContinue}>Continue Shopping</button>
        </div>
      </section>
    );
  }

  return (
    <section className="cart">
      <header className="cart__header">
        <p className="cart__eyebrow">Your Bag</p>
        <h1 className="cart__title">Shopping Bag</h1>
        <p className="cart__count">{items.length} {items.length === 1 ? 'item' : 'items'}</p>
      </header>

      <div className="cart__layout">
        <ul className="cart__list">
          {items.map(({ product, quantity }) => (
            <li key={product.id} className="line">
              <div className="line__media">
                <img src={product.image} alt={product.name} />
              </div>
              <div className="line__body">
                <div className="line__top">
                  <div>
                    <p className="line__category">{product.category}</p>
                    <h3 className="line__name">{product.name}</h3>
                  </div>
                  <p className="line__price">₹{(product.price * quantity).toLocaleString('en-IN')}</p>
                </div>
                <p className="line__unit">₹{product.price.toLocaleString('en-IN')} each</p>
                <div className="line__bottom">
                  <div className="qty">
                    <button
                      className="qty__btn"
                      onClick={() => onUpdateQty(product.id, Math.max(1, quantity - 1))}
                      aria-label="Decrease quantity"
                    >−</button>
                    <span className="qty__value">{quantity}</span>
                    <button
                      className="qty__btn"
                      onClick={() => onUpdateQty(product.id, quantity + 1)}
                      aria-label="Increase quantity"
                    >+</button>
                  </div>
                  <button className="line__remove" onClick={() => onRemove(product.id)}>
                    Remove
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <aside className="cart__summary">
          <h2 className="summary__title">Order Summary</h2>

          {remaining > 0 ? (
            <div className="summary__shipping-bar">
              <p>Add ₹{remaining.toLocaleString('en-IN')} more for free shipping</p>
              <div className="bar"><div className="bar__fill" style={{ width: `${progress}%` }} /></div>
            </div>
          ) : (
            <p className="summary__free">✓ You've unlocked free shipping</p>
          )}

          <dl className="summary__rows">
            <div className="summary__row">
              <dt>Subtotal</dt>
              <dd>₹{subtotal.toLocaleString('en-IN')}</dd>
            </div>
            <div className="summary__row">
              <dt>Shipping</dt>
              <dd>{shipping === 0 ? 'Free' : `₹${shipping.toLocaleString('en-IN')}`}</dd>
            </div>
            <div className="summary__row summary__row--total">
              <dt>Total</dt>
              <dd>₹{total.toLocaleString('en-IN')}</dd>
            </div>
          </dl>
          <p className="summary__tax">Inclusive of all taxes</p>

          <button className="summary__checkout">Proceed to Checkout</button>
          <button className="summary__continue" onClick={onContinue}>Continue Shopping</button>

          <ul className="summary__perks">
            <li><span>✓</span> Free returns within 30 days</li>
            <li><span>✓</span> Secure checkout</li>
          </ul>
        </aside>
      </div>
    </section>
  );
}
