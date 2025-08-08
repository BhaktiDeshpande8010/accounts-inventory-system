// import React, { useState, useEffect } from 'react';
// import { Edit, Trash2, Plus, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
// import AddVendorLocal from './AddVendorLocal';
// import axios from 'axios';

// const VendorsPage = () => {
//   // State management
//   const [vendors, setVendors] = useState([]);
//   const [totalVendors, setTotalVendors] = useState(0);
//   const [showDropdown, setShowDropdown] = useState(false);
//   const [showLocalVendorModal, setShowLocalVendorModal] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const vendorsPerPage = 5;

//   // Fetch vendors from API
//   useEffect(() => {
//     const fetchVendors = async () => {
//       try {
//         setLoading(true);
//         const response = await axios.get(`/api/vendors?page=${currentPage}&limit=${vendorsPerPage}`);
        
//         if (response.data?.data) {
//           setVendors(response.data.data);
//           setTotalVendors(response.data.total || 0);
//         } else {
//           setVendors([]);
//         }
//         setError(null);
//       } catch (err) {
//         setError(err.response?.data?.error || 'Failed to fetch vendors');
//         setVendors([]);
//       } finally {
//         setLoading(false);
//       }
//     };
    
//     fetchVendors();
//   }, [currentPage]);

//   // Create new vendor
//   const handleAddVendor = async (vendorData) => {
//     try {
//       const formData = new FormData();
      
//       // Append all fields to formData
//       Object.entries(vendorData).forEach(([key, value]) => {
//         if (value instanceof File) {
//           formData.append('signature', value);
//         } else if (typeof value === 'object') {
//           formData.append(key, JSON.stringify(value));
//         } else {
//           formData.append(key, value);
//         }
//       });

//       await axios.post('/api/vendors', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data'
//         }
//       });

//       // Refresh data
//       const response = await axios.get(`/api/vendors?page=1&limit=${vendorsPerPage}`);
//       setVendors(response.data.data);
//       setTotalVendors(response.data.total);
//       setCurrentPage(1);
//       setShowLocalVendorModal(false);
//     } catch (err) {
//       setError(err.response?.data?.error || 'Failed to create vendor');
//     }
//   };

//   // Delete vendor
//   const handleDelete = async (vendorId) => {
//     try {
//       await axios.delete(`/api/vendors/${vendorId}`);
      
//       // Adjust pagination if needed
//       const newPage = vendors.length === 1 && currentPage > 1 
//         ? currentPage - 1 
//         : currentPage;
      
//       const response = await axios.get(`/api/vendors?page=${newPage}&limit=${vendorsPerPage}`);
//       setVendors(response.data.data);
//       setTotalVendors(response.data.total);
//       setCurrentPage(newPage);
//     } catch (err) {
//       setError('Failed to delete vendor. Please try again.');
//     }
//   };

//   // Status and type styling
//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'Active': return 'bg-green-100 text-green-800';
//       case 'Pending': return 'bg-yellow-100 text-yellow-800';
//       default: return 'bg-gray-100 text-gray-800';
//     }
//   };

//   const getTypeColor = (type) => {
//     switch (type) {
//       case 'Local': return 'bg-blue-100 text-blue-800';
//       case 'National': return 'bg-purple-100 text-purple-800';
//       case 'International': return 'bg-orange-100 text-orange-800';
//       default: return 'bg-gray-100 text-gray-800';
//     }
//   };

//   // Pagination controls
//   const paginate = (pageNumber) => {
//     const totalPages = Math.ceil(totalVendors / vendorsPerPage);
//     if (pageNumber < 1 || pageNumber > totalPages) return;
//     setCurrentPage(pageNumber);
//   };

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       {/* Header Section */}
//       <div className="flex justify-between items-start mb-6">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-800">Vendors</h1>
//           <h2 className="text-lg font-semibold text-gray-600 mt-1">Registered Vendors</h2>
//         </div>
        
//         {/* Add Vendor Button with Dropdown */}
//         <div className="relative">
//           <button
//             onClick={() => setShowDropdown(!showDropdown)}
//             className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-blue-700 transition-colors shadow-sm"
//           >
//             <Plus size={18} />
//             Add Vendor
//             <ChevronDown size={16} className={`transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
//           </button>
          
//           {showDropdown && (
//             <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-10 overflow-hidden">
//               <div className="py-1">
//                 <button 
//                   onClick={() => {
//                     setShowLocalVendorModal(true);
//                     setShowDropdown(false);
//                   }}
//                   className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
//                 >
//                   Local Vendor
//                 </button>
//                 <button className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
//                   National Vendor
//                 </button>
//                 <button className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
//                   International Vendor
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Error Message */}
//       {error && (
//         <div className="mb-4 p-4 bg-red-100 border-l-4 border-red-500 text-red-700">
//           <p>{error}</p>
//         </div>
//       )}

//       {/* Loading State */}
//       {loading ? (
//         <div className="flex justify-center items-center h-64">
//           <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//         </div>
//       ) : (
//         /* Vendors Table */
//         <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">VENDOR NAME</th>
//                   <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">TYPE</th>
//                   <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">GST NO.</th>
//                   <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">CONTACT NO.</th>
//                   <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">STATUS</th>
//                   <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">ACTIONS</th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {vendors.length > 0 ? (
//                   vendors.map((vendor) => (
//                     <tr key={vendor._id} className="hover:bg-gray-50">
//                       <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                         {vendor.name}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(vendor.type)}`}>
//                           {vendor.type}
//                         </span>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-mono">
//                         {vendor.gstNo}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
//                         {vendor.contactNo}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(vendor.status)}`}>
//                           {vendor.status}
//                         </span>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                         <div className="flex items-center gap-3">
//                           <button
//                             onClick={() => console.log('Edit:', vendor._id)}
//                             className="text-blue-600 hover:text-blue-800 p-1.5 rounded-full hover:bg-blue-50"
//                             title="Edit"
//                           >
//                             <Edit size={16} strokeWidth={2} />
//                           </button>
//                           <button
//                             onClick={() => handleDelete(vendor._id)}
//                             className="text-red-600 hover:text-red-800 p-1.5 rounded-full hover:bg-red-50"
//                             title="Delete"
//                           >
//                             <Trash2 size={16} strokeWidth={2} />
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
//                       No vendors found
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>

//           {/* Pagination */}
//           {totalVendors > vendorsPerPage && (
//             <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
//               <div className="text-sm text-gray-700">
//                 Showing <span className="font-medium">{(currentPage - 1) * vendorsPerPage + 1}</span> to{' '}
//                 <span className="font-medium">{Math.min(currentPage * vendorsPerPage, totalVendors)}</span> of{' '}
//                 <span className="font-medium">{totalVendors}</span> vendors
//               </div>
//               <div className="flex space-x-2">
//                 <button
//                   onClick={() => paginate(currentPage - 1)}
//                   disabled={currentPage === 1}
//                   className={`px-3 py-1.5 rounded-md border ${
//                     currentPage === 1 ? 'text-gray-400 bg-gray-100 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'
//                   }`}
//                 >
//                   <ChevronLeft size={16} />
//                 </button>
                
//                 {Array.from({ length: Math.ceil(totalVendors / vendorsPerPage) }, (_, i) => (
//                   <button
//                     key={i + 1}
//                     onClick={() => paginate(i + 1)}
//                     className={`px-3.5 py-1.5 text-sm rounded-md border ${
//                       currentPage === i + 1 ? 'bg-blue-600 text-white border-blue-600' : 'text-gray-700 hover:bg-gray-100'
//                     }`}
//                   >
//                     {i + 1}
//                   </button>
//                 ))}
                
//                 <button
//                   onClick={() => paginate(currentPage + 1)}
//                   disabled={currentPage === Math.ceil(totalVendors / vendorsPerPage)}
//                   className={`px-3 py-1.5 rounded-md border ${
//                     currentPage === Math.ceil(totalVendors / vendorsPerPage) 
//                       ? 'text-gray-400 bg-gray-100 cursor-not-allowed' 
//                       : 'text-gray-700 hover:bg-gray-100'
//                   }`}
//                 >
//                   <ChevronRight size={16} />
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       )}

//       {/* Local Vendor Modal */}
//       {showLocalVendorModal && (
//         <AddVendorLocal 
//           onClose={() => setShowLocalVendorModal(false)}
//           onSubmit={handleAddVendor}
//         />
//       )}
//     </div>
//   );
// };

// export default VendorsPage;

import React, { useState } from 'react';
import { Edit, Trash2, Plus, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import AddVendorLocal from './AddVendorLocal';

// Mock data for vendors
const mockVendors = [
  {
    id: 1,
    name: 'ABC Suppliers Ltd.',
    type: 'Local',
    gstNo: '27AABCU9603R1ZX',
    contactNo: '+91 9876543210',
    status: 'Active'
  },
  {
    id: 2,  
    name: 'XYZ International',
    type: 'International', 
    gstNo: '29AABCU9603R1ZY',
    contactNo: '+1 234-567-8900',
    status: 'Pending'
  },
  ...Array.from({ length: 15 }, (_, i) => ({
    id: i + 3,
    name: `Vendor ${i + 3}`,
    type: i % 3 === 0 ? 'Local' : i % 3 === 1 ? 'National' : 'International',
    gstNo: `GST${Math.floor(100000 + Math.random() * 900000)}`,
    contactNo: `+91 ${Math.floor(9000000000 + Math.random() * 1000000000)}`,
    status: i % 2 === 0 ? 'Active' : 'Pending'
  }))
];

const VendorsPage = () => {
  const [vendors, setVendors] = useState(mockVendors);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showLocalVendorModal, setShowLocalVendorModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const vendorsPerPage = 5;

  // Get current vendors for pagination
  const indexOfLastVendor = currentPage * vendorsPerPage;
  const indexOfFirstVendor = indexOfLastVendor - vendorsPerPage;
  const currentVendors = vendors.slice(indexOfFirstVendor, indexOfLastVendor);
  const totalPages = Math.ceil(vendors.length / vendorsPerPage);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleEdit = (vendorId) => {
    console.log('Edit vendor:', vendorId);
  };

  const handleDelete = (vendorId) => {
    setVendors(vendors.filter(vendor => vendor.id !== vendorId));
  };

  const handleAddVendor = (vendorData) => {
    const newVendor = {
      id: vendors.length + 1,
      name: vendorData.companyName,
      type: 'Local',
      gstNo: vendorData.gstNumber,
      contactNo: vendorData.contactNumber,
      status: 'Pending'
    };
    setVendors([...vendors, newVendor]);
    setShowLocalVendorModal(false);
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Registered Vendors</h1>
          <p className="text-gray-600 mt-1">Manage all your registered vendors</p>
        </div>
        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="bg-blue-600 text-white px-4 py-2.5 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors shadow-md"
          >
            <Plus size={20} />
            <span className="font-medium">Add Vendor</span>
            <ChevronDown size={16} className={`transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
          </button>
          
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-10 overflow-hidden">
              <div className="py-1">
                <button 
                  onClick={() => {
                    setShowLocalVendorModal(true);
                    setShowDropdown(false);
                  }}
                  className="block w-full text-left px-4 py-2.5 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                >
                  Local Vendor
                </button>
                <button className="block w-full text-left px-4 py-2.5 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                  National Vendor
                </button>
                <button className="block w-full text-left px-4 py-2.5 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                  International Vendor
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Vendors Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3.5 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-200">
                  Vendor Name
                </th>
                <th className="px-6 py-3.5 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-200">
                  Type
                </th>
                <th className="px-6 py-3.5 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-200">
                  GST No.
                </th>
                <th className="px-6 py-3.5 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-200">
                  Contact No.
                </th>
                <th className="px-6 py-3.5 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-200">
                  Status
                </th>
                <th className="px-6 py-3.5 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-200">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentVendors.map((vendor) => (
                <tr key={vendor.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{vendor.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1.5 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      vendor.type === 'Local' ? 'bg-blue-100 text-blue-800' :
                      vendor.type === 'International' ? 'bg-purple-100 text-purple-800' :
                      'bg-green-100 text-green-800'
                    }`}>
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
                    <span className={`px-3 py-1.5 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(vendor.status)}`}>
                      {vendor.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleEdit(vendor.id)}
                        className="text-blue-600 hover:text-blue-800 p-1.5 rounded-full hover:bg-blue-50 transition-colors"
                        title="Edit"
                      >
                        <Edit size={18} strokeWidth={2} />
                      </button>
                      <button
                        onClick={() => handleDelete(vendor.id)}
                        className="text-red-600 hover:text-red-800 p-1.5 rounded-full hover:bg-red-50 transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={18} strokeWidth={2} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {vendors.length > vendorsPerPage && (
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Showing <span className="font-medium">{indexOfFirstVendor + 1}</span> to{' '}
              <span className="font-medium">{Math.min(indexOfLastVendor, vendors.length)}</span> of{' '}
              <span className="font-medium">{vendors.length}</span> vendors
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => paginate(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className={`px-3 py-1.5 rounded-md border ${currentPage === 1 ? 'text-gray-400 bg-gray-100 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'}`}
              >
                <ChevronLeft size={18} />
              </button>
              
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => paginate(i + 1)}
                  className={`px-3.5 py-1.5 rounded-md border ${currentPage === i + 1 ? 'bg-blue-600 text-white border-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}
                >
                  {i + 1}
                </button>
              ))}
              
              <button
                onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className={`px-3 py-1.5 rounded-md border ${currentPage === totalPages ? 'text-gray-400 bg-gray-100 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'}`}
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Local Vendor Modal */}
      {showLocalVendorModal && (
        <AddVendorLocal 
          onClose={() => setShowLocalVendorModal(false)}
          onSubmit={handleAddVendor}
        />
      )}
    </div>
  );
};

export default VendorsPage;