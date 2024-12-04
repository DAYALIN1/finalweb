import React, { useState, useEffect } from "react";
import Sidebar from "../../components/client/Sidebar";
import ProductList from "../../components/client/ProductList";
import "../../assets/styles/ProductPage.css";
import { getPaginatedProducts } from "../../services/client/productService";


const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1500 });

  // Función para cargar productos desde la API
  const fetchProducts = async (page) => {
    try {
      setLoading(true);
      const data = await getPaginatedProducts(page, 10); // Llamada a la API
      setProducts(data.products || []);
      setTotalPages(data.totalPages || 1); // Asignar total de páginas
      setFilteredProducts(data.products || []); // Productos filtrados inicialmente
    } catch (err) {
      setError("Error al cargar los productos: " + err);
    } finally {
      setLoading(false);
    }
  };

  // Filtrar productos por categoría, búsqueda y precio
  useEffect(() => {
    const filtered = products.filter((product) => {
      const matchesCategory = selectedCategory
        ? product.category === selectedCategory
        : true;

      const matchesSearchQuery = product.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      const matchesPrice =
        product.price >= priceRange.min && product.price <= priceRange.max;

      return matchesCategory && matchesSearchQuery && matchesPrice;
    });

    setFilteredProducts(filtered);
  }, [products, selectedCategory, searchQuery, priceRange]);

  // Cargar productos al cambiar la página
  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]);

  return (
    <div className="product-page">
      <div className="product-container">
        <Sidebar
          onCategorySelect={(category) => setSelectedCategory(category)}
          onSearch={(query) => setSearchQuery(query)}
          onPriceFilter={(min, max) =>
            setPriceRange({ min: Number(min), max: Number(max) })
          }
        />

        <div className="product-section">
          {loading ? (
            <p>Cargando productos...</p> // O usa el componente Spinner
          ) : error ? (
            <p className="error">{error}</p>
          ) : (
            <ProductList products={filteredProducts} />
          )}

          <div className="pagination">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Anterior
            </button>
            <span>
              Página {currentPage} de {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Siguiente
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProductPage;