import React, { useState, useEffect } from 'react';
import { Package, ClipboardCheck, Clock } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { sampleOrders, exclusiveRescheduledOrders } from '@/components/orders/mockData';
import { AssignDriverDialog } from '@/components/orders/AssignDriverDialog';
import { AssignmentHeader } from '@/components/orders/AssignmentHeader';
import { OrdersAssignmentTable } from '@/components/orders/OrdersAssignmentTable';
import { mapOrdersToTableData, OrderTableData } from '@/components/orders/OrderTableDataMapper';
import { toast } from "sonner";

const OrderAssignment = () => {
  const [selectedNewOrders, setSelectedNewOrders] = useState<string[]>([]);
  const [selectedReadyOrders, setSelectedReadyOrders] = useState<string[]>([]);
  const [selectedRescheduledOrders, setSelectedRescheduledOrders] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [washTypeFilter, setWashTypeFilter] = useState('all');
  const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false);
  const [currentOrderToAssign, setCurrentOrderToAssign] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('new');
  const [assignedOrderIds, setAssignedOrderIds] = useState<string[]>([]);
  const [assignedOrdersData, setAssignedOrdersData] = useState<OrderTableData[]>([]);
  const [driverAssignmentsMap, setDriverAssignmentsMap] = useState<{[driverId: string]: OrderTableData[]}>({});

  // Load existing assignments
  useEffect(() => {
    const loadAssignments = () => {
      const storedAssignments = localStorage.getItem('driverAssignments');
      if (storedAssignments) {
        try {
          const { driverId, orders } = JSON.parse(storedAssignments);
          if (Array.isArray(orders)) {
            const orderIds = orders.map((order: any) => order.id);
            setAssignedOrderIds(orderIds);
            setAssignedOrdersData(orders);
            
            // Store in the drivers map
            setDriverAssignmentsMap(prev => ({
              ...prev,
              [driverId]: orders
            }));
          }
        } catch (error) {
          console.error('Error parsing stored driver assignments:', error);
        }
      }
    };
    
    loadAssignments();

    const handleDriverAssignment = (event: CustomEvent<any>) => {
      if (event.detail && event.detail.orders) {
        const { driverId, orders } = event.detail;
        const newAssignedIds = orders.map((order: any) => order.id);
        setAssignedOrderIds(newAssignedIds);
        setAssignedOrdersData(orders);
        
        // Update the drivers map
        setDriverAssignmentsMap(prev => ({
          ...prev,
          [driverId]: orders
        }));
      }
    };

    window.addEventListener('driverAssignment', handleDriverAssignment as EventListener);

    return () => {
      window.removeEventListener('driverAssignment', handleDriverAssignment as EventListener);
    };
  }, []);

  // Filter out assigned orders from the order lists
  // Only select orders with 'new' status for the new orders tab
  const newOrders = sampleOrders
    .filter(order => order.status === 'new' && !assignedOrderIds.includes(order.id));
    
  const readyForCollectionOrders = sampleOrders
    .filter(order => order.status === 'ready-for-collect' && !assignedOrderIds.includes(order.id));
  
  // Use only exclusive rescheduled orders that aren't assigned yet
  const rescheduledOrders = exclusiveRescheduledOrders
    .filter(order => !assignedOrderIds.includes(order.id));

  // Map orders to table data format
  const pendingOrders = mapOrdersToTableData(newOrders);
  const readyOrders = mapOrdersToTableData(readyForCollectionOrders);
  const rescheduledOrdersData = mapOrdersToTableData(rescheduledOrders);

  // Combined list of selected orders across all tabs
  const selectedOrders = [...selectedNewOrders, ...selectedReadyOrders, ...selectedRescheduledOrders];

  // Apply filters for pending orders
  const filteredPendingOrders = pendingOrders.filter(order => {
    const matchesSearch = !searchQuery || 
      order.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.studio.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesWashType = washTypeFilter === 'all' || 
      order.washType.toLowerCase().includes(washTypeFilter.toLowerCase());
    
    return matchesSearch && matchesWashType;
  });

  // Apply filters for rescheduled orders
  const filteredRescheduledOrders = rescheduledOrdersData.filter(order => {
    const matchesSearch = !searchQuery || 
      order.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.studio.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesWashType = washTypeFilter === 'all' || 
      order.washType.toLowerCase().includes(washTypeFilter.toLowerCase());
    
    return matchesSearch && matchesWashType;
  });

  const toggleOrderSelection = (orderId: string) => {
    const isNewOrder = pendingOrders.some(order => order.id === orderId);
    const isReadyOrder = readyOrders.some(order => order.id === orderId);
    const isRescheduledOrder = rescheduledOrdersData.some(order => order.id === orderId);
    
    if (isNewOrder && activeTab === 'new') {
      if (selectedNewOrders.includes(orderId)) {
        setSelectedNewOrders(selectedNewOrders.filter(id => id !== orderId));
      } else {
        setSelectedNewOrders([...selectedNewOrders, orderId]);
      }
    } else if (isReadyOrder && activeTab === 'ready') {
      if (selectedReadyOrders.includes(orderId)) {
        setSelectedReadyOrders(selectedReadyOrders.filter(id => id !== orderId));
      } else {
        setSelectedReadyOrders([...selectedReadyOrders, orderId]);
      }
    } else if (isRescheduledOrder && activeTab === 'rescheduled') {
      if (selectedRescheduledOrders.includes(orderId)) {
        setSelectedRescheduledOrders(selectedRescheduledOrders.filter(id => id !== orderId));
      } else {
        setSelectedRescheduledOrders([...selectedRescheduledOrders, orderId]);
      }
    }
  };

  const handleSelectAll = () => {
    if (activeTab === 'new') {
      if (selectedNewOrders.length === filteredPendingOrders.length) {
        setSelectedNewOrders([]);
      } else {
        setSelectedNewOrders(filteredPendingOrders.map(order => order.id));
      }
    } else if (activeTab === 'ready') {
      if (selectedReadyOrders.length === readyOrders.length) {
        setSelectedReadyOrders([]);
      } else {
        setSelectedReadyOrders(readyOrders.map(order => order.id));
      }
    } else if (activeTab === 'rescheduled') {
      if (selectedRescheduledOrders.length === filteredRescheduledOrders.length) {
        setSelectedRescheduledOrders([]);
      } else {
        setSelectedRescheduledOrders(filteredRescheduledOrders.map(order => order.id));
      }
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleWashTypeChange = (value: string) => {
    setWashTypeFilter(value);
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  const handleAssignSelected = () => {
    setCurrentOrderToAssign(null);
    setIsAssignDialogOpen(true);
  };

  const handleAssignSingle = (orderId: string) => {
    setSelectedNewOrders([]);
    setSelectedReadyOrders([]);
    setSelectedRescheduledOrders([]);
    
    if (pendingOrders.some(order => order.id === orderId)) {
      setSelectedNewOrders([orderId]);
    } else if (readyOrders.some(order => order.id === orderId)) {
      setSelectedReadyOrders([orderId]);
    } else if (rescheduledOrdersData.some(order => order.id === orderId)) {
      setSelectedRescheduledOrders([orderId]);
    }
    
    setCurrentOrderToAssign(orderId);
    setIsAssignDialogOpen(true);
  };

  const handleViewDetails = (orderId: string) => {
    console.log('View details for order:', orderId);
    toast.info(`Viewing details for order ${orderId}`);
  };

  const handleAssignDriver = (driverId: string, orderIds: string[]) => {
    console.log('Assigning driver:', driverId, 'to orders:', orderIds);
    
    const orderText = orderIds.length === 1 ? 'order' : 'orders';
    toast.success(`Successfully assigned driver to ${orderIds.length} ${orderText}`);
    
    const newOrdersData = getOrdersDataById(orderIds);
    
    // Get existing assignments for this driver
    const existingDriverAssignments = driverAssignmentsMap[driverId] || [];
    
    // Create a set of existing order IDs to avoid duplicates
    const existingOrderIds = new Set(existingDriverAssignments.map(order => order.id));
    
    // Only add orders that don't already exist for this driver
    const newOrdersToAdd = newOrdersData.filter(order => !existingOrderIds.has(order.id));
    
    // Combine existing and new orders
    const updatedOrdersForDriver = [...existingDriverAssignments, ...newOrdersToAdd];
    
    // Create the assignment data
    const assignmentData = {
      driverId,
      orders: updatedOrdersForDriver
    };
    
    // Store in localStorage
    localStorage.setItem('driverAssignments', JSON.stringify(assignmentData));
    
    // Dispatch event to notify other components
    window.dispatchEvent(new CustomEvent('driverAssignment', { 
      detail: assignmentData 
    }));
    
    // Update state
    setDriverAssignmentsMap(prev => ({
      ...prev,
      [driverId]: updatedOrdersForDriver
    }));
    
    // Update assigned order IDs
    const allAssignedOrderIds = Object.values(driverAssignmentsMap)
      .flat()
      .map(order => order.id);
    
    setAssignedOrderIds([...new Set([...allAssignedOrderIds, ...orderIds])]);
    
    // Reset selections
    setSelectedNewOrders([]);
    setSelectedReadyOrders([]);
    setSelectedRescheduledOrders([]);
  };

  // Helper function to get order data by IDs
  const getOrdersDataById = (orderIds: string[]) => {
    const allOrders = [...pendingOrders, ...readyOrders, ...rescheduledOrdersData];
    return orderIds.map(id => allOrders.find(order => order.id === id)).filter(Boolean) as OrderTableData[];
  };

  // Prepare the selected orders data for the assign dialog
  const getSelectedOrdersData = () => {
    if (currentOrderToAssign) {
      const order = [...pendingOrders, ...readyOrders, ...rescheduledOrdersData]
        .find(o => o.id === currentOrderToAssign);
        
      if (order) {
        if (rescheduledOrdersData.some(ro => ro.id === order.id)) {
          return {
            newOrders: order.status && order.status !== 'ready-for-collect' ? [order] : [],
            readyOrders: order.status === 'ready-for-collect' ? [order] : [],
            rescheduledOrders: [order]
          };
        }
        
        return {
          newOrders: pendingOrders.some(po => po.id === order.id) ? [order] : [],
          readyOrders: readyOrders.some(ro => ro.id === order.id) ? [order] : [],
          rescheduledOrders: []
        };
      }
      
      return {
        newOrders: [],
        readyOrders: [],
        rescheduledOrders: []
      };
    }
    
    const selectedNewOrdersData = pendingOrders.filter(order => 
      selectedNewOrders.includes(order.id)
    );
    
    const selectedReadyOrdersData = readyOrders.filter(order => 
      selectedReadyOrders.includes(order.id)
    );
    
    const selectedRescheduledOrdersData = rescheduledOrdersData.filter(order => 
      selectedRescheduledOrders.includes(order.id)
    );
    
    return {
      newOrders: selectedNewOrdersData,
      readyOrders: selectedReadyOrdersData,
      rescheduledOrders: selectedRescheduledOrdersData
    };
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6 space-y-6 animate-fade-in">
      <AssignmentHeader 
        selectedOrders={selectedOrders}
        onSelectAll={handleSelectAll}
        onAssignSelected={handleAssignSelected}
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        washTypeFilter={washTypeFilter}
        onWashTypeChange={handleWashTypeChange}
      />
      
      <Tabs 
        defaultValue="new" 
        className="w-full"
        value={activeTab}
        onValueChange={handleTabChange}
      >
        <TabsList className="mb-4">
          <TabsTrigger value="new" className="flex items-center gap-2">
            <Package size={16} />
            New Orders
          </TabsTrigger>
          <TabsTrigger value="ready" className="flex items-center gap-2">
            <ClipboardCheck size={16} />
            Ready for Collection
          </TabsTrigger>
          <TabsTrigger value="rescheduled" className="flex items-center gap-2">
            <Clock size={16} />
            Rescheduled
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="new" className="space-y-4">
          <OrdersAssignmentTable
            title="New Order Assignments"
            icon={<Package size={20} className="text-laundry-blue" />}
            statusText={<div className="flex items-center gap-1"><Clock size={16} /><span>{newOrders.length} Orders Pending</span></div>}
            orders={filteredPendingOrders}
            selectedOrders={selectedNewOrders}
            onToggleOrderSelection={toggleOrderSelection}
            onSelectAll={handleSelectAll}
            onAssignSingle={handleAssignSingle}
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
            showSearch={true}
            showStatus={true}
          />
        </TabsContent>
        
        <TabsContent value="ready">
          {readyOrders.length > 0 ? (
            <OrdersAssignmentTable
              title="Ready for Collection"
              icon={<ClipboardCheck size={20} className="text-green-600" />}
              statusText={<div className="flex items-center gap-1"><Clock size={16} /><span>{readyForCollectionOrders.length} Orders Ready</span></div>}
              orders={readyOrders}
              selectedOrders={selectedReadyOrders}
              onToggleOrderSelection={toggleOrderSelection}
              onSelectAll={handleSelectAll}
              onAssignSingle={handleAssignSingle}
              showStatus={true}
            />
          ) : (
            <div className="bg-white rounded-md p-6 border border-gray-100 flex items-center justify-center text-gray-500 h-64">
              No orders ready for collection
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="rescheduled">
          {filteredRescheduledOrders.length > 0 ? (
            <OrdersAssignmentTable
              title="Rescheduled Orders"
              icon={<Clock size={20} className="text-amber-500" />}
              statusText={<div className="flex items-center gap-1"><Clock size={16} /><span>{rescheduledOrders.length} Orders Rescheduled</span></div>}
              orders={filteredRescheduledOrders}
              selectedOrders={selectedRescheduledOrders}
              onToggleOrderSelection={toggleOrderSelection}
              onSelectAll={handleSelectAll}
              onAssignSingle={handleAssignSingle}
              searchQuery={searchQuery}
              onSearchChange={handleSearchChange}
              showSearch={true}
              showStatus={true}
            />
          ) : (
            <div className="bg-white rounded-md p-6 border border-gray-100 flex items-center justify-center text-gray-500 h-64">
              No rescheduled orders
            </div>
          )}
        </TabsContent>
      </Tabs>

      <AssignDriverDialog
        isOpen={isAssignDialogOpen}
        onOpenChange={setIsAssignDialogOpen}
        selectedOrders={getSelectedOrdersData()}
        onAssignDriver={handleAssignDriver}
      />
    </div>
  );
};

export default OrderAssignment;
