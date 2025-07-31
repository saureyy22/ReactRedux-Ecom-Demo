# Design Document

## Overview

The Shopping Cart App is a React-based single-page application that demonstrates modern React patterns and state management. The application uses Redux Toolkit for global state management, implements performance optimizations with useMemo, utilizes useRef for DOM manipulation, and showcases custom hooks for reusable logic. The app provides a minimal but complete e-commerce experience with product browsing and cart management functionality.

## Architecture

The application follows a modular React architecture with clear separation of concerns:

- **Presentation Layer**: React components for UI rendering
- **State Management Layer**: Redux store with slices for cart management
- **Data Layer**: Static product data and custom hooks for derived state
- **Business Logic Layer**: Redux reducers and custom hooks

### Technology Stack
- React 18+ with Vite for development
- Redux Toolkit for state management
- React-Redux for React-Redux integration

## Components and Interfaces

### Component Hierarchy
```
App
├── ProductList
│   └── Product (multiple instances)
└── Cart
```

### Component Specifications

#### App Component
- **Purpose**: Root component that renders the main layout
- **Props**: None
- **State**: None (uses Redux for global state)
- **Responsibilities**: Layout and component composition

#### ProductList Component
- **Purpose**: Renders the list of available products
- **Props**: None
- **Data Source**: Imports products from `data/products.js`
- **Responsibilities**: Map over products and render Product components

#### Product Component
- **Purpose**: Displays individual product information and add-to-cart functionality
- **Props**: `product` object with `id`, `name`, and `price`
- **Hooks Used**: `useDispatch`, `useRef`
- **Responsibilities**: 
  - Display product information
  - Handle add-to-cart action
  - Focus input field after adding to cart (useRef demonstration)

#### Cart Component
- **Purpose**: Displays cart contents and totals
- **Props**: None
- **Hooks Used**: `useSelector`, `useDispatch`, custom `useCartTotals`
- **Responsibilities**:
  - Display cart items with quantities
  - Handle item removal
  - Show calculated totals

### Custom Hooks

#### useCartTotals Hook
- **Purpose**: Calculate cart totals with memoization
- **Returns**: Object with `items` (total quantity) and `cost` (total price)
- **Performance**: Uses `useMemo` to prevent unnecessary recalculations
- **Dependencies**: Cart state from Redux

## Data Models

### Product Model
```javascript
{
  id: number,        // Unique identifier
  name: string,      // Product name
  price: number      // Product price in dollars
}
```

### Cart Item Model
```javascript
{
  id: number,        // Product ID
  name: string,      // Product name
  price: number,     // Product price
  quantity: number   // Quantity in cart
}
```

### Cart State Structure
```javascript
// Redux state.cart
[
  {
    id: 1,
    name: "Laptop",
    price: 500,
    quantity: 2
  },
  // ... more cart items
]
```

## State Management

### Redux Store Structure
```javascript
{
  cart: CartItem[]  // Array of cart items
}
```

### Redux Actions
- `addToCart(product)`: Adds product to cart or increments quantity
- `removeFromCart(productId)`: Removes product completely from cart

### Redux Reducers
- **addToCart**: Checks if item exists, increments quantity or adds new item
- **removeFromCart**: Filters out the specified product by ID

## Error Handling

### Client-Side Error Handling
- **Missing Product Data**: Components handle empty product arrays gracefully
- **Invalid Product IDs**: Redux reducers use safe array methods (find, filter)
- **Empty Cart State**: Cart component displays appropriate "No items" message

### Input Validation
- Product data is assumed to be valid (static data source)
- Redux actions expect valid product objects with required fields

## Testing Strategy

### Unit Testing Approach
- **Redux Reducers**: Test state transitions for add/remove actions
- **Custom Hooks**: Test useCartTotals calculations and memoization
- **Components**: Test rendering and user interactions

### Integration Testing
- **Redux Integration**: Test component-store interactions
- **User Workflows**: Test complete add-to-cart and remove-from-cart flows

### Performance Testing
- **useMemo Effectiveness**: Verify totals calculation optimization
- **Re-render Optimization**: Ensure minimal unnecessary re-renders

## File Structure

```
src/
├── App.jsx                 # Root component
├── main.jsx                # Application entry point
├── store/
│   ├── index.js           # Redux store configuration
│   └── cartSlice.js       # Cart state slice
├── components/
│   ├── ProductList.jsx    # Product list container
│   ├── Cart.jsx           # Cart display and management
│   └── Product.jsx        # Individual product component
├── hooks/
│   └── useCartTotals.js   # Custom hook for cart calculations
└── data/
    └── products.js        # Static product data
```

## Performance Considerations

### Optimization Strategies
- **useMemo**: Used in useCartTotals to prevent recalculation on every render
- **useRef**: Used for DOM manipulation without causing re-renders
- **Redux Selectors**: Efficient state selection to minimize component updates

### Scalability Notes
- Current design supports small to medium product catalogs
- Cart state is kept in memory (suitable for demo purposes)
- Component structure allows for easy extension and feature additions