import React, { useState, useEffect } from 'react';
import { Plus, Download, Edit, Eye } from 'lucide-react';
import Button from '../components/Button';
import Modal from '../components/Modal';
import DataTable from '../components/DataTable';

const Purchases = () => {
  const [purchases, setPurchases] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    // Mock API call - will be replaced with actual API call
    setTimeout(() => {
      setPurchases([
        {
          id: 1,
          purchaseId: "PUR001",
          date: "2024-01-20",
          vendorId: 1,
          vendorName: "TechCorp Electronics",
          item: "Flight Controller Boards",
          quantity: 50,
          unitPrice: 2500,
          gst: 18,
          total: 147500,
          paymentStatus: "Paid",
          invoiceFile: "invoice_001.pdf",
          createdAt: "2024-01-20"
        },
        {
          id: 2,
          purchaseId: "PUR002",
          date: "2024-01-19",
          vendorId: 2,
          vendorName: "Global Drone Parts Ltd",
          item: "Carbon Fiber Propellers",
          quantity: 200,
          unitPrice: 150,
          gst: 18,
          total: 35400,
          paymentStatus: "Unpaid",
          invoiceFile: "invoice_002.pdf",
          createdAt: "2024-01-19"
        },
        {
          id: 3,
          purchaseId: "PUR003",
          date: "2024-01-18",
          vendorId: 4,
          vendorName: "Battery Solutions India",
          item: "LiPo Batteries 6S 22000mAh",
          quantity: 25,
          unitPrice: 8500,
          gst: 18,
          total: 250750,
          paymentStatus: "Partial",
          invoiceFile: "invoice_003.pdf",
          createdAt: "2024-01-18"
        },
        {
          id: 4,
          purchaseId: "PUR004",
          date: "2024-01-17",
          vendorId: 3,
          vendorName: "AeroTech International",
          item: "GPS Navigation Modules",
          quantity: 30,
          unitPrice: 12000,
          gst: 18,
          total: 424800,
          paymentStatus: "Paid",
          invoiceFile: "invoice_004.pdf",
          createdAt: "2024-01-17"
        },
        {
          id: 5,
          purchaseId: "PUR005",
          date: "2024-01-16",
          vendorId: 5,
          vendorName: "Local Motors & Gears",
          item: "Servo Motors",
          quantity: 100,
          unitPrice: 450,
          gst: 18,
          total: 53100,
          paymentStatus: "Unpaid",
          invoiceFile: "invoice_005.pdf",
          createdAt: "2024-01-16"
        }
      ]);

      setVendors([
        { id: 1, name: "TechCorp Electronics" },
        { id: 2, name: "Global Drone Parts Ltd" },
        { id: 3, name: "AeroTech International" },
        { id: 4, name: "Battery Solutions India" },
        { id: 5, name: "Local Motors & Gears" }
      ]);

      setLoading(false);
    }, 1000);
  }, []);

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

  const handleDownloadInvoice = (filename) => {
    // Mock download functionality
    console.log(`Downloading ${filename}`);
    alert(`Downloading ${filename}`);
  };

  const columns = [
    {
      header: 'Purchase ID',
      accessor: 'purchaseId',
      render: (row) => (
        <span className="font-mono text-sm font-medium text-gray-900">{row.purchaseId}</span>
      )
    },
    {
      header: 'Date',
      accessor: 'date',
      render: (row) => formatDate(row.date)
    },
    {
      header: 'Vendor',
      accessor: 'vendorName'
    },
    {
      header: 'Item/Service',
      accessor: 'item',
      render: (row) => (
        <div>
          <p className="font-medium text-gray-900">{row.item}</p>
          <p className="text-sm text-gray-500">Qty: {row.quantity}</p>
        </div>
      )
    },
    {
      header: 'Total',
      accessor: 'total',
      render: (row) => formatCurrency(row.total)
    },
    {
      header: 'Payment Status',
      accessor: 'paymentStatus',
      render: (row) => (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          row.paymentStatus === 'Paid' ? 'bg-green-100 text-green-800' :
          row.paymentStatus === 'Partial' ? 'bg-yellow-100 text-yellow-800' :
          'bg-red-100 text-red-800'
        }`}>
          {row.paymentStatus}
        </span>
      )
    },
    {
      header: 'Actions',
      accessor: 'actions',
      render: (row) => (
        <div className="flex items-center space-x-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="p-2"
            onClick={() => handleDownloadInvoice(row.invoiceFile)}
          >
            <Download size={16} />
          </Button>
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
          <h1 className="text-2xl font-bold text-gray-900">Purchases</h1>
          <p className="text-gray-600">Manage your purchase orders and invoices</p>
        </div>
        
        <Button onClick={() => setShowModal(true)} className="flex items-center space-x-2">
          <Plus size={20} />
          <span>Add Purchase</span>
        </Button>
      </div>

      {/* Purchases Table */}
      <DataTable
        columns={columns}
        data={purchases}
        loading={loading}
        currentPage={currentPage}
        totalPages={Math.ceil(purchases.length / 10)}
        onPageChange={setCurrentPage}
        emptyMessage="No purchases found"
      />

      {/* Add Purchase Modal */}
      <PurchaseModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        vendors={vendors}
        onSubmit={(data) => {
          console.log('Purchase data:', data);
          setShowModal(false);
          // Here you would make an API call to create the purchase
        }}
      />
    </div>
  );
};

// Purchase Modal Component
const PurchaseModal = ({ isOpen, onClose, vendors, onSubmit }) => {
  const [formData, setFormData] = useState({
    gst: 18,
    paymentStatus: 'Unpaid'
  });
  const [invoiceFile, setInvoiceFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Calculate total
    const subtotal = formData.quantity * formData.unitPrice;
    const gstAmount = (subtotal * formData.gst) / 100;
    const total = subtotal + gstAmount;
    
    onSubmit({
      ...formData,
      total,
      invoiceFile: invoiceFile?.name || null
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    setInvoiceFile(e.target.files[0]);
  };

  const calculateTotal = () => {
    if (formData.quantity && formData.unitPrice) {
      const subtotal = formData.quantity * formData.unitPrice;
      const gstAmount = (subtotal * (formData.gst || 0)) / 100;
      return subtotal + gstAmount;
    }
    return 0;
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add Purchase"
      size="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date *
            </label>
            <input
              type="date"
              name="date"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Vendor *
            </label>
            <select
              name="vendorId"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              onChange={handleChange}
            >
              <option value="">Select Vendor</option>
              {vendors.map(vendor => (
                <option key={vendor.id} value={vendor.id}>{vendor.name}</option>
              ))}
            </select>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Item/Service *
          </label>
          <input
            type="text"
            name="item"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            onChange={handleChange}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
              Unit Price *
            </label>
            <input
              type="number"
              name="unitPrice"
              required
              min="0"
              step="0.01"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              GST (%) *
            </label>
            <input
              type="number"
              name="gst"
              required
              min="0"
              max="100"
              value={formData.gst}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              onChange={handleChange}
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Total Amount
            </label>
            <input
              type="text"
              value={new Intl.NumberFormat('en-IN', {
                style: 'currency',
                currency: 'INR',
                minimumFractionDigits: 0
              }).format(calculateTotal())}
              readOnly
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Payment Status *
            </label>
            <select
              name="paymentStatus"
              required
              value={formData.paymentStatus}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              onChange={handleChange}
            >
              <option value="Paid">Paid</option>
              <option value="Unpaid">Unpaid</option>
              <option value="Partial">Partial</option>
            </select>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Attach Invoice
          </label>
          <input
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={handleFileChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <p className="text-xs text-gray-500 mt-1">
            Supported formats: PDF, JPG, PNG (Max 5MB)
          </p>
        </div>
        
        <div className="flex justify-end space-x-3 pt-4">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">
            Add Purchase
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default Purchases;
