import React from "react";
import ProductCard from "./ProductCard"; // Tarjeta de producto
import "../../assets/styles/ProductList.css"; // Estilos para el listado

const ProductList = ({ products }) => {
  return (
    <div className="products-container">
      {products.length > 0 ? (
        products.map((product) => (
          <ProductCard
            key={product.uuid}
            image={product.imagePath || "https://via.placeholder.com/200"}
            name={product.name}
            price={product.price}
            productUuid={product.uuid} // Pasar el uuid del producto
          />
        ))
      ) : (
        <p>No hay productos disponibles</p>
      )}
    </div>
  );
};

export default ProductList;
