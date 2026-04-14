import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__cols">
        <div>
          <h4>Decent Collections</h4>
          <p>Thoughtful clothing for everyday confidence.</p>
        </div>
        <div>
          <h4>Shop</h4>
          <ul><li>Men</li><li>Women</li><li>Kids</li><li>Sale</li></ul>
        </div>
        <div>
          <h4>Help</h4>
          <ul><li>Contact</li><li>Shipping</li><li>Returns</li><li>FAQ</li></ul>
        </div>
        <div>
          <h4>Follow</h4>
          <ul><li>Instagram</li><li>Facebook</li><li>Twitter</li></ul>
        </div>
      </div>
      <p className="footer__copy">© {new Date().getFullYear()} Decent Collections. All rights reserved.</p>
    </footer>
  );
}
