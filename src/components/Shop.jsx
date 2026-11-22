import { products } from '../data/products'

const money = (value) => `$${value.toFixed(2)}`

function Shop({ addToCart }) {
  return (
    <main className="shop-page">
      <div className="shop-heading">
        <div>
          <p className="eyebrow">Curated electronics</p>
          <h1>Find your next essential.</h1>
        </div>
        <p className="shop-copy">Premium everyday technology, selected for work and play.</p>
      </div>
      <div className="product-grid">
        {products.map((product) => (
          <article className="product-card" key={product.id}>
            <div className={`product-visual ${product.color}`}>
              <span className="category-badge">{product.category}</span>
              <span className="product-icon" role="img" aria-label={product.name}>{product.icon}</span>
            </div>
            <div className="product-info">
              <div>
                <h2>{product.name}</h2>
                <p>{money(product.price)}</p>
              </div>
              <button onClick={() => addToCart(product)}>
                <span>Add to cart</span>
                <b>+</b>
              </button>
            </div>
          </article>
        ))}
      </div>
    </main>
  )
}

export default Shop
