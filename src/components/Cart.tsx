import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { removeFromCart, type CartItem } from '../store/cartSlice'
import { useCartTotals } from '../hooks/useCartTotals'

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
    <div>
      <h2>Shopping Cart</h2>
      
      {cart.length === 0 ? (
        <p>No items</p>
      ) : (
        <>
          <div>
            {cart.map((item) => (
              <div key={item.id} style={{ marginBottom: '10px', padding: '10px', border: '1px solid #ccc' }}>
                <span>{item.name} x {item.quantity}</span>
                <button 
                  onClick={() => handleRemove(item.id)}
                  style={{ marginLeft: '10px' }}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          
          <div style={{ marginTop: '20px', fontWeight: 'bold' }}>
            <p>Total Items: {items}</p>
            <p>Total Cost: ${cost.toFixed(2)}</p>
          </div>
        </>
      )}
    </div>
  )
}

export default Cart