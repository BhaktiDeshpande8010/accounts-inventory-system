import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import VendorPage from "./pages/Vendors/VendorPage";
import Dashboard from "./pages/Dashboard/Dashboard";
import EmployeePage from "./pages/Employees/EmployeePage";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/vendor" element={<VendorPage />} />
        <Route path="/employee" element={<EmployeePage/>} />

      </Route>
    </Routes>
  );
}

export default App;
