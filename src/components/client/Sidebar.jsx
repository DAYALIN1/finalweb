import React, { useState } from "react";
import "../../assets/styles/Sidebar.css";

const Sidebar = ({ onCategorySelect, onSearch, onPriceFilter }) => {
  const [activeCategory, setActiveCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1500);

  const categories = [
    "Tecnología",
    "Moda",
    "Hogar",
    "Belleza",
    "Salud",
    "Accesorios",
    "Deportes",
    "Juguetes",
    "Entretenimiento",
  ];

  const handleCategoryClick = (category) => {
    setActiveCategory(category === activeCategory ? null : category);
    onCategorySelect(category === activeCategory ? null : category);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    onSearch(e.target.value);
  };

  const handlePriceFilter = () => {
    onPriceFilter(minPrice, maxPrice); // Notifica al componente padre
  };

  return (
    <div className="sidebar">
      <h2>Categorías</h2>
      <ul className="category-list">
        {categories.map((category) => (
          <li
            key={category}
            className={`category-item ${
              activeCategory === category ? "active" : ""
            }`}
            onClick={() => handleCategoryClick(category)}
          >
            {category}
          </li>
        ))}
      </ul>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Buscar productos..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>

      <div className="price-filter">
        <h3 className="filter-title">Filtrar por Precio</h3>
        <label htmlFor="min-price">Mínimo:</label>
        <input
          type="number"
          id="min-price"
          value={minPrice}
          onChange={(e) => setMinPrice(Number(e.target.value))}
        />

        <label htmlFor="max-price">Máximo:</label>
        <input
          type="number"
          id="max-price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
        />

        <button className="apply-button" onClick={handlePriceFilter}>
          Aplicar
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
