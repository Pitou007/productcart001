import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import Shop from './components/Shop'
import Cart from './components/Cart'
import Checkout from './components/Checkout'
import Confirmation from './components/Confirmation'

function App() {
  const [page, setPage] = useState('shop')
  const [cart, setCart] = useState([])
  const [shipping, setShipping] = useState('free')
  const [customer, setCustomer] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
  })
  const [errors, setErrors] = useState({})
  const [order, setOrder] = useState(null)

  let cartCount = 0
  let subtotal = 0

  for (let i = 0; i < cart.length; i++) {
    cartCount = cartCount + cart[i].quantity
    subtotal = subtotal + cart[i].price * cart[i].quantity
  }

  let shippingCost = 0
  if (shipping === 'express') {
    shippingCost = 9
  }

  const grandTotal = subtotal + shippingCost

  function addToCart(product) {
    const updatedCart = [...cart]
    const itemIndex = updatedCart.findIndex((cartItem) => cartItem.id === product.id)

    if (itemIndex >= 0) {
      updatedCart[itemIndex] = {
        ...updatedCart[itemIndex],
        quantity: updatedCart[itemIndex].quantity + 1,
      }
    } else {
      updatedCart.push({ ...product, quantity: 1 })
    }

    setCart(updatedCart)
  }

  function updateQuantity(id, amount) {
    const updatedCart = cart.map((item) => {
      if (item.id === id) {
        return { ...item, quantity: item.quantity + amount }
      }

      return item
    })

    setCart(updatedCart.filter((item) => item.quantity > 0))
  }

  function removeItem(id) {
    const updatedCart = cart.filter((item) => item.id !== id)
    setCart(updatedCart)
  }

  function updateCustomer(field, value) {
    setCustomer({ ...customer, [field]: value })
    setErrors({ ...errors, [field]: '' })
  }

  function submitOrder(event) {
    event.preventDefault()

    const newErrors = {}

    if (customer.firstName === '') {
      newErrors.firstName = 'First name is required'
    }
    if (customer.lastName === '') {
      newErrors.lastName = 'Last name is required'
    }
    if (customer.email === '') {
      newErrors.email = 'Email is required'
    } else if (!customer.email.includes('@')) {
      newErrors.email = 'Enter a valid email'
    }
    if (customer.phone === '') {
      newErrors.phone = 'Phone number is required'
    }
    if (customer.address === '') {
      newErrors.address = 'Address is required'
    }

    setErrors(newErrors)

    if (Object.keys(newErrors).length === 0) {
      const newOrder = {
        id: 'ORD-0001',
        date: new Date().toLocaleDateString(),
        customer: customer.firstName + ' ' + customer.lastName,
        items: cart,
        total: grandTotal,
      }

      setOrder(newOrder)
      setPage('confirmation')
    }
  }

  function continueShopping() {
    setCart([])
    setCustomer({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
    })
    setOrder(null)
    setPage('shop')
  }

  return (
    <div className="app-shell">
      <Header cartCount={cartCount} page={page} setPage={setPage} />

      {page === 'shop' && <Shop addToCart={addToCart} />}

      {page === 'cart' && (
        <Cart
          cart={cart}
          cartCount={cartCount}
          subtotal={subtotal}
          grandTotal={grandTotal}
          shippingCost={shippingCost}
          updateQuantity={updateQuantity}
          removeItem={removeItem}
          setPage={setPage}
        />
      )}

      {page === 'checkout' && (
        <Checkout
          cart={cart}
          customer={customer}
          updateCustomer={updateCustomer}
          errors={errors}
          shipping={shipping}
          setShipping={setShipping}
          subtotal={subtotal}
          shippingCost={shippingCost}
          grandTotal={grandTotal}
          submitOrder={submitOrder}
          setPage={setPage}
        />
      )}

      {page === 'confirmation' && order && (
        <Confirmation
          order={order}
          customer={customer}
          continueShopping={continueShopping}
        />
      )}
    </div>
  )
}

export default App
