
import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Package, CheckCircle2 } from 'lucide-react';
import OrdersList from './OrdersList';
import { AssignedOrder } from '@/types/order';

interface OrderTabsProps {
  assignedOrders: AssignedOrder[];
  completedOrders: AssignedOrder[];
}

const OrderTabs: React.FC<OrderTabsProps> = ({ 
  assignedOrders, 
  completedOrders 
}) => {
  const [activeTab, setActiveTab] = useState('assigned');
  
  return (
    <Tabs defaultValue="assigned" className="mb-6">
      <TabsList>
        <TabsTrigger 
          value="assigned" 
          className="flex items-center gap-2" 
          onClick={() => setActiveTab('assigned')}
        >
          <Package className="h-4 w-4 text-blue-600" />
          Assigned Orders ({assignedOrders.length})
        </TabsTrigger>
        <TabsTrigger 
          value="completed" 
          className="flex items-center gap-2" 
          onClick={() => setActiveTab('completed')}
        >
          <CheckCircle2 className="h-4 w-4 text-green-600" />
          Completed Orders ({completedOrders.length})
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="assigned">
        <OrdersList 
          orders={assignedOrders} 
          emptyMessage="This driver has no assigned orders."
        />
      </TabsContent>
      
      <TabsContent value="completed">
        <OrdersList 
          orders={completedOrders}
          emptyMessage="No completed orders."
        />
      </TabsContent>
    </Tabs>
  );
};

export default OrderTabs;
