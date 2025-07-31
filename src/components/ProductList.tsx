import React from "react";
import { products } from "../data/products";
import Product from "./Product";

const ProductList: React.FC = () => {
  return (
    <div className="product-list">
      <h2>Available Products</h2>
      <div className="products-grid">
        {products.map((product, index) => (
          <div key={product.id} style={{ animationDelay: `${index * 0.1}s` }}>
            <Product product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
