import { useState } from "react";
import {
  Bell,
  User,
  ChevronDown,
  Search,
  Settings,
  HelpCircle,
} from "lucide-react";

export default function Header({ employee }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const notifications = [
    { id: 1, message: "Your leave request has been approved", time: "2 min ago" },
    { id: 2, message: "Performance review scheduled for tomorrow", time: "1 hour ago" },
    { id: 3, message: "New project assigned to your team", time: "3 hours ago" },
  ];

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          {/* Searchbar removed */}
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <div className="relative">
            <button className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors">
              <Bell className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                3
              </span>
            </button>
            
            {/* Notifications Dropdown */}
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border z-50 hidden group-hover:block">
              <div className="p-4 border-b">
                <h3 className="font-semibold text-gray-900">Notifications</h3>
              </div>
              <div className="max-h-64 overflow-y-auto">
                {notifications.map((notification) => (
                  <div key={notification.id} className="p-4 border-b hover:bg-gray-50">
                    <p className="text-sm text-gray-700">{notification.message}</p>
                    <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                  </div>
                ))}
              </div>
              <div className="p-4 border-t">
                <button className="w-full text-center text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                  View All Notifications
                </button>
              </div>
            </div>
          </div>

          {/* User Menu */}
          <div className="relative group">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center text-white font-semibold">
                {employee?.name?.charAt(0) || "U"}
              </div>
              <span className="text-sm font-medium text-gray-700">
                {employee?.name || "User"}
              </span>
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border py-2 z-50">
                <div className="px-4 py-2 border-b">
                  <p className="text-sm font-medium text-gray-900">
                    {employee?.name}
                  </p>
                  <p className="text-xs text-gray-500">{employee?.email}</p>
                </div>
                <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                  <Settings className="w-4 h-4 inline mr-2" />
                  Settings
                </button>
                <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                  <HelpCircle className="w-4 h-4 inline mr-2" />
                  Help & Support
                </button>
                <div className="border-t mt-2">
                  <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                    <LogOut className="w-4 h-4 inline mr-2" />
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}