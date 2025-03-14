
// Order status types
export type OrderStatus = 'new' | 'received' | 'in-progress' | 'ready-for-collect' | 'delivered' | 'collected' | 'cancelled';

// Order data structure
export interface Order {
  id: string;
  orderDate: string;
  customer: string;
  status: OrderStatus;
  studio: string;
  driver: string;
  total: number;
  deliveryDate: string | null;
}

// Component props types
export interface OrdersTableProps {
  className?: string;
}
