import { useState, useEffect } from 'react';
import { Order } from '../types';
import { useAuth } from './useAuth';

const ORDERS_KEY = 'storebay_orders';

export const useOrders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  // Load orders from localStorage
  useEffect(() => {
    if (user) {
      loadOrders();
    } else {
      setOrders([]);
      setLoading(false);
    }
  }, [user]);

  const loadOrders = () => {
    try {
      setLoading(true);
      const allOrders = localStorage.getItem(ORDERS_KEY);
      if (allOrders) {
        const parsedOrders: Order[] = JSON.parse(allOrders);
        // Filter orders for current user
        const userOrders = parsedOrders.filter(order => 
          order.shippingAddress.firstName === user?.firstName && 
          order.shippingAddress.lastName === user?.lastName
        );
        // Sort by creation date (newest first)
        userOrders.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        setOrders(userOrders);
      }
    } catch (error) {
      console.error('Error loading orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const addOrder = (order: Order) => {
    try {
      const allOrders = localStorage.getItem(ORDERS_KEY);
      const existingOrders: Order[] = allOrders ? JSON.parse(allOrders) : [];
      const updatedOrders = [order, ...existingOrders];
      localStorage.setItem(ORDERS_KEY, JSON.stringify(updatedOrders));
      setOrders(prev => [order, ...prev]);
    } catch (error) {
      console.error('Error saving order:', error);
    }
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    try {
      const allOrders = localStorage.getItem(ORDERS_KEY);
      if (allOrders) {
        const existingOrders: Order[] = JSON.parse(allOrders);
        const updatedOrders = existingOrders.map(order => 
          order.id === orderId 
            ? { ...order, status, updated_at: new Date().toISOString() }
            : order
        );
        localStorage.setItem(ORDERS_KEY, JSON.stringify(updatedOrders));
        setOrders(prev => prev.map(order => 
          order.id === orderId 
            ? { ...order, status, updated_at: new Date().toISOString() }
            : order
        ));
      }
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  return {
    orders,
    loading,
    addOrder,
    updateOrderStatus,
    refetch: loadOrders
  };
};