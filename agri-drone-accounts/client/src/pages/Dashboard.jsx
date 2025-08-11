import React, { useState, useEffect } from 'react';
import {
  Building2,
  Users,
  UserCheck,
  ShoppingCart,
  TrendingUp,
  Clock,
  Activity,
  Plus
} from 'lucide-react';


const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock API call - will be replaced with actual API call
    setTimeout(() => {
      setDashboardData({
        summary: {
          totalVendors: 5,
          totalCustomers: 3,
          totalEmployees: 5,
          totalPurchases: 5,
          totalPurchaseValue: 911550,
          pendingPayments: 88500,
          pendingRequests: 2
        },
        latestPurchases: [
          { id: 1, purchaseId: 'PUR001', item: 'Flight Controller Boards', total: 147500, date: '2024-01-20' },
          { id: 2, purchaseId: 'PUR002', item: 'Carbon Fiber Propellers', total: 35400, date: '2024-01-19' },
          { id: 3, purchaseId: 'PUR003', item: 'LiPo Batteries 6S 22000mAh', total: 250750, date: '2024-01-18' },
          { id: 4, purchaseId: 'PUR004', item: 'GPS Navigation Modules', total: 424800, date: '2024-01-17' },
          { id: 5, purchaseId: 'PUR005', item: 'Servo Motors', total: 53100, date: '2024-01-16' }
        ],
        latestVendors: [
          { id: 5, name: 'Local Motors & Gears', type: 'Local', createdAt: '2024-01-18' },
          { id: 1, name: 'TechCorp Electronics', type: 'Local', createdAt: '2024-01-15' },
          { id: 4, name: 'Battery Solutions India', type: 'National', createdAt: '2024-01-12' },
          { id: 2, name: 'Global Drone Parts Ltd', type: 'National', createdAt: '2024-01-10' },
          { id: 3, name: 'AeroTech International', type: 'International', createdAt: '2024-01-05' }
        ],
        pendingRequests: [
          { id: 2, requestId: 'REQ002', employeeName: 'Dr. Priya Sharma', item: 'Development Board - ARM Cortex', cost: 12500 },
          { id: 4, requestId: 'REQ004', employeeName: 'Sneha Gupta', item: 'Quality Testing Tools', cost: 25000 }
        ],
        recentActivities: [
          { id: 1, type: 'vendor', description: 'Local Motors & Gears added as local vendor', timestamp: '2024-01-18T10:30:00Z' },
          { id: 2, type: 'purchase', description: 'PUR005 for Servo Motors worth ₹53,100', timestamp: '2024-01-16T14:20:00Z' },
          { id: 3, type: 'employee', description: 'Dr. Priya Sharma requested Research Equipment', timestamp: '2024-01-20T09:15:00Z' },
          { id: 4, type: 'payment', description: 'Payment of ₹4,24,800 to AeroTech International', timestamp: '2024-01-17T16:45:00Z' },
          { id: 5, type: 'customer', description: 'Amit Patel from FarmDrone India registered', timestamp: '2024-01-15T11:30:00Z' }
        ]
      });
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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Welcome to Accounts IMS Dashboard</h1>
        <p className="text-primary-100">
          Manage your agricultural drone manufacturing accounts efficiently
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Vendors</p>
              <p className="text-2xl font-bold text-gray-900">{dashboardData.summary.totalVendors}</p>
            </div>
            <Building2 className="h-8 w-8 text-primary-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Customers</p>
              <p className="text-2xl font-bold text-gray-900">{dashboardData.summary.totalCustomers}</p>
            </div>
            <Users className="h-8 w-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Employees</p>
              <p className="text-2xl font-bold text-gray-900">{dashboardData.summary.totalEmployees}</p>
            </div>
            <UserCheck className="h-8 w-8 text-purple-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Purchases</p>
              <p className="text-2xl font-bold text-gray-900">{dashboardData.summary.totalPurchases}</p>
            </div>
            <ShoppingCart className="h-8 w-8 text-orange-600" />
          </div>
        </div>
      </div>

      {/* Financial Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Purchase Value</p>
              <p className="text-xl font-bold text-green-600">
                {formatCurrency(dashboardData.summary.totalPurchaseValue)}
              </p>
            </div>
            <TrendingUp className="h-6 w-6 text-green-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Pending Payments</p>
              <p className="text-xl font-bold text-yellow-600">
                {formatCurrency(dashboardData.summary.pendingPayments)}
              </p>
            </div>
            <Clock className="h-6 w-6 text-yellow-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Pending Requests</p>
              <p className="text-xl font-bold text-red-600">{dashboardData.summary.pendingRequests}</p>
            </div>
            <Activity className="h-6 w-6 text-red-600" />
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Latest Purchases */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Latest 5 Purchases</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {dashboardData.latestPurchases.map((purchase) => (
                <div key={purchase.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{purchase.purchaseId}</p>
                    <p className="text-sm text-gray-500">{purchase.item}</p>
                    <p className="text-xs text-gray-400">{formatDate(purchase.date)}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">{formatCurrency(purchase.total)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Latest Vendor Registrations */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Latest 5 Vendor Registrations</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {dashboardData.latestVendors.map((vendor) => (
                <div key={vendor.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{vendor.name}</p>
                    <p className="text-sm text-gray-500">{vendor.type} Vendor</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-400">{formatDate(vendor.createdAt)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pending Salaries/Payments */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Pending Procurement Requests</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {dashboardData.pendingRequests.map((request) => (
                <div key={request.id} className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div>
                    <p className="font-medium text-gray-900">{request.requestId}</p>
                    <p className="text-sm text-gray-600">{request.employeeName}</p>
                    <p className="text-sm text-gray-500">{request.item}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-yellow-700">{formatCurrency(request.cost)}</p>
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      Pending
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {dashboardData.recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <div className="w-2 h-2 bg-primary-600 rounded-full mt-2"></div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">{activity.description}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(activity.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
