import { useEffect, useState } from 'react';
import { getUserOrders } from '../../services/client/orderService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faScroll } from '@fortawesome/free-solid-svg-icons';
import '../../assets/styles/Perfil.scss';

const Pedidos = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const data = await getUserOrders(); // Llamada al servicio para obtener los pedidos
                setOrders(data);
            } catch (err) {
                setError('Error al cargar los pedidos.');
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    if (loading) return <p>Cargando pedidos...</p>;
    if (error) return <p className="error">{error}</p>;

    return (
        <div className="pedidos-container">
            {orders.length === 0 ? (
                <p>No tienes pedidos registrados.</p>
            ) : (
                orders.map((order, index) => (
                    <div key={index} className="pedido-detalle-container">
                        <div className="pedido-detalle-row">
                            <div className="pedido-detalle-item icon">
                                <FontAwesomeIcon icon={faScroll} size="lg" className="list-icon" />
                            </div>
                            <div className="pedido-detalle-item">
                                <div className="label">Nº Pedido</div>
                                <div className="value">{order.uuid || 'Desconocido'}</div>
                            </div>
                            <div className="pedido-detalle-item">
                                <div className="label">Fecha</div>
                                <div className="value">
                                    {new Date(order.createdAt).toLocaleDateString('es-ES') || 'Desconocida'}
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default Pedidos;
