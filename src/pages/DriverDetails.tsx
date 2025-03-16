
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import { useIsMobile } from '@/hooks/use-mobile';
import { sampleDrivers } from '@/components/drivers/mockData';
import { Driver } from '@/components/drivers/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Phone, User, Home, Car, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const DriverDetails = () => {
  const { driverId } = useParams();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);
  const [driver, setDriver] = useState<Driver | null>(null);
  const { toast } = useToast();
  
  useEffect(() => {
    setSidebarOpen(!isMobile);
  }, [isMobile]);
  
  useEffect(() => {
    // Find the driver in our sample data
    // In a real app, you would fetch this from an API
    const foundDriver = sampleDrivers.find(d => d.id === driverId);
    
    if (foundDriver) {
      // Extend the driver with additional mock data for demo purposes
      const extendedDriver = {
        ...foundDriver,
        emergencyContact: "+1 (555) 765-4321",
        address: "123 Driver Lane, Los Angeles, CA 90001",
        vehicleDetails: {
          make: "Toyota",
          model: "Prius",
          year: "2020",
          color: "Silver",
          licensePlate: "DRV-1234"
        }
      };
      
      setDriver(extendedDriver);
    } else {
      toast({
        title: "Driver Not Found",
        description: "Could not find the selected driver.",
        variant: "destructive"
      });
      // Redirect back to drivers page if driver not found
      navigate('/drivers');
    }
  }, [driverId, navigate, toast]);
  
  const toggleSidebar = () => {
    setSidebarOpen(prev => !prev);
  };
  
  if (!driver) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold">Loading driver details...</h2>
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex h-screen bg-gray-50">
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-10 lg:hidden"
          onClick={toggleSidebar}
        />
      )}
      
      <Sidebar 
        className={`fixed z-20 lg:static transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`} 
      />
      
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        <Header 
          toggleSidebar={toggleSidebar} 
        />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="mb-6 flex items-center">
            <Button 
              variant="outline" 
              size="sm" 
              className="mr-4"
              onClick={() => navigate('/drivers')}
            >
              <ArrowLeft size={16} className="mr-1" />
              Back to Drivers
            </Button>
            <h1 className="text-2xl font-bold">Driver Details</h1>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-laundry-blue" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col">
                  <span className="text-sm text-gray-500">Name</span>
                  <span className="font-medium">{driver.name}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-gray-500">Status</span>
                  <span className={`font-medium ${driver.status === 'active' ? 'text-green-600' : 'text-red-600'}`}>
                    {driver.status.charAt(0).toUpperCase() + driver.status.slice(1)}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-gray-500">Address</span>
                  <span className="font-medium">{(driver as any).address}</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="h-5 w-5 text-laundry-blue" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col">
                  <span className="text-sm text-gray-500">Phone Number</span>
                  <span className="font-medium">{driver.phoneNumber}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-gray-500">Emergency Contact</span>
                  <span className="font-medium">{(driver as any).emergencyContact}</span>
                </div>
              </CardContent>
            </Card>
            
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Car className="h-5 w-5 text-laundry-blue" />
                  Vehicle Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-500">Make</span>
                    <span className="font-medium">{(driver as any).vehicleDetails?.make}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-500">Model</span>
                    <span className="font-medium">{(driver as any).vehicleDetails?.model}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-500">Year</span>
                    <span className="font-medium">{(driver as any).vehicleDetails?.year}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-500">Color</span>
                    <span className="font-medium">{(driver as any).vehicleDetails?.color}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-500">License Plate</span>
                    <span className="font-medium">{(driver as any).vehicleDetails?.licensePlate}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Home className="h-5 w-5 text-laundry-blue" />
                  Delivery Statistics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-500">Assigned Orders</span>
                    <span className="font-medium">{driver.assignedOrders || 0}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-500">Total Deliveries</span>
                    <span className="font-medium">{driver.totalDeliveries || 0}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-500">Rating</span>
                    <span className="font-medium">{driver.rating || 'N/A'} {driver.rating ? '⭐' : ''}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DriverDetails;
