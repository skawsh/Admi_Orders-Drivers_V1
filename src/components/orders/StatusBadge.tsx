
import React from 'react';
import { OrderStatus } from './types';
import './OrdersBadge.css';

interface StatusBadgeProps {
  status: OrderStatus | string;
  pickedUp?: boolean;
  pickedUpTime?: string | null;
  dropped?: boolean;
  droppedTime?: string | null;
  showNewOrder?: boolean; // New prop to control when to show "New Order"
}

const StatusBadge = ({ 
  status, 
  pickedUp, 
  pickedUpTime, 
  dropped, 
  droppedTime,
  showNewOrder = false 
}: StatusBadgeProps) => {
  // For ORD-R001 special case
  if (status === "new" && pickedUp && !dropped) {
    return <span className="status-badge status-in-progress">Picked up</span>;
  }
  
  // For new orders, show "New Order" if showNewOrder is true
  if (status === "new" && showNewOrder) {
    return <span className="status-badge status-new">New Order</span>;
  }
  
  // For new orders, show the real-time status based on pickup and drop status
  if (status === "new") {
    if (dropped && droppedTime) {
      return <span className="status-badge status-delivered">Dropped: {droppedTime}</span>;
    } else if (pickedUp && pickedUpTime) {
      return <span className="status-badge status-in-progress">Picked up</span>;
    } else {
      return <span className="status-badge status-ready">Ready for collection</span>;
    }
  }

  // Make sure we handle all possible status values and provide appropriate display text
  switch (status) {
    case "new":
      return <span className="status-badge status-new">New Order</span>;
    case "received":
      return <span className="status-badge status-received">Order Received</span>;
    case "in-progress":
      return <span className="status-badge status-in-progress">In Progress</span>;
    case "ready-for-collect":
      return <span className="status-badge status-ready">Ready for collection</span>;
    case "delivered":
      return <span className="status-badge status-delivered">Order Delivered</span>;
    case "cancelled":
      return <span className="status-badge status-cancelled">Order cancelled</span>;
    case "completed":
      return <span className="status-badge status-delivered">Completed</span>;
    default:
      // Use a type assertion to handle cases where status might be passed as string from legacy code
      console.warn(`Unknown order status: ${status}`);
      return <span className="status-badge status-new">New Order</span>; // Default to New Order for unknown status
  }
};

export default StatusBadge;
