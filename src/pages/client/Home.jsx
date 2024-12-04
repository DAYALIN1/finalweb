import React, { useEffect, useState } from 'react';
import '../../assets/styles/Home.scss';
import modeloFondoRojo from '../../assets/images/modelo_fondo_rojo.png';
import { getLatestProducts } from '../../services/client/productService';

// Importa las imágenes
import brand1 from '../../assets/images/brand1.png';
import brand2 from '../../assets/images/brand2.png';
import brand3 from '../../assets/images/brand3.png';
import brand4 from '../../assets/images/brand4.png';
import brand5 from '../../assets/images/brand5.png';

const Home = () => {
    const [latestProducts, setLatestProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const brands = [brand1, brand2, brand3, brand4, brand5];

    // Cargar los últimos productos al montar el componente
    useEffect(() => {
        const fetchLatestProducts = async () => {
            try {
                const data = await getLatestProducts();
                setLatestProducts(data); // Actualiza el estado con los productos
            } catch (err) {
                setError(err.message || 'Error al cargar los productos');
            } finally {
                setLoading(false); // Desactiva el indicador de carga
            }
        };

        fetchLatestProducts();
    }, []);

    return (
        <div className="home-container">
            {/* Header Section */}
            <section className="header-section">
                <div className="text-content">
                    <h1>TENEMOS TODO LO QUE TE GUSTA</h1>
                    <div className="separator"></div>
                    <p>Todo tipo de productos y accesorios relacionado a lo que quieras</p>
                </div>
                <div className="highlight-banner">
                    <div className="text-content">
                        <h2>NUEVOS PRODUCTOS</h2>
                        <p>¡Ropa, accesorios y más de lo que buscas!</p>
                    </div>
                    <img src={modeloFondoRojo} alt="Nuevos productos" />
                </div>
            </section>

            <hr className="orange-separator" />

            {/* Productos Populares */}
            <section className="popular-products">
                <h2>PRODUCTOS POPULARES</h2>
                <a href="/more-products" className="view-more-link">
                    Ver más...
                </a>
                {loading ? (
                    <p>Cargando productos...</p>
                ) : error ? (
                    <p className="error">{error}</p>
                ) : (
                    <div className="product-cards">
                        {latestProducts.map((product) => (
                            <div className="product-card" key={product.uuid || product._id}>
                                <img
                                    src={product.imagePath || 'https://via.placeholder.com/200x200?text=Producto'}
                                    alt={product.name}
                                />
                                <h3>{product.name}</h3>
                                <span className="category">{product.category}</span>
                                <p>${product.price.toFixed(2)}</p>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            <hr className="orange-separator" />

            {/* Sección de marcas */}
            <section className="brands-section">
                <h2>NUESTRAS MARCAS</h2>
                <div className="brands-grid">
                    {brands.map((brand, index) => (
                        <div className="brand-item" key={index}>
                            <img src={brand} alt={`Brand ${index + 1}`} />
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Home;
