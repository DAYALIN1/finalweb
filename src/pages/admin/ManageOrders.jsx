import React, { useEffect, useState } from 'react';
import OrderCard from './OrderCard';
import { getOrders, updateOrderStatus } from '../../services/admin/orderService';

const ManageOrders = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const data = await getOrders(); // Llama al servicio para obtener órdenes
                setOrders(data);
            } catch (err) {
                console.error('Error fetching orders:', err);
            }
        };
        fetchOrders();
    }, []);

    const handleStatusUpdate = async (uuid, newStatus) => {
        try {
            // Actualiza el estado en el backend
            await updateOrderStatus(uuid, newStatus);

            // Actualiza el estado local
            setOrders((prevOrders) =>
                prevOrders.map((order) =>
                    order.uuid === uuid ? { ...order, status: newStatus } : order
                )
            );
        } catch (err) {
            console.error('Error updating order status:', err);
        }
    };

    return (
        <div className="order-list">
            <h1>Administrar Órdenes</h1>
            {orders.map((order) => (
                <OrderCard
                    key={order.uuid}
                    order={order}
                    onUpdateStatus={handleStatusUpdate}
                />
            ))}
        </div>
    );
};

export default ManageOrders;
