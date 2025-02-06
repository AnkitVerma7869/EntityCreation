'use client';
import React from 'react';
import TableList from '../TableList';

const ManageEntities: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <TableList />
      </div>
    </div>
  );
};

export default ManageEntities; 