import React, { useState } from 'react';
import { Eye } from 'lucide-react';
import EmployeeForm from './EmployeeForm';

const EmployeePage = () => {
  const [showForm, setShowForm] = useState(false);

  const employees = [
    { id: 'EMP001', name: 'John Smith', role: 'Manager', department: 'Accounts', contact: '+91 9876543210', status: 'Active' },
    { id: 'EMP002', name: 'Sarah Johnson', role: 'Accountant', department: 'Accounts', contact: '+91 8765432109', status: 'Active' },
    { id: 'EMP003', name: 'Mike Davis', role: 'Clerk', department: 'Inventory', contact: '+91 7654321098', status: 'Active' },
    { id: 'EMP004', name: 'Emma Wilson', role: 'Manager', department: 'Sales', contact: '+91 6543210987', status: 'Active' },
    { id: 'EMP005', name: 'Robert Brown', role: 'Accountant', department: 'Purchase', contact: '+91 5432109876', status: 'Resigned' }
  ];

  const getStatusColor = (status) =>
    status === 'Active'
      ? 'bg-green-100 text-green-800'
      : 'bg-red-100 text-red-800';

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Employees</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          + Add Employee
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">Employee Records</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">EMPLOYEE ID</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">NAME</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">ROLE</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">DEPARTMENT</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">CONTACT</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">STATUS</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {employees.map((emp) => (
                <tr key={emp.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{emp.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{emp.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{emp.role}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{emp.department}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{emp.contact}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(emp.status)}`}>
                      {emp.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button className="text-blue-600 hover:text-blue-900 flex items-center gap-1">
                      <Eye size={16} /> View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center px-6 py-4 border-t border-gray-200 text-sm text-gray-500">
          <span>Showing 1 to {employees.length} of {employees.length} entries</span>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 border rounded hover:bg-gray-100">Previous</button>
            <span className="px-3 py-1 border rounded bg-blue-600 text-white">1</span>
            <button className="px-3 py-1 border rounded hover:bg-gray-100">Next</button>
          </div>
        </div>
      </div>

      {/* Modal for Add Employee */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-[600px] p-6 relative">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
              onClick={() => setShowForm(false)}
            >
              ✕
            </button>
            <EmployeeForm onClose={() => setShowForm(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeePage;
