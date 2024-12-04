import '../../assets/styles/OrderCard.css';
import { useState } from 'react';

// Importa las imágenes con la ruta correcta
import boxDelivered from '../../assets/images/entregado.png';
import boxPending from '../../assets/images/pendiente.png';
import boxHeld from '../../assets/images/retenido.png';

function OrderCard({ order, onUpdateStatus }) {
    const statusIcons = {
        Delivered: boxDelivered,
        Pending: boxPending,
        Shipped: boxHeld,
    };

    const [status, setStatus] = useState(order.status);

    const handleStatusChange = (e) => {
        const newStatus = e.target.value;
        setStatus(newStatus); // Actualiza el estado local
        if (onUpdateStatus) {
            onUpdateStatus(order.uuid, newStatus); // Llama al padre para actualizar el backend
        }
    };

    return (
        <div className="order-card">
            <div className="order-icon">
                <img
                    src={statusIcons[status] || boxPending}
                    alt={`Estado: ${status}`}
                />
            </div>
            <div className="order-info">
                <div className="info-item">
                    <p className="info-title">ID Orden</p>
                    <p className="info-value">{order.uuid}</p>
                </div>
                <div className="info-item">
                    <p className="info-title">Usuario</p>
                    <p className="info-value">{order.userUuid}</p>
                </div>
                <div className="info-item">
                    <p className="info-title">Productos</p>
                    <ul>
                        {order.products.map((product, index) => (
                            <li key={index}>
                                Producto: {product.productUuid}, Cantidad:{' '}
                                {product.quantity}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="order-status-container">
                <label>Estado de la orden:</label>
                <select
                    value={status}
                    onChange={handleStatusChange}
                    className="order-status"
                >
                    <option value="Delivered">Entregado</option>
                    <option value="Pending">Pendiente</option>
                    <option value="Shipped">Enviado</option>
                </select>
            </div>
        </div>
    );
}

export default OrderCard;
