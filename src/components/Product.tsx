import React, { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { addToCart, type Product as ProductType } from '../store/cartSlice'
import addIcon from '../assets/add-icon.svg'

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
    <div className="product fade-in">
      <h3>{product.name}</h3>
      <div className="product-price">${product.price.toFixed(2)}</div>
      <div className="product-actions">
        <button className="btn-primary" onClick={handleAddToCart}>
          <img src={addIcon} alt="Add" width="16" height="16" />
          Add to Cart
        </button>
        <input 
          ref={inputRef}
          type="text" 
          placeholder="Notes..."
        />
      </div>
    </div>
  )
}

export default Product