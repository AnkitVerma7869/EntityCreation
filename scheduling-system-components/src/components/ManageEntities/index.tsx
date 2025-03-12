'use client';
import React from 'react';
import TableList from '../TableList';

interface ManageEntitiesProps {
  token: string;
}

const ManageEntities: React.FC<ManageEntitiesProps> = ({ token }) => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <TableList token={token} />
      </div>
    </div>
  );
};

export default ManageEntities; 