import React, { useState } from "react";
import {
  Edit,
  Trash2,
  Plus,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Search,
} from "lucide-react";
import AddVendorLocal from "./AddVendorLocal";
import AddVendorNational from "./AddVendorNational";

// Mock data for vendors
const mockVendors = [
  {
    id: 1,
    name: "ABC Suppliers Ltd.",
    type: "Local",
    gstNo: "27AABCU9603R1ZX",
    contactNo: "+91 9876543210",
    status: "Active",
  },
  {
    id: 2,
    name: "XYZ International",
    type: "International",
    gstNo: "29AABCU9603R1ZY",
    contactNo: "+1 234-567-8900",
    status: "Pending",
  },
  ...Array.from({ length: 15 }, (_, i) => ({
    id: i + 3,
    name: `Vendor ${i + 3}`,
    type: i % 3 === 0 ? "Local" : i % 3 === 1 ? "National" : "International",
    gstNo: `GST${Math.floor(100000 + Math.random() * 900000)}`,
    contactNo: `+91 ${Math.floor(9000000000 + Math.random() * 1000000000)}`,
    status: i % 2 === 0 ? "Active" : "Pending",
  })),
];

const VendorsPage = () => {
  const [vendors, setVendors] = useState(mockVendors);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [showLocalVendorModal, setShowLocalVendorModal] = useState(false);
  const [showNationalVendorModal, setShowNationalVendorModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const vendorsPerPage = 5;

  // Filter vendors based on search term
  const filteredVendors = vendors.filter(
    (vendor) =>
      vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.gstNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.contactNo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get current vendors for pagination
  const indexOfLastVendor = currentPage * vendorsPerPage;
  const indexOfFirstVendor = indexOfLastVendor - vendorsPerPage;
  const currentVendors = filteredVendors.slice(
    indexOfFirstVendor,
    indexOfLastVendor
  );
  const totalPages = Math.ceil(filteredVendors.length / vendorsPerPage);

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-50 text-green-700 ring-green-600/20";
      case "Pending":
        return "bg-yellow-50 text-yellow-700 ring-yellow-600/20";
      default:
        return "bg-gray-50 text-gray-700 ring-gray-600/20";
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case "Local":
        return "bg-blue-50 text-blue-700 ring-blue-600/20";
      case "National":
        return "bg-green-50 text-green-700 ring-green-600/20";
      case "International":
        return "bg-purple-50 text-purple-700 ring-purple-600/20";
      default:
        return "bg-gray-50 text-gray-700 ring-gray-600/20";
    }
  };

  const handleEdit = (vendorId) => {
    console.log("Edit vendor:", vendorId);
  };

  const handleDelete = (vendorId) => {
    setVendors(vendors.filter((vendor) => vendor.id !== vendorId));
  };

  const handleAddLocalVendor = (vendorData) => {
    const newVendor = {
      id: vendors.length + 1,
      name: vendorData.companyName,
      type: "Local",
      gstNo: vendorData.gstNumber,
      contactNo: vendorData.contactNumber,
      status: "Pending",
    };
    setVendors([...vendors, newVendor]);
    setShowLocalVendorModal(false);
  };

  const handleAddNationalVendor = (vendorData) => {
    const newVendor = {
      id: vendors.length + 1,
      name: vendorData.companyName,
      type: "National",
      gstNo: vendorData.gstNumber,
      contactNo: vendorData.contactNumber,
      status: "Pending",
    };
    setVendors([...vendors, newVendor]);
    setShowNationalVendorModal(false);
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="mb-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Vendor Management
            </h1>
            <p className="text-gray-500 mt-1">
              Manage all registered vendors and their details
            </p>
          </div>
          <div className="relative">
            
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="bg-blue-600 text-white px-4 py-2.5 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors shadow-md"
            >
              <Plus size={20} />
              <span className="font-medium">Add Vendor</span>
              <ChevronDown
                size={16}
                className={`transition-transform ${
                  showDropdown ? "rotate-180" : ""
                }`}
              />
            </button>
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-10 overflow-hidden">
                <div className="py-1">
                  <button
                    onClick={() => {
                      setShowLocalVendorModal(true);
                      setShowDropdown(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    Local Vendor
                  </button>
                  <button
                    onClick={() => {
                      setShowNationalVendorModal(true);
                      setShowDropdown(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    National Vendor
                  </button>
                  <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
                    International Vendor
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex items-center justify-between">
          <div className="relative w-full max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search vendors..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <span className="text-sm text-gray-500 mr-2">Status:</span>
              <select className="text-sm border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
                <option>All</option>
                <option>Active</option>
                <option>Pending</option>
              </select>
            </div>
            <div className="flex items-center">
              <span className="text-sm text-gray-500 mr-2">Type:</span>
              <select className="text-sm border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
                <option>All</option>
                <option>Local</option>
                <option>National</option>
                <option>International</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Vendors Table */}
      <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Vendor Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Type
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  GST No.
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Contact No.
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentVendors.length > 0 ? (
                currentVendors.map((vendor) => (
                  <tr
                    key={vendor.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="text-sm font-medium text-gray-900">
                          {vendor.name}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2.5 py-1.5 inline-flex text-xs leading-4 font-medium rounded-full ${getTypeColor(
                          vendor.type
                        )}`}
                      >
                        {vendor.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-mono">
                      {vendor.gstNo}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {vendor.contactNo}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2.5 py-1.5 inline-flex text-xs leading-4 font-medium rounded-full ${getStatusColor(
                          vendor.status
                        )}`}
                      >
                        {vendor.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => handleEdit(vendor.id)}
                          className="text-gray-500 hover:text-blue-600 p-1 rounded-md hover:bg-blue-50 transition-colors"
                          title="Edit"
                        >
                          <Edit size={18} strokeWidth={1.5} />
                        </button>
                        <button
                          onClick={() => handleDelete(vendor.id)}
                          className="text-gray-500 hover:text-red-600 p-1 rounded-md hover:bg-red-50 transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={18} strokeWidth={1.5} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="px-6 py-4 text-center text-sm text-gray-500"
                  >
                    No vendors found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {filteredVendors.length > vendorsPerPage && (
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
            <div className="flex-1 flex justify-between sm:hidden">
              <button
                onClick={() => paginate(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                  currentPage === 1
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                Previous
              </button>
              <button
                onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className={`ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                  currentPage === totalPages
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                Next
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing{" "}
                  <span className="font-medium">{indexOfFirstVendor + 1}</span>{" "}
                  to{" "}
                  <span className="font-medium">
                    {Math.min(indexOfLastVendor, filteredVendors.length)}
                  </span>{" "}
                  of{" "}
                  <span className="font-medium">{filteredVendors.length}</span>{" "}
                  results
                </p>
              </div>
              <div>
                <nav
                  className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                  aria-label="Pagination"
                >
                  <button
                    onClick={() => paginate(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${
                      currentPage === 1
                        ? "text-gray-300 cursor-not-allowed"
                        : "text-gray-500 hover:bg-gray-50"
                    }`}
                  >
                    <span className="sr-only">Previous</span>
                    <ChevronLeft size={20} />
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => paginate(i + 1)}
                      className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                        currentPage === i + 1
                          ? "z-10 bg-blue-50 border-blue-500 text-blue-600"
                          : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button
                    onClick={() =>
                      paginate(Math.min(totalPages, currentPage + 1))
                    }
                    disabled={currentPage === totalPages}
                    className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
                      currentPage === totalPages
                        ? "text-gray-300 cursor-not-allowed"
                        : "text-gray-500 hover:bg-gray-50"
                    }`}
                  >
                    <span className="sr-only">Next</span>
                    <ChevronRight size={20} />
                  </button>
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Local Vendor Modal */}
      {showLocalVendorModal && (
        <AddVendorLocal
          onClose={() => setShowLocalVendorModal(false)}
          onSubmit={handleAddLocalVendor}
        />
      )}

      {/* National Vendor Modal */}
      {showNationalVendorModal && (
        <AddVendorNational
          onClose={() => setShowNationalVendorModal(false)}
          onSubmit={handleAddNationalVendor}
        />
      )}
    </div>
  );
};

export default VendorsPage;
