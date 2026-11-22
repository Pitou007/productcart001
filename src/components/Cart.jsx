const money = (value) => `$${value.toFixed(2)}`

function Cart({ cart, cartCount, subtotal, grandTotal, shippingCost, updateQuantity, removeItem, setPage }) {
  return (
    <main className="cart-page">
      <button className="back-button" onClick={() => setPage('shop')}>← Continue shopping</button>
      <div className="page-title">
        <div>
          <p className="eyebrow">Your selection</p>
          <h1>Shopping cart</h1>
        </div>
        <span>{cartCount} {cartCount === 1 ? 'item' : 'items'}</span>
      </div>
      {cart.length === 0 ? (
        <section className="empty-cart">
          <div>🛒</div>
          <h2>Your cart is empty</h2>
          <p>Add a few essentials to get started.</p>
          <button onClick={() => setPage('shop')}>Browse products</button>
        </section>
      ) : (
        <div className="cart-layout">
          <section className="cart-items">
            {cart.map((item) => (
              <article className="cart-item" key={item.id}>
                <div className={`cart-image ${item.color}`}><span>{item.icon}</span></div>
                <div className="cart-item-details">
                  <p className="item-category">{item.category}</p>
                  <h2>{item.name}</h2>
                  <p>{money(item.price)}</p>
                </div>
                <div className="quantity-control">
                  <button
                    onClick={() => updateQuantity(item.id, -1)}
                    disabled={item.quantity === 1}
                    aria-label={`Decrease ${item.name} quantity`}
                  >
                    −
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, 1)} aria-label={`Increase ${item.name} quantity`}>+</button>
                </div>
                <strong className="line-total">{money(item.price * item.quantity)}</strong>
                <button className="remove-button" onClick={() => removeItem(item.id)} aria-label={`Remove ${item.name}`}>
                  <svg viewBox="0 0 24 24"><path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6M10 10v6M14 10v6" /></svg>
                </button>
              </article>
            ))}
          </section>
          <aside className="summary-card">
            <h2>Order summary</h2>
            <div className="summary-row"><span>Subtotal</span><strong>{money(subtotal)}</strong></div>
            <div className="summary-row"><span>Delivery</span><strong>{shippingCost === 0 ? 'Free' : money(shippingCost)}</strong></div>
            <div className="summary-divider" />
            <div className="summary-total"><span>Total</span><strong>{money(grandTotal)}</strong></div>
            <button className="primary-button" onClick={() => setPage('checkout')}>Proceed to checkout</button>
          </aside>
        </div>
      )}
    </main>
  )
}

export default Cart
