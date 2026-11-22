const money = (value) => `$${value.toFixed(2)}`

function Checkout({
  cart,
  customer,
  updateCustomer,
  errors,
  shipping,
  setShipping,
  subtotal,
  shippingCost,
  grandTotal,
  submitOrder,
  setPage,
}) {
  return (
    <main className="checkout-page">
      <button className="back-button" onClick={() => setPage('cart')}>← Back to cart</button>
      <div className="page-title">
        <div><p className="eyebrow">Secure checkout</p><h1>Complete your order</h1></div>
      </div>
      <form className="checkout-layout" onSubmit={submitOrder} noValidate>
        <section className="checkout-form">
          <h2>Contact information</h2>
          <div className="form-grid">
            <label>First name
              <input value={customer.firstName} onChange={(e) => updateCustomer('firstName', e.target.value)} placeholder="John" />
              {errors.firstName && <small>{errors.firstName}</small>}
            </label>
            <label>Last name
              <input value={customer.lastName} onChange={(e) => updateCustomer('lastName', e.target.value)} placeholder="Doe" />
              {errors.lastName && <small>{errors.lastName}</small>}
            </label>
            <label>Email address
              <input type="email" value={customer.email} onChange={(e) => updateCustomer('email', e.target.value)} placeholder="john@example.com" />
              {errors.email && <small>{errors.email}</small>}
            </label>
            <label>Phone number
              <input type="tel" value={customer.phone} onChange={(e) => updateCustomer('phone', e.target.value)} placeholder="+855 12 345 678" />
              {errors.phone && <small>{errors.phone}</small>}
            </label>
            <label className="full-width">Address
              <input value={customer.address} onChange={(e) => updateCustomer('address', e.target.value)} placeholder="Street address, city" />
              {errors.address && <small>{errors.address}</small>}
            </label>
          </div>
          <h2 className="shipping-title">Shipping method</h2>
          <div className="shipping-options">
            <label className={shipping === 'free' ? 'selected' : ''}>
              <input type="radio" name="shipping" value="free" checked={shipping === 'free'} onChange={() => setShipping('free')} />
              <span><b>Standard shipping</b><small>3–5 business days</small></span>
              <strong>Free</strong>
            </label>
            <label className={shipping === 'express' ? 'selected' : ''}>
              <input type="radio" name="shipping" value="express" checked={shipping === 'express'} onChange={() => setShipping('express')} />
              <span><b>Express shipping</b><small>1–2 business days</small></span>
              <strong>$9.00</strong>
            </label>
          </div>
        </section>
        <aside className="summary-card checkout-summary">
          <h2>Your order</h2>
          <div className="checkout-products">
            {cart.map((item) => (
              <div className="checkout-product" key={item.id}>
                <div className={`mini-product ${item.color}`}><span>{item.icon}</span><b>{item.quantity}</b></div>
                <div><strong>{item.name}</strong><small>Qty {item.quantity}</small></div>
                <strong>{money(item.price * item.quantity)}</strong>
              </div>
            ))}
          </div>
          <div className="summary-row"><span>Subtotal</span><strong>{money(subtotal)}</strong></div>
          <div className="summary-row"><span>Shipping</span><strong>{shippingCost === 0 ? 'Free' : money(shippingCost)}</strong></div>
          <div className="summary-divider" />
          <div className="summary-total"><span>Total</span><strong>{money(grandTotal)}</strong></div>
          <button className="primary-button" type="submit">Place order</button>
        </aside>
      </form>
    </main>
  )
}

export default Checkout
