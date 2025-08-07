// src/pages/Vendors/AddVendorLocal.jsx
import React, { useState } from 'react';
import { X } from 'lucide-react';

const AddVendorLocal = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    companyName: '',
    contactNumber: '',
    address: '',
    faxNumber: '',
    email: '',
    incorporationDate: '',
    gstNumber: '',
    legalStructure: '',
    otherLegalStructure: '',
    businessType: [],
    businessDetails: '',
    bankName: '',
    beneficiaryName: '',
    bankAddress: '',
    iban: '',
    swiftCode: '',
    undertakingName: '',
    undertakingTitle: '',
    undertakingSignature: null,
    undertakingDate: ''
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        businessType: checked 
          ? [...prev.businessType, value]
          : prev.businessType.filter(item => item !== value)
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({ ...prev, undertakingSignature: e.target.files[0] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">Local Vendor Registration</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* SECTION 1 */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-800 border-b pb-2">
              SECTION 1: COMPANY DETAILS AND GENERAL INFORMATION
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">Name of Company</label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">Contact Number</label>
                <input
                  type="tel"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div className="space-y-1 md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Address</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  rows={3}
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">Fax Number</label>
                <input
                  type="text"
                  name="faxNumber"
                  value={formData.faxNumber}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">Website/Email</label>
                <input
                  type="text"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">Date of Incorporation</label>
                <input
                  type="date"
                  name="incorporationDate"
                  value={formData.incorporationDate}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">GST Registration Number</label>
                <input
                  type="text"
                  name="gstNumber"
                  value={formData.gstNumber}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Legal Structure</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {['Private Ltd.', 'Public Ltd.', 'Partnership', 'LLP', 'Government', 'Sole Proprietorship', 'Other'].map((option) => (
                    <div key={option} className="flex items-center">
                      <input
                        type="radio"
                        id={`legal-${option}`}
                        name="legalStructure"
                        value={option}
                        checked={formData.legalStructure === option}
                        onChange={handleChange}
                        className="h-4 w-4 text-blue-600"
                      />
                      <label htmlFor={`legal-${option}`} className="ml-2 text-sm text-gray-700">
                        {option}
                      </label>
                    </div>
                  ))}
                </div>
                {formData.legalStructure === 'Other' && (
                  <div className="mt-2">
                    <input
                      type="text"
                      name="otherLegalStructure"
                      value={formData.otherLegalStructure}
                      onChange={handleChange}
                      placeholder="Please specify"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Type of Business/Commodity Service</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {['Retailer', 'Publication/Broadcaster', 'Manufacturer', 'Construction Contractor', 
                    'Professional Services', 'Consultant', 'Distribution/Dealer', 'Service Provider', 
                    'Freight/Transportation'].map((option) => (
                    <div key={option} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`business-${option}`}
                        name="businessType"
                        value={option}
                        checked={formData.businessType.includes(option)}
                        onChange={handleChange}
                        className="h-4 w-4 text-blue-600"
                      />
                      <label htmlFor={`business-${option}`} className="ml-2 text-sm text-gray-700">
                        {option}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">Details on Services or Goods Your Company Supplies</label>
                <textarea
                  name="businessDetails"
                  value={formData.businessDetails}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  rows={3}
                />
              </div>
            </div>
          </div>

          {/* SECTION 2 */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-800 border-b pb-2">
              SECTION 2: BANKING INFORMATION
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">Bank Name</label>
                <input
                  type="text"
                  name="bankName"
                  value={formData.bankName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">Beneficiary Name</label>
                <input
                  type="text"
                  name="beneficiaryName"
                  value={formData.beneficiaryName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div className="space-y-1 md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Bank Address</label>
                <textarea
                  name="bankAddress"
                  value={formData.bankAddress}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  rows={3}
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">IBAN</label>
                <input
                  type="text"
                  name="iban"
                  value={formData.iban}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">SWIFT/BIC Code</label>
                <input
                  type="text"
                  name="swiftCode"
                  value={formData.swiftCode}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
            </div>
          </div>

          {/* SECTION 3 */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-800 border-b pb-2">
              SECTION 3: UNDERTAKING
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  name="undertakingName"
                  value={formData.undertakingName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  name="undertakingTitle"
                  value={formData.undertakingTitle}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div className="space-y-1 md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Signature</label>
                <div className="flex items-center gap-4">
                  <input
                    type="file"
                    accept=".pdf,.jpg,.png"
                    onChange={handleFileChange}
                    className="block w-full text-sm text-gray-500
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-md file:border-0
                      file:text-sm file:font-semibold
                      file:bg-blue-50 file:text-blue-700
                      hover:file:bg-blue-100"
                  />
                  {formData.undertakingSignature && (
                    <span className="text-sm text-gray-600">
                      {formData.undertakingSignature.name}
                    </span>
                  )}
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">Date</label>
                <input
                  type="date"
                  name="undertakingDate"
                  value={formData.undertakingDate}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-4 pt-6 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddVendorLocal;