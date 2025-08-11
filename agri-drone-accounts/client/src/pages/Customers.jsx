import React, { useState, useEffect } from 'react';
import { Plus, Edit, Eye } from 'lucide-react';
import Button from '../components/Button';
import Modal from '../components/Modal';
import DataTable from '../components/DataTable';

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    // Mock API call - will be replaced with actual API call
    setTimeout(() => {
      setCustomers([
        {
          id: 1,
          fullName: "Rajesh Kumar",
          companyName: "AgriTech Solutions Pvt Ltd",
          email: "rajesh@agritech.com",
          contactNo: "+91-9876543220",
          gst: "29AABCA9603R1ZX",
          country: "India",
          state: "Karnataka",
          address: "123 Farm Tech Park, Bangalore",
          paymentTerms: "Net 30",
          type: "Domestic",
          notes: "Large distributor for South India",
          createdAt: "2024-01-10"
        },
        {
          id: 2,
          fullName: "Sarah Johnson",
          companyName: "Precision Agriculture Inc",
          email: "sarah@precisionag.com",
          contactNo: "+1-555-123-4567",
          gst: "",
          country: "USA",
          state: "California",
          address: "456 Innovation Drive, San Francisco",
          paymentTerms: "Net 15",
          type: "International",
          notes: "US distributor for precision farming",
          createdAt: "2024-01-08"
        },
        {
          id: 3,
          fullName: "Amit Patel",
          companyName: "FarmDrone India",
          email: "amit@farmdrone.in",
          contactNo: "+91-9876543221",
          gst: "24AABCA9603R1ZY",
          country: "India",
          state: "Gujarat",
          address: "789 Agri Complex, Ahmedabad",
          paymentTerms: "Net 45",
          type: "Domestic",
          notes: "Regional distributor for Gujarat",
          createdAt: "2024-01-15"
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const columns = [
    {
      header: 'Name',
      accessor: 'fullName',
      render: (row) => (
        <div>
          <p className="font-medium text-gray-900">{row.fullName}</p>
          <p className="text-sm text-gray-500">{row.email}</p>
        </div>
      )
    },
    {
      header: 'Company',
      accessor: 'companyName'
    },
    {
      header: 'Contact',
      accessor: 'contactNo'
    },
    {
      header: 'GST',
      accessor: 'gst',
      render: (row) => row.gst || 'N/A'
    },
    {
      header: 'Country',
      accessor: 'country'
    },
    {
      header: 'Type',
      accessor: 'type',
      render: (row) => (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          row.type === 'Domestic' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
        }`}>
          {row.type}
        </span>
      )
    },
    {
      header: 'Actions',
      accessor: 'actions',
      render: (row) => (
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" className="p-2">
            <Eye size={16} />
          </Button>
          <Button variant="outline" size="sm" className="p-2">
            <Edit size={16} />
          </Button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Customers</h1>
          <p className="text-gray-600">Manage your customer relationships</p>
        </div>
        
        <Button onClick={() => setShowModal(true)} className="flex items-center space-x-2">
          <Plus size={20} />
          <span>Add Customer</span>
        </Button>
      </div>

      {/* Customers Table */}
      <DataTable
        columns={columns}
        data={customers}
        loading={loading}
        currentPage={currentPage}
        totalPages={Math.ceil(customers.length / 10)}
        onPageChange={setCurrentPage}
        emptyMessage="No customers found"
      />

      {/* Add Customer Modal */}
      <CustomerModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={(data) => {
          console.log('Customer data:', data);
          setShowModal(false);
          // Here you would make an API call to create the customer
        }}
      />
    </div>
  );
};

// Customer Modal Component
const CustomerModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    paymentTerms: 'Net 30'
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
      title="Add Customer"
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
              name="fullName"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Company Name *
            </label>
            <input
              type="text"
              name="companyName"
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
              GST (if B2B)
            </label>
            <input
              type="text"
              name="gst"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Country *
            </label>
            <input
              type="text"
              name="country"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              State *
            </label>
            <input
              type="text"
              name="state"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Preferred Payment Terms *
            </label>
            <select
              name="paymentTerms"
              required
              value={formData.paymentTerms}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              onChange={handleChange}
            >
              <option value="Net 15">Net 15</option>
              <option value="Net 30">Net 30</option>
              <option value="Net 45">Net 45</option>
              <option value="Net 60">Net 60</option>
              <option value="Cash on Delivery">Cash on Delivery</option>
            </select>
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
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Notes
          </label>
          <textarea
            name="notes"
            rows="2"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            onChange={handleChange}
          />
        </div>
        
        <div className="flex justify-end space-x-3 pt-4">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">
            Add Customer
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default Customers;
