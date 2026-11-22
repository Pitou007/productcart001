function Header({ cartCount, page, setPage }) {
  return (
    <header className="topbar">
      <button className="brand" onClick={() => setPage('shop')} aria-label="Go to shop">
        <span className="brand-mark">N</span>
        <span>NovaTech</span>
      </button>
      <nav className="nav-links" aria-label="Main navigation">
        <button className={page === 'shop' ? 'active' : ''} onClick={() => setPage('shop')}>Shop</button>
        <button onClick={() => setPage('cart')}>Categories</button>
        <button onClick={() => setPage('cart')}>Deals</button>
      </nav>
      <button className="cart-button" onClick={() => setPage('cart')} aria-label="View cart">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M3 3h2l2.4 11.1a2 2 0 0 0 2 1.6h7.8a2 2 0 0 0 2-1.6L20.5 7H6" />
          <circle cx="10" cy="20" r="1" /><circle cx="18" cy="20" r="1" />
        </svg>
        {cartCount > 0 && <span>{cartCount}</span>}
      </button>
    </header>
  )
}

export default Header
