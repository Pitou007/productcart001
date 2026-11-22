const money = (value) => `$${value.toFixed(2)}`

function Confirmation({ order, customer, continueShopping }) {
  return (
    <main className="confirmation-page">
      <section className="confirmation-card">
        <div className="success-icon">✓</div>
        <p className="eyebrow">Thank you</p>
        <h1>Order placed successfully!</h1>
        <p className="confirmation-copy">We’ve sent a confirmation email to {customer.email}.</p>
        <div className="order-meta">
          <div><span>Order ID</span><strong>{order.id}</strong></div>
          <div><span>Order date</span><strong>{order.date}</strong></div>
          <div><span>Customer</span><strong>{order.customer}</strong></div>
          <div><span>Status</span><strong className="status">Pending</strong></div>
        </div>
        <div className="ordered-products">
          <h2>Ordered products</h2>
          {order.items.map((item) => (
            <div className="ordered-product" key={item.id}>
              <div className={`mini-product ${item.color}`}><span>{item.icon}</span></div>
              <div><strong>{item.name}</strong><small>Qty {item.quantity}</small></div>
              <strong>{money(item.price * item.quantity)}</strong>
            </div>
          ))}
        </div>
        <div className="confirmation-total"><span>Total amount</span><strong>{money(order.total)}</strong></div>
        <button className="primary-button" onClick={continueShopping}>Continue shopping</button>
      </section>
    </main>
  )
}

export default Confirmation
