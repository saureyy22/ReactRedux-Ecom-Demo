import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { removeFromCart, type CartItem } from '../store/cartSlice'
import { useCartTotals } from '../hooks/useCartTotals'
import removeIcon from '../assets/remove-icon.svg'

interface RootState {
  cart: CartItem[]
}

const Cart: React.FC = () => {
  const cart = useSelector((state: RootState) => state.cart)
  const dispatch = useDispatch()
  const { items, cost } = useCartTotals()

  const handleRemove = (productId: number) => {
    dispatch(removeFromCart(productId))
  }

  return (
    <div className="cart">
      <h2>Shopping Cart</h2>
      
      {cart.length === 0 ? (
        <div className="cart-empty">
          <div className="cart-empty-icon"></div>
          <p>Your cart is empty</p>
          <p>Add some products to get started!</p>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {cart.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="cart-item-info">
                  <div className="cart-item-name">{item.name}</div>
                  <div className="cart-item-quantity">Quantity: {item.quantity}</div>
                </div>
                <button 
                  className="btn-danger"
                  onClick={() => handleRemove(item.id)}
                  aria-label={`Remove ${item.name} from cart`}
                >
                  <img src={removeIcon} alt="Remove" width="14" height="14" />
                  Remove
                </button>
              </div>
            ))}
          </div>
          
          <div className="cart-totals">
            <div className="cart-total-item">
              <span>Total Items:</span>
              <span>{items}</span>
            </div>
            <div className="cart-total-item">
              <span>Total Cost:</span>
              <span>${cost.toFixed(2)}</span>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Cart