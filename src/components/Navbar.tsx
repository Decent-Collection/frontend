import './Navbar.css';

type Props = {
  cartCount?: number;
  onLogoClick?: () => void;
  onCartClick?: () => void;
};

export default function Navbar({ cartCount = 0, onLogoClick, onCartClick }: Props) {
  return (
    <header className="navbar">
      <div
        className="navbar__brand"
        onClick={onLogoClick}
        style={{ cursor: onLogoClick ? 'pointer' : undefined }}
      >
        <span className="navbar__logo">DC</span>
        <span className="navbar__title">Decent Collections</span>
      </div>
      <nav className="navbar__links">
        <a href="#men">Men</a>
        <a href="#women">Women</a>
        <a href="#kids">Kids</a>
        <a href="#sale">Sale</a>
      </nav>
      <div className="navbar__actions">
        <input className="navbar__search" type="search" placeholder="Search products..." />
        <button className="navbar__cart" aria-label="Cart" onClick={onCartClick}>
          Cart <span className="navbar__cart-badge">{cartCount}</span>
        </button>
      </div>
    </header>
  );
}
