import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
}

export interface Product {
  id: number
  name: string
  price: number
}

const initialState: CartItem[] = []

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const product = action.payload
      const existingItem = state.find(item => item.id === product.id)
      
      if (existingItem) {
        // If item exists, increment quantity
        existingItem.quantity += 1
      } else {
        // If item doesn't exist, add new item with quantity 1
        state.push({
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: 1
        })
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      const productId = action.payload
      return state.filter(item => item.id !== productId)
    },
  },
})

export const { addToCart, removeFromCart } = cartSlice.actions
export default cartSlice.reducer