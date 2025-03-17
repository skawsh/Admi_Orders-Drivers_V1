
import { Order } from './types';
import { generateRandomAddress, studioAddressMapping, calculateDistance } from './utils/addressUtils';

export interface OrderTableData {
  id: string;
  orderId: string;
  date: string;
  customer: string;
  phone: string;
  customerAddress: string;
  studioAddress: string;
  studio: string;
  washType: string;
  distance: string;
  status?: string; // Add status field
}

export const mapOrdersToTableData = (orders: Order[]): OrderTableData[] => {
  return orders.map(order => {
    // Use provided addresses if available, otherwise generate random ones
    const customerAddress = order.customerAddress || generateRandomAddress();
    const studioAddress = order.studioAddress || studioAddressMapping[order.studio] || `${order.studio} Studio, Hyderabad`;
    
    return {
      id: order.id,
      orderId: order.id,
      date: order.orderDate,
      customer: order.customer,
      phone: order.phone || '+91 ' + Math.floor(Math.random() * 9000000000 + 1000000000),
      customerAddress: customerAddress,
      studioAddress: studioAddress,
      studio: order.studio,
      washType: order.washType === 'express' ? 'Express Wash' : order.washType === 'standard' ? 'Standard Wash' : 'Both Wash',
      distance: calculateDistance(customerAddress, studioAddress),
      status: order.status // Add the status field from the order
    };
  });
};
