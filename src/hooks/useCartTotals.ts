import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import type { CartItem } from '../store/cartSlice'

interface RootState {
  cart: CartItem[]
}

interface CartTotals {
  items: number
  cost: number
}

export const useCartTotals = (): CartTotals => {
  const cart = useSelector((state: RootState) => state.cart)

  const totals = useMemo(() => {
    const items = cart.reduce((total, item) => total + item.quantity, 0)
    const cost = cart.reduce((total, item) => total + (item.price * item.quantity), 0)

    return {
      items,
      cost
    }
  }, [cart])

  return totals
}