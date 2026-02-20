import { useState } from "react";
import { 
  Briefcase, 
  Users, 
  Calendar, 
  Target, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  CheckCircle, 
  Clock, 
  AlertCircle 
} from "lucide-react";

export default function ProjectsSection() {
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: "Employee Portal Redesign",
      client: "Internal",
      manager: "Sarah Johnson",
      startDate: "2024-01-01",
      endDate: "2024-06-30",
      status: "In Progress",
      progress: 65,
      teamSize: 8,
      budget: "₹50,000",
      priority: "High"
    },
    {
      id: 2,
      name: "Mobile App Development",
      client: "TechCorp Inc",
      manager: "Mike Chen",
      startDate: "2024-02-15",
      endDate: "2024-08-15",
      status: "Planning",
      progress: 15,
      teamSize: 12,
      budget: "₹120,000",
      priority: "High"
    },
    {
      id: 3,
      name: "Data Analytics Dashboard",
      client: "Analytics Ltd",
      manager: "Lisa Rodriguez",
      startDate: "2024-01-20",
      endDate: "2024-04-20",
      status: "Completed",
      progress: 100,
      teamSize: 6,
      budget: "₹35,000",
      priority: "Medium"
    },
    {
      id: 4,
      name: "CRM System Integration",
      client: "SalesPro",
      manager: "David Kim",
      startDate: "2024-03-01",
      endDate: "2024-09-30",
      status: "Not Started",
      progress: 0,
      teamSize: 10,
      budget: "₹75,000",
      priority: "Medium"
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProject, setNewProject] = useState({
    name: "",
    client: "",
    manager: "",
    startDate: "",
    endDate: "",
    priority: "Medium",
    budget: ""
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed": return "text-green-600 bg-green-100";
      case "In Progress": return "text-blue-600 bg-blue-100";
      case "Planning": return "text-yellow-600 bg-yellow-100";
      case "Not Started": return "text-gray-600 bg-gray-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High": return "text-red-600 bg-red-100";
      case "Medium": return "text-yellow-600 bg-yellow-100";
      case "Low": return "text-green-600 bg-green-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  const handleAddProject = (e) => {
    e.preventDefault();
    
    const newProjectData = {
      id: Date.now(),
      ...newProject,
      status: "Planning",
      progress: 0,
      teamSize: 0
    };
    
    setProjects([...projects, newProjectData]);
    setNewProject({
      name: "",
      client: "",
      manager: "",
      startDate: "",
      endDate: "",
      priority: "Medium",
      budget: ""
    });
    setIsModalOpen(false);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Project Management</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Project</span>
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-3 px-4 font-medium text-gray-600">Project</th>
              <th className="text-left py-3 px-4 font-medium text-gray-600">Client</th>
              <th className="text-left py-3 px-4 font-medium text-gray-600">Manager</th>
              <th className="text-left py-3 px-4 font-medium text-gray-600">Timeline</th>
              <th className="text-left py-3 px-4 font-medium text-gray-600">Progress</th>
              <th className="text-left py-3 px-4 font-medium text-gray-600">Team</th>
              <th className="text-left py-3 px-4 font-medium text-gray-600">Budget</th>
              <th className="text-left py-3 px-4 font-medium text-gray-600">Priority</th>
              <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
              <th className="text-left py-3 px-4 font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id} className="border-b hover:bg-gray-50">
                <td className="py-4 px-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                      <Briefcase className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{project.name}</h3>
                      <p className="text-sm text-gray-500">Project #{project.id}</p>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4 text-sm text-gray-600">{project.client}</td>
                <td className="py-4 px-4">
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-gray-400" />
                    <span className="text-sm font-medium">{project.manager}</span>
                  </div>
                </td>
                <td className="py-4 px-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span>{formatDate(project.startDate)} - {formatDate(project.endDate)}</span>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div className="flex flex-col space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Progress</span>
                      <span className="font-medium">{project.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `₹{project.progress}%` }}
                      />
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-sm">
                    {project.teamSize} members
                  </span>
                </td>
                <td className="py-4 px-4 text-sm font-medium text-gray-900">{project.budget}</td>
                <td className="py-4 px-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ₹{getPriorityColor(project.priority)}`}>
                    {project.priority}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <span className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm ₹{getStatusColor(project.status)}`}>
                    {project.status === "Completed" && <CheckCircle className="w-4 h-4" />}
                    {project.status === "In Progress" && <Clock className="w-4 h-4" />}
                    {project.status === "Planning" && <Target className="w-4 h-4" />}
                    {project.status === "Not Started" && <AlertCircle className="w-4 h-4" />}
                    <span>{project.status}</span>
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

      {/* Add Project Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <h3 className="text-lg font-semibold mb-4">Add New Project</h3>
            <form onSubmit={handleAddProject}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Project Name</label>
                  <input
                    type="text"
                    value={newProject.name}
                    onChange={(e) => setNewProject({...newProject, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Enter project name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Client</label>
                  <input
                    type="text"
                    value={newProject.client}
                    onChange={(e) => setNewProject({...newProject, client: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Enter client name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Project Manager</label>
                  <input
                    type="text"
                    value={newProject.manager}
                    onChange={(e) => setNewProject({...newProject, manager: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Enter manager name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                  <select
                    value={newProject.priority}
                    onChange={(e) => setNewProject({...newProject, priority: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                  <input
                    type="date"
                    value={newProject.startDate}
                    onChange={(e) => setNewProject({...newProject, startDate: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                  <input
                    type="date"
                    value={newProject.endDate}
                    onChange={(e) => setNewProject({...newProject, endDate: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Budget</label>
                  <input
                    type="text"
                    value={newProject.budget}
                    onChange={(e) => setNewProject({...newProject, budget: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Enter project budget"
                    required
                  />
                </div>
              </div>
              <div className="flex space-x-3 mt-6">
                <button
                  type="submit"
                  className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Create Project
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