import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../../assets/styles/ProductDetail.scss";
import { getProductById } from "../../services/client/productService";
import { addToCart } from "../../services/client/cartService"; // Servicio para el carrito

const ProductDetail = () => {
    const { uuid } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [customSelections, setCustomSelections] = useState({});
    const [cantidad, setCantidad] = useState(1); // Por defecto, cantidad mínima es 1
    const [cartMessage, setCartMessage] = useState(null); // Mensajes de feedback para el carrito
    const [isLoadingCart, setIsLoadingCart] = useState(false); // Estado para deshabilitar el botón mientras se procesa

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const data = await getProductById(uuid); // Obtener los detalles del producto
                setProduct(data);
            } catch (err) {
                setError("Error al cargar los detalles del producto");
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [uuid]);

    const handleCustomOptionChange = (optionType, value) => {
        setCustomSelections((prev) => ({ ...prev, [optionType]: value }));
    };

    const aumentarCantidad = () => {
        setCantidad((prev) => prev + 1);
    };

    const disminuirCantidad = () => {
        if (cantidad > 1) setCantidad((prev) => prev - 1);
    };

    const handleAddToCart = async () => {
        setIsLoadingCart(true); // Deshabilitar el botón mientras se procesa
        try {
            const cartData = {
                productUuid: product.uuid,
                quantity: cantidad,
                customOptions: customSelections, // Incluir las opciones de personalización seleccionadas
            };
    
            // Llamar al servicio para agregar al carrito
            await addToCart(cartData);
    
            setCartMessage({ success: true, message: 'Producto agregado al carrito con éxito.' });
        } catch (error) {
            console.error('Error al agregar al carrito:', error.message);
            setCartMessage({ success: false, message: 'Error al agregar el producto al carrito.' });
        } finally {
            setIsLoadingCart(false); // Habilitar el botón nuevamente
        }
    };    

    if (loading) return <p>Cargando detalles del producto...</p>;
    if (error) return <p className="error">{error}</p>;

    return (
        <div className="product-detail">
            <div className="category-container">
                <div className="category">{product.category}</div>
                <hr className="category-line" />
                <hr className="category-line2" />
            </div>

            <div className="content">
                <div className="image-container">
                    <img
                        src={product.imagePath || "https://via.placeholder.com/450"}
                        alt={product.name}
                        className="product-image"
                    />
                    <div className="rating-container">
                        <div className="rating">
                            <span className="rating-number">5</span>
                            <div className="stars">★★★★★</div>
                        </div>
                        <hr className="rating-line" />
                    </div>
                </div>

                <div className="details">
                    <h2>{product.name}</h2>
                    <div className="tag">Tag</div>
                    <p className="price">US$</p>
                    <p className="price-num">{product.price.toFixed(2)}</p>

                    {/* Opciones de personalización */}
                    <div className="options">
                        {product.customOptions.map((option, index) => (
                            <div className="option" key={index}>
                                <label>{option.name}:</label>
                                {option.type === "color" && (
                                    <div className="color-options">
                                        {option.options.map((color, idx) => (
                                            <button
                                                key={idx}
                                                className={`color ${color}`}
                                                style={{ backgroundColor: color }}
                                                onClick={() => handleCustomOptionChange(option.name, color)}
                                            />
                                        ))}
                                    </div>
                                )}
                                {option.type === "texto" && (
                                    <input
                                        type="text"
                                        maxLength={option.maxLength || 50}
                                        placeholder={`Escribe aquí (máx ${option.maxLength || 50} caracteres)`}
                                        onChange={(e) => handleCustomOptionChange(option.name, e.target.value)}
                                    />
                                )}
                                {option.type === "image" && (
                                    <div className="image-option">
                                        <input
                                            type="file"
                                            accept={option.allowedExtensions.join(", ")}
                                            onChange={(e) =>
                                                handleCustomOptionChange(option.name, e.target.files[0])
                                            }
                                        />
                                        <p>Tamaño máximo: {option.maxFileSize} KB</p>
                                        <p>Formatos permitidos: {option.allowedExtensions.join(", ")}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="cantidad-container">
                        <label>Cantidad:</label>
                        <button onClick={aumentarCantidad} className="boton">
                            +
                        </button>
                        <span>{cantidad}</span>
                        <button onClick={disminuirCantidad} className="boton">
                            -
                        </button>
                    </div>

                    <hr className="description-line" />
                    <div className="description">
                        <h3>Sobre el artículo:</h3>
                        <p>{product.description}</p>
                    </div>

                    <button onClick={handleAddToCart} className="add-to-cart" disabled={isLoadingCart}>
                        {isLoadingCart ? "Agregando..." : "Agregar al carrito"}
                    </button>

                    {/* Mensaje de feedback */}
                    {cartMessage && (
                        <p className={cartMessage.success ? "success-message" : "error-message"}>
                            {cartMessage.message}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
