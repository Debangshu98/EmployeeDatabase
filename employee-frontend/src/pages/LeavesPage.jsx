import { useState, useEffect, useRef } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import LeavesSection from "../components/LeavesSection";

export default function LeavesPage({ employee }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);

  useEffect(() => {
    if (!employee) {
      window.location.href = "/";
    }
  }, [employee]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarOpen && sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setSidebarOpen(false);
      }
    };

    if (sidebarOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [sidebarOpen]);

  if (!employee) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} sidebarRef={sidebarRef} />

      {/* Main Content */}
      <div className="lg:ml-0">
        {/* Header */}
        <Header employee={employee} />

        {/* Content Area */}
        <main className="p-6 max-w-7xl mx-auto">
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-bold text-gray-900">Leaves</h1>
            <p className="text-gray-600 mt-1">
              View and manage leave requests and approvals
            </p>
          </div>

          {/* Content */}
          <div className="space-y-6">
            <LeavesSection />
          </div>
        </main>
      </div>
    </div>
  );
}