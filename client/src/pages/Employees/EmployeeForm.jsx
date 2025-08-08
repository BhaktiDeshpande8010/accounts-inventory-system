import React, { useState } from "react";

const EmployeeForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    employeeId: "",
    fullName: "",
    role: "",
    department: "",
    dateOfJoining: "",
    salaryType: "Monthly",
    basicSalary: "",
    paymentMethod: "",
    bankAccountNumber: "",
    ifscCode: "",
    status: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Employee Data Submitted:", formData);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-bold mb-4">Add Employee</h2>

      {/* Row 1 */}
      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          name="employeeId"
          placeholder="Employee ID"
          value={formData.employeeId}
          onChange={handleChange}
          className="border rounded-lg px-3 py-2"
        />
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleChange}
          className="border rounded-lg px-3 py-2"
        />
      </div>

      {/* Row 2 */}
      <div className="grid grid-cols-2 gap-4">
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="border rounded-lg px-3 py-2"
        >
          <option value="">Select Role</option>
          <option>Manager</option>
          <option>Accountant</option>
          <option>Clerk</option>
          <option>Technician</option>
        </select>
        <select
          name="department"
          value={formData.department}
          onChange={handleChange}
          className="border rounded-lg px-3 py-2"
        >
          <option value="">Select Department</option>
          <option>Accounts</option>
          <option>Inventory</option>
          <option>Sales</option>
          <option>Purchase</option>
        </select>
      </div>

      {/* Row 3 */}
      <div className="grid grid-cols-2 gap-4">
        <input
          type="date"
          name="dateOfJoining"
          value={formData.dateOfJoining}
          onChange={handleChange}
          className="border rounded-lg px-3 py-2"
        />
        <select
          name="salaryType"
          value={formData.salaryType}
          onChange={handleChange}
          className="border rounded-lg px-3 py-2"
        >
          <option>Monthly</option>
          <option>Hourly</option>
          <option>Contract</option>
        </select>
      </div>

      {/* Row 4 */}
      <div className="grid grid-cols-2 gap-4">
        <input
          type="number"
          name="basicSalary"
          placeholder="Basic Salary"
          value={formData.basicSalary}
          onChange={handleChange}
          className="border rounded-lg px-3 py-2"
        />
        <select
          name="paymentMethod"
          value={formData.paymentMethod}
          onChange={handleChange}
          className="border rounded-lg px-3 py-2"
        >
          <option value="">Select Payment Method</option>
          <option>Bank Transfer</option>
          <option>Cheque</option>
          <option>Cash</option>
        </select>
      </div>

      {/* Row 5 */}
      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          name="bankAccountNumber"
          placeholder="Bank Account Number"
          value={formData.bankAccountNumber}
          onChange={handleChange}
          className="border rounded-lg px-3 py-2"
        />
        <input
          type="text"
          name="ifscCode"
          placeholder="IFSC Code"
          value={formData.ifscCode}
          onChange={handleChange}
          className="border rounded-lg px-3 py-2"
        />
      </div>

      {/* Status */}
      <select
        name="status"
        value={formData.status}
        onChange={handleChange}
        className="border rounded-lg px-3 py-2"
      >
        <option value="">Select Status</option>
        <option>Active</option>
        <option>Resigned</option>
      </select>

      {/* Buttons */}
      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 border rounded-lg"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default EmployeeForm;