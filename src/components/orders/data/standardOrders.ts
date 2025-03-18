
import { Order } from '../types';
import { getRandomDate, formatDateString, getDeliveryDate } from '../utils/dateUtils';

// Get current date for reference
const today = new Date();

// Calculate a date from the last month (30 days ago)
const lastMonth = new Date(today);
lastMonth.setDate(today.getDate() - 30);

// Generate standard sample orders
export const generateStandardOrders = (): Order[] => {
  const orders: Order[] = [
    {
      id: 'ORD-0001',
      orderDate: formatDateString(getRandomDate(lastMonth, today)),
      customer: 'Rajesh Kumar',
      status: 'delivered',
      studio: 'PKC Laundries',
      driver: 'Anand Reddy',
      total: 950,
      deliveryDate: null,
      washType: 'standard',
      assigned: true,
      phone: '+91 9876543210',
      customerAddress: '42, Jubilee Hills, Hyderabad',
      studioAddress: 'PKC Laundries, Road No. 5, Banjara Hills'
    },
    {
      id: 'ORD-0002',
      orderDate: formatDateString(getRandomDate(lastMonth, today)),
      customer: 'Priya Sharma',
      status: 'in-progress',
      studio: 'MagicKlean',
      driver: 'Kavya Singh',
      total: 755,
      deliveryDate: null,
      washType: 'express',
      assigned: true,
      phone: '+91 8765432109',
      customerAddress: '28, Madhapur, Hyderabad',
      studioAddress: 'MagicKlean, Ayyappa Society, Madhapur'
    },
    {
      id: 'ORD-0003',
      orderDate: formatDateString(getRandomDate(lastMonth, today)),
      customer: 'Arun Verma',
      status: 'ready-for-collect',
      studio: 'Cleanovo',
      driver: 'Ravi Teja',
      total: 1200,
      deliveryDate: null,
      washType: 'both',
      assigned: true,
      phone: '+91 7654321098',
      customerAddress: '15, Gachibowli, Hyderabad',
      studioAddress: 'Cleanovo, Kothaguda Cross Roads, Kondapur'
    },
    {
      id: 'ORD-0004',
      orderDate: formatDateString(getRandomDate(lastMonth, today)),
      customer: 'Deepika Reddy',
      status: 'new',
      studio: 'UClean',
      driver: 'Unassigned',
      total: 890,
      deliveryDate: null,
      washType: 'standard',
      assigned: false,
      phone: '+91 6543210987',
      customerAddress: '72, Kukatpally, Hyderabad',
      studioAddress: 'UClean, KPHB Colony, Kukatpally'
    },
    {
      id: 'ORD-0005',
      orderDate: formatDateString(getRandomDate(lastMonth, today)),
      customer: 'Venkat Rao',
      status: 'cancelled',
      studio: 'Tumbledry',
      driver: 'Cancelled',
      total: 0,
      deliveryDate: null,
      washType: 'express',
      assigned: false,
      phone: '+91 5432109876',
      customerAddress: '39, Ameerpet, Hyderabad',
      studioAddress: 'Tumbledry, SR Nagar, Hyderabad'
    },
    {
      id: 'ORD-0006',
      orderDate: formatDateString(getRandomDate(lastMonth, today)),
      customer: 'Sneha Reddy',
      status: 'received',
      studio: 'Washmart',
      driver: 'Pending Assignment',
      total: 675,
      deliveryDate: null,
      washType: 'standard',
      assigned: false,
      phone: '+91 4321098765',
      customerAddress: '56, Secunderabad, Hyderabad',
      studioAddress: 'Washmart, Paradise Circle, Secunderabad'
    },
  ];
  
  return orders;
};

// Generate more sample orders with additional information
export const generateAdditionalOrders = (): Order[] => {
  const orders: Order[] = [];
  
  // Add more orders with logical dates
  const orderDate7 = getRandomDate(lastMonth, today);
  const orderDate8 = getRandomDate(lastMonth, today);
  const orderDate9 = getRandomDate(lastMonth, today);
  const orderDate10 = getRandomDate(lastMonth, today);
  const orderDate11 = getRandomDate(lastMonth, today);
  const orderDate12 = getRandomDate(lastMonth, today);

  orders.push(
    {
      id: 'ORD-0007',
      orderDate: formatDateString(orderDate7),
      customer: 'Rahul Chowdary',
      status: 'delivered',
      studio: 'We Washh',
      driver: 'Srinivas Kumar',
      total: 1450,
      deliveryDate: formatDateString(getDeliveryDate(orderDate7)),
      washType: 'both',
      assigned: true,
      phone: '+91 9876543211',
      customerAddress: '23, Hitech City, Hyderabad',
      studioAddress: 'We Washh, Cyber Towers, Hitech City'
    },
    {
      id: 'ORD-0008',
      orderDate: formatDateString(orderDate8),
      customer: 'Neha Singh',
      status: 'delivered',
      studio: 'The Laundry Basket',
      driver: 'Anand Reddy',
      total: 875,
      deliveryDate: formatDateString(getDeliveryDate(orderDate8)),
      washType: 'standard',
      assigned: true,
      phone: '+91 8765432110',
      customerAddress: '48, Manikonda, Hyderabad',
      studioAddress: 'The Laundry Basket, OU Colony, Shaikpet'
    },
    {
      id: 'ORD-0009',
      orderDate: formatDateString(orderDate9),
      customer: 'Kiran Reddy',
      status: 'delivered',
      studio: 'FABO',
      driver: 'Ravi Teja',
      total: 1100,
      deliveryDate: formatDateString(getDeliveryDate(orderDate9)),
      washType: 'express',
      assigned: true,
      phone: '+91 7654321099',
      customerAddress: '84, Miyapur, Hyderabad',
      studioAddress: 'FABO, Miyapur X Roads, Miyapur'
    },
    {
      id: 'ORD-0010',
      orderDate: formatDateString(orderDate10),
      customer: 'Ananya Desai',
      status: 'delivered',
      studio: 'Sunshine',
      driver: 'Srinivas Kumar',
      total: 1150,
      deliveryDate: formatDateString(getDeliveryDate(orderDate10)),
      washType: 'both',
      assigned: true,
      phone: '+91 6543210988',
      customerAddress: '33, Begumpet, Hyderabad',
      studioAddress: 'Sunshine, Prakash Nagar, Begumpet'
    },
    {
      id: 'ORD-0011',
      orderDate: formatDateString(orderDate11),
      customer: 'Vikram Malhotra',
      status: 'new',
      studio: 'Bhavani BAND BOX',
      driver: 'Unassigned',
      total: 780,
      deliveryDate: null,
      washType: 'standard',
      assigned: false,
      phone: '+91 5432109877',
      customerAddress: '12, Somajiguda, Hyderabad',
      studioAddress: 'Bhavani BAND BOX, Khairatabad X Roads, Somajiguda'
    },
    {
      id: 'ORD-0012',
      orderDate: formatDateString(orderDate12),
      customer: 'Aarti Patel',
      status: 'ready-for-collect',
      studio: 'Balus Modern',
      driver: 'Kavya Singh',
      total: 1320,
      deliveryDate: null,
      washType: 'express',
      assigned: true,
      phone: '+91 4321098766',
      customerAddress: '62, Tarnaka, Hyderabad',
      studioAddress: 'Balus Modern, Habsiguda, Tarnaka'
    }
  );
  
  return orders;
};
