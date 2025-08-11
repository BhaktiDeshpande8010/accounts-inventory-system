import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Dashboard from './pages/Dashboard';
import Vendors from './pages/Vendors';
import Customers from './pages/Customers';
import Employees from './pages/Employees';
import EmployeeDetails from './pages/EmployeeDetails';
import Purchases from './pages/Purchases';

function App() {
  return (
    <Router>
      <Routes>
        {/* Routes with sidebar layout */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/vendors" element={<Vendors />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/purchases" element={<Purchases />} />
        </Route>
        
        {/* Employee details route without sidebar */}
        <Route path="/employees/:id" element={<EmployeeDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
