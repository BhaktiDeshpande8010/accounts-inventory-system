import React, { useState, useEffect } from 'react';
import { ChevronDown, Plus, Edit, Eye } from 'lucide-react';
import Button from '../components/Button';
import Modal from '../components/Modal';
import DataTable from '../components/DataTable';

const Vendors = () => {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    // Mock API call - will be replaced with actual API call
    setTimeout(() => {
      setVendors([
        {
          id: 1,
          name: "TechCorp Electronics",
          type: "Local",
          contactNo: "+91-9876543210",
          address: "123 Tech Park, Bangalore, Karnataka",
          goodsServices: "Electronic Components, Sensors",
          status: "Active",
          createdAt: "2024-01-15"
        },
        {
          id: 2,
          name: "Global Drone Parts Ltd",
          type: "National",
          gstNo: "29AABCU9603R1ZX",
          pan: "AABCU9603R",
          contactNo: "+91-9876543211",
          email: "contact@globaldroneparts.com",
          address: "456 Industrial Area, Mumbai, Maharashtra",
          status: "Active",
          createdAt: "2024-01-10"
        },
        {
          id: 3,
          name: "AeroTech International",
          type: "International",
          country: "Germany",
          contactNo: "+49-123-456-7890",
          email: "sales@aerotech.de",
          currency: "EUR",
          swiftIban: "DE89370400440532013000",
          importLicenseNo: "IMP/2024/001",
          address: "789 Aviation Street, Munich, Germany",
          status: "Active",
          createdAt: "2024-01-05"
        },
        {
          id: 4,
          name: "Battery Solutions India",
          type: "National",
          gstNo: "27AABCU9603R1ZY",
          pan: "AABCU9603S",
          contactNo: "+91-9876543212",
          email: "info@batterysolutions.in",
          address: "321 Power Street, Chennai, Tamil Nadu",
          status: "Active",
          createdAt: "2024-01-12"
        },
        {
          id: 5,
          name: "Local Motors & Gears",
          type: "Local",
          contactNo: "+91-9876543213",
          address: "654 Mechanical Hub, Pune, Maharashtra",
          goodsServices: "Motors, Gears, Mechanical Parts",
          status: "Pending",
          createdAt: "2024-01-18"
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const handleAddVendor = (type) => {
    setModalType(type);
    setShowModal(true);
    setShowDropdown(false);
  };

  const columns = [
    {
      header: 'Vendor Name',
      accessor: 'name',
      render: (row) => (
        <div>
          <p className="font-medium text-gray-900">{row.name}</p>
          <p className="text-sm text-gray-500">{row.type} Vendor</p>
        </div>
      )
    },
    {
      header: 'Type',
      accessor: 'type',
      render: (row) => (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          row.type === 'Local' ? 'bg-blue-100 text-blue-800' :
          row.type === 'National' ? 'bg-green-100 text-green-800' :
          'bg-purple-100 text-purple-800'
        }`}>
          {row.type}
        </span>
      )
    },
    {
      header: 'GST/PAN',
      accessor: 'gstNo',
      render: (row) => row.gstNo || row.pan || 'N/A'
    },
    {
      header: 'Contact',
      accessor: 'contactNo'
    },
    {
      header: 'Country',
      accessor: 'country',
      render: (row) => row.country || 'India'
    },
    {
      header: 'Status',
      accessor: 'status',
      render: (row) => (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          row.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
        }`}>
          {row.status}
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
          <h1 className="text-2xl font-bold text-gray-900">Vendors</h1>
          <p className="text-gray-600">Manage your vendor relationships</p>
        </div>
        
        <div className="relative">
          <Button
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center space-x-2"
          >
            <Plus size={20} />
            <span>Add Vendor</span>
            <ChevronDown size={16} className={`transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
          </Button>
          
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
              <div className="py-1">
                <button
                  onClick={() => handleAddVendor('Local')}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  Local Vendor
                </button>
                <button
                  onClick={() => handleAddVendor('National')}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  National Vendor
                </button>
                <button
                  onClick={() => handleAddVendor('International')}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  International Vendor
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Vendors Table */}
      <DataTable
        columns={columns}
        data={vendors}
        loading={loading}
        currentPage={currentPage}
        totalPages={Math.ceil(vendors.length / 10)}
        onPageChange={setCurrentPage}
        emptyMessage="No vendors found"
      />

      {/* Add Vendor Modal */}
      <VendorModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        type={modalType}
        onSubmit={(data) => {
          console.log('Vendor data:', data);
          setShowModal(false);
          // Here you would make an API call to create the vendor
        }}
      />
    </div>
  );
};

// Vendor Modal Component
const VendorModal = ({ isOpen, onClose, type, onSubmit }) => {
  const [formData, setFormData] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...formData, type });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const renderFormFields = () => {
    switch (type) {
      case 'Local':
        return (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Company Name *
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
                Type of Goods/Services
              </label>
              <input
                type="text"
                name="goodsServices"
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
          </>
        );
      
      case 'National':
        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Company Name *
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
                  GST No *
                </label>
                <input
                  type="text"
                  name="gstNo"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  PAN *
                </label>
                <input
                  type="text"
                  name="pan"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Contact *
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
                Bank Details
              </label>
              <textarea
                name="bankDetails"
                rows="2"
                placeholder="Bank Name, Account Number, IFSC Code"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                onChange={handleChange}
              />
            </div>
          </>
        );
      
      case 'International':
        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Company Name *
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
                  Contact *
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
                  Currency *
                </label>
                <select
                  name="currency"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  onChange={handleChange}
                >
                  <option value="">Select Currency</option>
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="GBP">GBP</option>
                  <option value="JPY">JPY</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  SWIFT/IBAN *
                </label>
                <input
                  type="text"
                  name="swiftIban"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Import License No
                </label>
                <input
                  type="text"
                  name="importLicenseNo"
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
          </>
        );
      
      default:
        return null;
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Add ${type} Vendor`}
      size="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {renderFormFields()}
        
        <div className="flex justify-end space-x-3 pt-4">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">
            Add Vendor
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default Vendors;
