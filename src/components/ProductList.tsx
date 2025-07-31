import React from "react";
import { products } from "../data/products";
import Product from "./Product";

const ProductList: React.FC = () => {
  return (
    <div className="product-list">
      <h2>Products</h2>
      <div className="products-grid">
        {products.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
