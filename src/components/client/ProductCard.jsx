import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom"; // Importar el hook para navegar
import "../../assets/styles/ProductCard.css";

const ProductCard = ({ image, name, price, colors, productUuid }) => {
  const navigate = useNavigate(); // Crear una instancia del hook

  const handleViewClick = () => {
    navigate(`/client/product/${productUuid}`); // Redirigir a la página del producto
  };

  return (
    <div className="product-card">
      <img src={image} alt={name} className="product-image" />
      <h3 className="product-name">{name}</h3>
      <p className="product-price">US${price.toFixed(2)}</p>

      {/* Colores disponibles */}
      {colors && colors.length > 0 && (
        <div className="product-colors">
          {colors.map((color, index) => (
            <span
              key={index}
              className="color-circle"
              style={{ backgroundColor: color }}
              title={`Color: ${color}`}
            ></span>
          ))}
        </div>
      )}

      {/* Botón de Ver */}
      <button className="view-button" onClick={handleViewClick}>
        Ver
      </button>
    </div>
  );
};

ProductCard.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  colors: PropTypes.arrayOf(PropTypes.string), // Colores como array de strings
  productUuid: PropTypes.string.isRequired, // El UUID del producto
};

export default ProductCard;
