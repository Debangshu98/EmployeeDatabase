import { useState } from "react";
import { 
  Users, 
  Mail, 
  Phone, 
  Building, 
  Calendar, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  UserPlus, 
  UserCheck, 
  UserX 
} from "lucide-react";

export default function ManagersSection() {
  const [managers, setManagers] = useState([
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah.johnson@company.com",
      phone: "+1 (555) 123-4567",
      department: "Engineering",
      teamSize: 15,
      hireDate: "2020-03-15",
      status: "Active",
      projects: 4,
      performance: "Excellent"
    },
    {
      id: 2,
      name: "Mike Chen",
      email: "mike.chen@company.com",
      phone: "+1 (555) 234-5678",
      department: "Product",
      teamSize: 12,
      hireDate: "2019-07-22",
      status: "Active",
      projects: 3,
      performance: "Good"
    },
    {
      id: 3,
      name: "Lisa Rodriguez",
      email: "lisa.rodriguez@company.com",
      phone: "+1 (555) 345-6789",
      department: "Marketing",
      teamSize: 8,
      hireDate: "2021-01-10",
      status: "Active",
      projects: 2,
      performance: "Excellent"
    },
    {
      id: 4,
      name: "David Kim",
      email: "david.kim@company.com",
      phone: "+1 (555) 456-7890",
      department: "Sales",
      teamSize: 20,
      hireDate: "2018-11-05",
      status: "Active",
      projects: 6,
      performance: "Outstanding"
    },
    {
      id: 5,
      name: "Emma Thompson",
      email: "emma.thompson@company.com",
      phone: "+1 (555) 567-8901",
      department: "HR",
      teamSize: 5,
      hireDate: "2022-05-18",
      status: "Active",
      projects: 1,
      performance: "Good"
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newManager, setNewManager] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    teamSize: "",
    hireDate: "",
    performance: "Good"
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "Active": return "text-green-600 bg-green-100";
      case "On Leave": return "text-yellow-600 bg-yellow-100";
      case "Inactive": return "text-gray-600 bg-gray-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  const getPerformanceColor = (performance) => {
    switch (performance) {
      case "Outstanding": return "text-green-600 bg-green-100";
      case "Excellent": return "text-blue-600 bg-blue-100";
      case "Good": return "text-yellow-600 bg-yellow-100";
      case "Needs Improvement": return "text-red-600 bg-red-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  const handleAddManager = (e) => {
    e.preventDefault();
    
    const newManagerData = {
      id: Date.now(),
      ...newManager,
      teamSize: parseInt(newManager.teamSize),
      status: "Active",
      projects: 0
    };
    
    setManagers([...managers, newManagerData]);
    setNewManager({
      name: "",
      email: "",
      phone: "",
      department: "",
      teamSize: "",
      hireDate: "",
      performance: "Good"
    });
    setIsModalOpen(false);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Manager Directory</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Manager</span>
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-3 px-4 font-medium text-gray-600">Manager</th>
              <th className="text-left py-3 px-4 font-medium text-gray-600">Contact</th>
              <th className="text-left py-3 px-4 font-medium text-gray-600">Department</th>
              <th className="text-left py-3 px-4 font-medium text-gray-600">Team Size</th>
              <th className="text-left py-3 px-4 font-medium text-gray-600">Projects</th>
              <th className="text-left py-3 px-4 font-medium text-gray-600">Hire Date</th>
              <th className="text-left py-3 px-4 font-medium text-gray-600">Performance</th>
              <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
              <th className="text-left py-3 px-4 font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {managers.map((manager) => (
              <tr key={manager.id} className="border-b hover:bg-gray-50">
                <td className="py-4 px-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                      <Users className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{manager.name}</h3>
                      <p className="text-sm text-gray-500">Manager #{manager.id}</p>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{manager.email}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{manager.phone}</span>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center space-x-2">
                    <Building className="w-4 h-4 text-gray-400" />
                    <span className="text-sm font-medium">{manager.department}</span>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-sm">
                    {manager.teamSize} members
                  </span>
                </td>
                <td className="py-4 px-4 text-sm font-medium text-gray-900">{manager.projects}</td>
                <td className="py-4 px-4">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{formatDate(manager.hireDate)}</span>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ₹{getPerformanceColor(manager.performance)}`}>
                    {manager.performance}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <span className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm ₹{getStatusColor(manager.status)}`}>
                    {manager.status === "Active" && <UserCheck className="w-4 h-4" />}
                    {manager.status === "On Leave" && <Calendar className="w-4 h-4" />}
                    {manager.status === "Inactive" && <UserX className="w-4 h-4" />}
                    <span>{manager.status}</span>
                  </span>
                </td>
                <td className="py-4 px-4">
                  <div className="flex space-x-2">
                    <button className="text-gray-400 hover:text-blue-600 transition-colors">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="text-gray-400 hover:text-yellow-600 transition-colors">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="text-gray-400 hover:text-red-600 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Manager Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <h3 className="text-lg font-semibold mb-4">Add New Manager</h3>
            <form onSubmit={handleAddManager}>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Manager Name</label>
                  <input
                    type="text"
                    value={newManager.name}
                    onChange={(e) => setNewManager({...newManager, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Enter manager name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={newManager.email}
                    onChange={(e) => setNewManager({...newManager, email: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Enter email address"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <input
                    type="tel"
                    value={newManager.phone}
                    onChange={(e) => setNewManager({...newManager, phone: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Enter phone number"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                  <input
                    type="text"
                    value={newManager.department}
                    onChange={(e) => setNewManager({...newManager, department: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Enter department"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Team Size</label>
                  <input
                    type="number"
                    value={newManager.teamSize}
                    onChange={(e) => setNewManager({...newManager, teamSize: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Enter team size"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Hire Date</label>
                  <input
                    type="date"
                    value={newManager.hireDate}
                    onChange={(e) => setNewManager({...newManager, hireDate: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Performance</label>
                  <select
                    value={newManager.performance}
                    onChange={(e) => setNewManager({...newManager, performance: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="Outstanding">Outstanding</option>
                    <option value="Excellent">Excellent</option>
                    <option value="Good">Good</option>
                    <option value="Needs Improvement">Needs Improvement</option>
                  </select>
                </div>
              </div>
              <div className="flex space-x-3 mt-6">
                <button
                  type="submit"
                  className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Add Manager
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}