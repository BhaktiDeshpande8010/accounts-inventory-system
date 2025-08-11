import React, { useState, useEffect } from 'react';
import { Plus, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Modal from '../components/Modal';
import DataTable from '../components/DataTable';

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    // Mock API call - will be replaced with actual API call
    setTimeout(() => {
      setEmployees([
        {
          id: 1,
          employeeId: "EMP001",
          name: "Dr. Priya Sharma",
          role: "Senior Research Engineer",
          department: "RnD",
          contactNo: "+91-9876543230",
          email: "priya.sharma@agridrone.com",
          status: "Active",
          dateOfJoining: "2023-03-15"
        },
        {
          id: 2,
          employeeId: "EMP002",
          name: "Arjun Reddy",
          role: "Flight Test Engineer",
          department: "Flight Lab",
          contactNo: "+91-9876543231",
          email: "arjun.reddy@agridrone.com",
          status: "Active",
          dateOfJoining: "2023-05-20"
        },
        {
          id: 3,
          employeeId: "EMP003",
          name: "Sneha Gupta",
          role: "Quality Control Manager",
          department: "QC",
          contactNo: "+91-9876543232",
          email: "sneha.gupta@agridrone.com",
          status: "Active",
          dateOfJoining: "2023-01-10"
        },
        {
          id: 4,
          employeeId: "EMP004",
          name: "Vikram Singh",
          role: "Production Supervisor",
          department: "Production",
          contactNo: "+91-9876543233",
          email: "vikram.singh@agridrone.com",
          status: "Active",
          dateOfJoining: "2023-07-01"
        },
        {
          id: 5,
          employeeId: "EMP005",
          name: "Anita Desai",
          role: "HR Manager",
          department: "HR/Admin",
          contactNo: "+91-9876543234",
          email: "anita.desai@agridrone.com",
          status: "Active",
          dateOfJoining: "2023-02-28"
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const handleViewEmployee = (employeeId) => {
    navigate(`/employees/${employeeId}`);
  };

  const columns = [
    {
      header: 'Employee ID',
      accessor: 'employeeId',
      render: (row) => (
        <span className="font-mono text-sm font-medium text-gray-900">{row.employeeId}</span>
      )
    },
    {
      header: 'Name',
      accessor: 'name',
      render: (row) => (
        <div>
          <p className="font-medium text-gray-900">{row.name}</p>
          <p className="text-sm text-gray-500">{row.email}</p>
        </div>
      )
    },
    {
      header: 'Role',
      accessor: 'role'
    },
    {
      header: 'Department',
      accessor: 'department',
      render: (row) => (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          row.department === 'RnD' ? 'bg-purple-100 text-purple-800' :
          row.department === 'Flight Lab' ? 'bg-blue-100 text-blue-800' :
          row.department === 'QC' ? 'bg-green-100 text-green-800' :
          row.department === 'Production' ? 'bg-orange-100 text-orange-800' :
          'bg-gray-100 text-gray-800'
        }`}>
          {row.department}
        </span>
      )
    },
    {
      header: 'Contact',
      accessor: 'contactNo'
    },
    {
      header: 'Status',
      accessor: 'status',
      render: (row) => (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          row.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {row.status}
        </span>
      )
    },
    {
      header: 'Actions',
      accessor: 'actions',
      render: (row) => (
        <Button 
          onClick={() => handleViewEmployee(row.id)}
          className="flex items-center space-x-1"
          size="sm"
        >
          <Eye size={16} />
          <span>View</span>
        </Button>
      )
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Employees</h1>
          <p className="text-gray-600">Manage your team members</p>
        </div>
        
        <Button onClick={() => setShowModal(true)} className="flex items-center space-x-2">
          <Plus size={20} />
          <span>Add Employee</span>
        </Button>
      </div>

      {/* Employees Table */}
      <DataTable
        columns={columns}
        data={employees}
        loading={loading}
        currentPage={currentPage}
        totalPages={Math.ceil(employees.length / 10)}
        onPageChange={setCurrentPage}
        emptyMessage="No employees found"
      />

      {/* Add Employee Modal */}
      <EmployeeModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={(data) => {
          console.log('Employee data:', data);
          setShowModal(false);
          // Here you would make an API call to create the employee
        }}
      />
    </div>
  );
};

// Employee Modal Component
const EmployeeModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    status: 'Active'
  });

  const departments = [
    'RnD',
    'Flight Lab',
    'QC',
    'Production',
    'Store',
    'Battery',
    'HR/Admin',
    'Accounts'
  ];

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
      title="Add Employee"
      size="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name *
            </label>
            <input
              type="text"
              name="name"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Role *
            </label>
            <input
              type="text"
              name="role"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Department *
            </label>
            <select
              name="department"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              onChange={handleChange}
            >
              <option value="">Select Department</option>
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contact No *
            </label>
            <input
              type="tel"
              name="contactNo"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email *
            </label>
            <input
              type="email"
              name="email"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date of Joining *
            </label>
            <input
              type="date"
              name="dateOfJoining"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              onChange={handleChange}
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Address *
          </label>
          <textarea
            name="address"
            required
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
            Add Employee
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default Employees;
