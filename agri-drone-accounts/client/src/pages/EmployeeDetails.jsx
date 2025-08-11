import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Edit, Plus } from 'lucide-react';
import Button from '../components/Button';
import Modal from '../components/Modal';
import DataTable from '../components/DataTable';

const EmployeeDetails = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [procurementRequests, setProcurementRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showProcurementModal, setShowProcurementModal] = useState(false);

  useEffect(() => {
    // Mock API call - will be replaced with actual API call
    setTimeout(() => {
      const mockEmployee = {
        id: parseInt(id),
        employeeId: "EMP001",
        name: "Dr. Priya Sharma",
        role: "Senior Research Engineer",
        department: "RnD",
        contactNo: "+91-9876543230",
        email: "priya.sharma@agridrone.com",
        address: "123 Tech Colony, Bangalore",
        dateOfJoining: "2023-03-15",
        status: "Active",
        photo: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
      };

      const mockProcurements = [
        {
          id: 1,
          requestId: "REQ001",
          date: "2024-01-20",
          item: "Research Equipment - Oscilloscope",
          quantity: 1,
          cost: 85000,
          status: "Approved"
        },
        {
          id: 2,
          requestId: "REQ002",
          date: "2024-01-15",
          item: "Development Board - ARM Cortex",
          quantity: 5,
          cost: 12500,
          status: "Pending"
        }
      ];

      setEmployee(mockEmployee);
      setProcurementRequests(mockProcurements);
      setLoading(false);
    }, 1000);
  }, [id]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const procurementColumns = [
    {
      header: 'Request ID',
      accessor: 'requestId',
      render: (row) => (
        <span className="font-mono text-sm font-medium text-gray-900">{row.requestId}</span>
      )
    },
    {
      header: 'Date',
      accessor: 'date',
      render: (row) => formatDate(row.date)
    },
    {
      header: 'Item',
      accessor: 'item'
    },
    {
      header: 'Qty',
      accessor: 'quantity'
    },
    {
      header: 'Cost',
      accessor: 'cost',
      render: (row) => formatCurrency(row.cost)
    },
    {
      header: 'Status',
      accessor: 'status',
      render: (row) => (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          row.status === 'Approved' ? 'bg-green-100 text-green-800' :
          row.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
          'bg-red-100 text-red-800'
        }`}>
          {row.status}
        </span>
      )
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!employee) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Employee Not Found</h2>
          <Link to="/employees" className="text-primary-600 hover:text-primary-700">
            Back to Employees
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link 
              to="/employees" 
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft size={20} className="mr-2" />
              Back to Employees
            </Link>
            <div className="h-6 w-px bg-gray-300"></div>
            <h1 className="text-2xl font-bold text-gray-900">{employee.name}</h1>
          </div>
          
          <Button 
            variant="success"
            onClick={() => setShowProcurementModal(true)}
            className="flex items-center space-x-2"
          >
            <Plus size={20} />
            <span>Add Procurement</span>
          </Button>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
          <div className="flex items-start space-x-8">
            {/* Photo */}
            <div className="flex-shrink-0">
              <img
                src={employee.photo}
                alt={employee.name}
                className="w-32 h-32 rounded-lg object-cover border-2 border-gray-200"
              />
            </div>

            {/* Details */}
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-500">Employee ID:</span>
                  <span className="font-mono text-sm font-medium text-gray-900">{employee.employeeId}</span>
                  <button className="text-gray-400 hover:text-gray-600">
                    <Edit size={16} />
                  </button>
                </div>
                
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-500">Name:</span>
                  <span className="text-sm font-medium text-gray-900">{employee.name}</span>
                  <button className="text-gray-400 hover:text-gray-600">
                    <Edit size={16} />
                  </button>
                </div>
                
                <div>
                  <span className="text-sm font-medium text-gray-500">Department:</span>
                  <span className="ml-2 text-sm text-gray-900">{employee.department}</span>
                </div>
                
                <div>
                  <span className="text-sm font-medium text-gray-500">Contact:</span>
                  <span className="ml-2 text-sm text-gray-900">{employee.contactNo}</span>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <span className="text-sm font-medium text-gray-500">Email:</span>
                  <span className="ml-2 text-sm text-gray-900">{employee.email}</span>
                </div>
                
                <div>
                  <span className="text-sm font-medium text-gray-500">Address:</span>
                  <span className="ml-2 text-sm text-gray-900">{employee.address}</span>
                </div>
                
                <div>
                  <span className="text-sm font-medium text-gray-500">Date of Joining:</span>
                  <span className="ml-2 text-sm text-gray-900">{formatDate(employee.dateOfJoining)}</span>
                </div>
                
                <div>
                  <span className="text-sm font-medium text-gray-500">Status:</span>
                  <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    employee.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {employee.status}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Procurement Requests Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Procurement Requests</h2>
          </div>
          
          <div className="p-6">
            <DataTable
              columns={procurementColumns}
              data={procurementRequests}
              emptyMessage="No procurement requests found"
            />
          </div>
        </div>

        {/* Add Procurement Modal */}
        <ProcurementModal
          isOpen={showProcurementModal}
          onClose={() => setShowProcurementModal(false)}
          employee={employee}
          onSubmit={(data) => {
            console.log('Procurement data:', data);
            setShowProcurementModal(false);
            // Here you would make an API call to create the procurement request
            // and update the local state
          }}
        />
      </div>
    </div>
  );
};

// Procurement Modal Component
const ProcurementModal = ({ isOpen, onClose, employee, onSubmit }) => {
  const [formData, setFormData] = useState({
    employeeId: employee?.id || '',
    employeeName: employee?.name || ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add Procurement Request"
      size="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Employee ID
            </label>
            <input
              type="text"
              value={employee?.employeeId || ''}
              readOnly
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Employee Name
            </label>
            <input
              type="text"
              value={employee?.name || ''}
              readOnly
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Item/Equipment *
          </label>
          <input
            type="text"
            name="item"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            onChange={handleChange}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Quantity *
            </label>
            <input
              type="number"
              name="quantity"
              required
              min="1"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Estimated Cost *
            </label>
            <input
              type="number"
              name="cost"
              required
              min="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              onChange={handleChange}
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Justification/Notes
          </label>
          <textarea
            name="notes"
            rows="3"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            onChange={handleChange}
          />
        </div>
        
        <div className="flex justify-end space-x-3 pt-4">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">
            Submit Request
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default EmployeeDetails;
