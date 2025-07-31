import ProductList from './components/ProductList'
import Cart from './components/Cart'
import './App.css'

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>Shopping Cart App</h1>
      </header>
      
      <main className="app-main">
        <div className="app-content">
          <ProductList />
          <Cart />
        </div>
      </main>
    </div>
  )
}

export default App
