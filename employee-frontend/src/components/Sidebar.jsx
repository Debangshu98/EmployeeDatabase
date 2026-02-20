
import {
  Home,
  Users,
  Briefcase,
  Calendar,
  DollarSign,
  Settings,
  LogOut,
  Menu,
  X,
  User,
  Shield,
  Bell,
  ChevronRight,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function Sidebar({ isOpen, toggleSidebar, sidebarRef }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("employee");
    
    // Redirect to login page using React Router
    navigate("/Login");
  };
  const menuItems = [
    { icon: Home, label: "Dashboard", href: "/dashboard", color: "from-blue-500 to-cyan-500" },
    { icon: Users, label: "Employees", href: "/employees", color: "from-green-500 to-emerald-500" },
    { icon: Briefcase, label: "Projects", href: "/projects", color: "from-purple-500 to-pink-500" },
    { icon: Calendar, label: "Leaves", href: "/leaves", color: "from-orange-500 to-red-500" },
    { icon: DollarSign, label: "Salary", href: "/salary", color: "from-yellow-500 to-orange-500" },
    { icon: Settings, label: "Profile", href: "/profile", color: "from-indigo-500 to-purple-500" },
  ];

  const quickActions = [
    { icon: User, label: "My Profile", color: "text-blue-600" },
    { icon: Shield, label: "Security", color: "text-green-600" },
    { icon: Bell, label: "Notifications", color: "text-purple-600" },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden backdrop-blur-sm"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed top-0 left-0 z-50 w-72 h-screen bg-gradient-to-b from-slate-50 to-white shadow-2xl border-r border-gray-200/50 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-all duration-300 ease-in-out`}
      >
        {/* Header Section */}
        <div className="p-6 border-b border-gray-200/50 bg-white/50 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                  HR Dashboard
                </h1>
                <p className="text-xs text-gray-500">Employee Management</p>
              </div>
            </div>
            <button
              onClick={toggleSidebar}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors group"
            >
              <X className="w-5 h-5 text-gray-600 group-hover:text-gray-900" />
            </button>
          </div>
        </div>

        {/* Navigation Section */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          <div className="px-4 mb-4">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Main Menu</p>
          </div>
          
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.href}
              className="group flex items-center px-4 py-3 rounded-xl text-gray-700 hover:bg-gradient-to-r hover:from-white hover:to-gray-50 hover:shadow-md hover:shadow-gray-200/50 transition-all duration-200 border border-transparent hover:border-gray-200/50"
            >
              <div className={`w-10 h-10 bg-gradient-to-r ${item.color} rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-200 group-hover:scale-110`}>
                <item.icon className="w-5 h-5 text-white" />
              </div>
              <div className="ml-4 flex-1">
                <span className="block font-medium text-gray-900 group-hover:text-gray-900 transition-colors">
                  {item.label}
                </span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
            </Link>
          ))}
        </nav>

        {/* Quick Actions Section */}
        <div className="px-4 py-6 border-t border-gray-200/50">
          <div className="px-4 mb-4">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Quick Actions</p>
          </div>
          <div className="space-y-2">
            {quickActions.map((action, index) => (
              <button
                key={index}
                className="w-full flex items-center px-4 py-3 rounded-xl text-gray-700 hover:bg-gradient-to-r hover:from-white hover:to-gray-50 hover:shadow-md transition-all duration-200 border border-transparent hover:border-gray-200/50"
              >
                <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
                  <action.icon className={`w-5 h-5 ${action.color}`} />
                </div>
                <span className="ml-4 font-medium text-gray-900">{action.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200/50 bg-gradient-to-t from-white/80 to-transparent backdrop-blur-sm">
          <div className="space-y-3">
            <div className="px-4 py-3 bg-gradient-to-r from-red-50 to-pink-50 rounded-xl border border-red-200/50">
              <p className="text-xs text-red-600 font-medium">System Status</p>
              <p className="text-xs text-red-500">All systems operational</p>
            </div>
            <button 
              onClick={handleLogout}
              className="w-full flex items-center px-4 py-3 rounded-xl text-gray-700 hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 hover:text-red-600 transition-all duration-200 border border-transparent hover:border-red-200/50 group"
            >
              <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-200">
                <LogOut className="w-5 h-5 text-white" />
              </div>
              <span className="ml-4 font-medium text-gray-900 group-hover:text-red-700 transition-colors">Logout</span>
              <div className="ml-auto w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            </button>
          </div>
        </div>
      </div>

      {/* Sidebar Toggle Button */}
      {!isOpen && (
        <button
          onClick={toggleSidebar}
          className="fixed top-4 left-4 z-50 p-3 bg-white rounded-xl shadow-lg border border-gray-200/50 hover:shadow-xl transition-all duration-200 hover:scale-105"
        >
          <div className="flex items-center space-x-2">
            <Menu className="w-5 h-5 text-gray-700" />
            <span className="text-sm font-medium text-gray-700">Menu</span>
          </div>
        </button>
      )}
    </>
  );
}
