import React, { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { addToCart, type Product as ProductType } from '../store/cartSlice'

interface ProductProps {
  product: ProductType
}

const Product: React.FC<ProductProps> = ({ product }) => {
  const dispatch = useDispatch()
  const inputRef = useRef<HTMLInputElement>(null)

  const handleAddToCart = () => {
    dispatch(addToCart(product))
    
    // Focus the input field after adding to cart (useRef demonstration)
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  return (
    <div className="product">
      <h3>{product.name}</h3>
      <p>${product.price.toFixed(2)}</p>
      <button onClick={handleAddToCart}>Add to Cart</button>
      <input 
        ref={inputRef}
        type="text" 
        placeholder="Quantity or notes..."
        style={{ marginLeft: '10px', padding: '4px' }}
      />
    </div>
  )
}

export default Product