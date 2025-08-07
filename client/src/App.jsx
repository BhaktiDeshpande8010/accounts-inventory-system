import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import VendorPage from "./pages/Vendors/VendorPage";
import Dashboard from "./pages/Dashboard/Dashboard";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/vendors" element={<VendorPage />} />
      </Route>
    </Routes>
  );
}

export default App;
