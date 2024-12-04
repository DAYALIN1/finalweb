import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Para redirigir al home
import { getCart, removeFromCart, processCart } from '../../services/client/cartService';
import '../../assets/styles/Carrito.scss';

const Cart = () => {
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate(); // Hook para redirección

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const userUuid = localStorage.getItem('userUuid');
                if (!userUuid) throw new Error('El usuario no ha iniciado sesión.');

                const cartData = await getCart(userUuid);
                setCart(cartData);
            } catch (err) {
                setError(err.message || 'Error al cargar el carrito.');
            } finally {
                setLoading(false);
            }
        };

        fetchCartItems();
    }, []);

    const handleRemoveProduct = async (productUuid) => {
        try {
            await removeFromCart(productUuid);
            setCart({
                ...cart,
                products: cart.products.filter((item) => item.productUuid !== productUuid),
            });
        } catch (err) {
            setError('Error al eliminar el producto del carrito.');
        }
    };

    const handleProcessOrder = async () => {
        try {
            const result = await processCart();
            setSuccessMessage('Pedido procesado con éxito. Redirigiendo al inicio...');
            setCart(null); // Limpiar el carrito localmente

            // Redirigir al home después de 3 segundos
            setTimeout(() => {
                navigate('/client/home');
            }, 3000);
        } catch (err) {
            setError(err.message || 'Error al procesar el carrito.');
        }
    };

    if (loading) return <p>Cargando carrito...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="cart-container">
            <h2>Carrito</h2>
            <div className="content">
                {/* Lista de productos */}
                <div className="cart-items">
                    {cart?.products.map((item, index) => (
                        <div key={index} className="cart-item">
                            <img
                                src={item.image || 'https://via.placeholder.com/150'}
                                alt={item.name || 'Producto sin nombre'}
                            />
                            <div className="item-info">
                                <h3>{item.name || 'Nombre no disponible'}</h3>
                                <p>{item.description || 'Descripción no disponible'}</p>
                                <p className="info-line">
                                    <span>Cantidad: {item.quantity}</span>
                                    <span>Precio Unitario: ${item.price?.toFixed(2) || '0.00'}</span>
                                </p>
                            </div>
                            <p className="price">
                                ${(item.quantity * (item.price || 0)).toFixed(2)}
                            </p>
                            <button
                                className="remove-btn"
                                onClick={() => handleRemoveProduct(item.productUuid)}
                            >
                                ✖
                            </button>
                        </div>
                    ))}
                </div>

                {/* Resumen del pedido */}
                <div className="order-summary">
                    <h3>RESUMEN DEL PEDIDO</h3>
                    <p>
                        <span>Precio:</span>
                        <span>
                            $
                            {cart?.products
                                .reduce(
                                    (total, product) => total + (product.quantity * product.price || 0),
                                    0
                                )
                                .toFixed(2) || '0.00'}
                        </span>
                    </p>
                    <p>
                        <span>Descuento:</span>
                        <span>$0.00</span>
                    </p>
                    <p>
                        <span>Descuento de cupón:</span>
                        <span>$0.00</span>
                    </p>
                    <div className="line"></div>
                    <p>
                        <span>Total:</span>
                        <span>
                            $
                            {cart?.products
                                .reduce(
                                    (total, product) => total + (product.quantity * product.price || 0),
                                    0
                                )
                                .toFixed(2) || '0.00'}
                        </span>
                    </p>
                    <button className="order-btn" onClick={handleProcessOrder}>
                        Realizar pedido
                    </button>
                </div>
            </div>

            {/* Mensajes de Éxito/Error */}
            {successMessage && <p className="success-message">{successMessage}</p>}
            {error && <p className="error-message">{error}</p>}
        </div>
    );
};

export default Cart;
