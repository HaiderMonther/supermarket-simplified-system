
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import InventoryDashboard from '@/components/inventory/InventoryDashboard';

const Inventory: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main className="pt-20">
        <InventoryDashboard />
      </main>
    </div>
  );
};

export default Inventory;
