import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductList from './components/ProductList';
import ProductPage from './components/ProductPage';
import CartPage, { type CartItem } from './components/CartPage';
import Footer from './components/Footer';
import { products } from './data/products';
import type { Product } from './types';
import './App.css';

type View = 'home' | 'product' | 'cart';

function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selected, setSelected] = useState<Product | null>(null);
  const [view, setView] = useState<View>('home');

  const cartCount = cart.reduce((sum, i) => sum + i.quantity, 0);

  const handleAddToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i,
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const handleUpdateQty = (productId: string, quantity: number) => {
    setCart((prev) =>
      prev.map((i) => (i.product.id === productId ? { ...i, quantity } : i)),
    );
  };

  const handleRemove = (productId: string) => {
    setCart((prev) => prev.filter((i) => i.product.id !== productId));
  };

  const goHome = () => {
    setSelected(null);
    setView('home');
  };

  const openProduct = (product: Product) => {
    setSelected(product);
    setView('product');
  };

  return (
    <div className="app">
      <Navbar
        cartCount={cartCount}
        onLogoClick={goHome}
        onCartClick={() => setView('cart')}
      />
      <main>
        {view === 'cart' ? (
          <CartPage
            items={cart}
            onUpdateQty={handleUpdateQty}
            onRemove={handleRemove}
            onContinue={goHome}
          />
        ) : view === 'product' && selected ? (
          <ProductPage
            product={selected}
            onBack={goHome}
            onAddToCart={handleAddToCart}
          />
        ) : (
          <>
            <Hero />
            <ProductList
              products={products}
              onAddToCart={handleAddToCart}
              onSelect={openProduct}
            />
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;
