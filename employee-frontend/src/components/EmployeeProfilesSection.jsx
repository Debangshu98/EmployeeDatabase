import { useState } from "react";
import { 
  User, 
  Mail, 
  Phone, 
  Briefcase, 
  Calendar, 
  MapPin, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Award, 
  GraduationCap, 
  Users, 
  Settings 
} from "lucide-react";

export default function EmployeeProfilesSection() {
  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: "John Smith",
      email: "john.smith@company.com",
      phone: "+1 (555) 123-4567",
      position: "Senior Developer",
      department: "Engineering",
      location: "New York, USA",
      hireDate: "2020-03-15",
      status: "Active",
      skills: ["JavaScript", "React", "Node.js", "TypeScript"],
      experience: "5 years",
      education: "BSc Computer Science",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah.johnson@company.com",
      phone: "+1 (555) 234-5678",
      position: "Product Manager",
      department: "Product",
      location: "San Francisco, USA",
      hireDate: "2019-07-22",
      status: "Active",
      skills: ["Product Strategy", "Agile", "UX Research", "Analytics"],
      experience: "8 years",
      education: "MBA Business Administration",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 3,
      name: "Mike Chen",
      email: "mike.chen@company.com",
      phone: "+1 (555) 345-6789",
      position: "UI/UX Designer",
      department: "Design",
      location: "Toronto, Canada",
      hireDate: "2021-01-10",
      status: "Active",
      skills: ["Figma", "Adobe XD", "User Research", "Prototyping"],
      experience: "4 years",
      education: "BFA Design",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 4,
      name: "Lisa Rodriguez",
      email: "lisa.rodriguez@company.com",
      phone: "+1 (555) 456-7890",
      position: "Marketing Specialist",
      department: "Marketing",
      location: "London, UK",
      hireDate: "2022-05-18",
      status: "Active",
      skills: ["Digital Marketing", "SEO", "Content Strategy", "Social Media"],
      experience: "3 years",
      education: "BA Marketing",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 5,
      name: "David Kim",
      email: "david.kim@company.com",
      phone: "+1 (555) 567-8901",
      position: "Sales Manager",
      department: "Sales",
      location: "Sydney, Australia",
      hireDate: "2018-11-05",
      status: "Active",
      skills: ["Sales Strategy", "Client Management", "CRM", "Negotiation"],
      experience: "10 years",
      education: "BBA Sales Management",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newEmployee, setNewEmployee] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
    department: "",
    location: "",
    hireDate: "",
    skills: "",
    experience: "",
    education: ""
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "Active": return "text-green-600 bg-green-100";
      case "On Leave": return "text-yellow-600 bg-yellow-100";
      case "Inactive": return "text-gray-600 bg-gray-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  const handleAddEmployee = (e) => {
    e.preventDefault();
    
    const newEmployeeData = {
      id: Date.now(),
      ...newEmployee,
      skills: newEmployee.skills.split(',').map(skill => skill.trim()),
      status: "Active",
      avatar: `https://api.dicebear.com/7.x/initials/svg?seed=₹{newEmployee.name}`
    };
    
    setEmployees([...employees, newEmployeeData]);
    setNewEmployee({
      name: "",
      email: "",
      phone: "",
      position: "",
      department: "",
      location: "",
      hireDate: "",
      skills: "",
      experience: "",
      education: ""
    });
    setIsModalOpen(false);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Employee Profiles</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Employee</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {employees.map((employee) => (
          <div key={employee.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="text-center">
              <img
                src={employee.avatar}
                alt={employee.name}
                className="w-20 h-20 rounded-full mx-auto mb-4"
              />
              <h3 className="font-semibold text-gray-900 text-lg">{employee.name}</h3>
              <p className="text-indigo-600 font-medium">{employee.position}</p>
              <p className="text-sm text-gray-500">{employee.department}</p>
            </div>

            <div className="mt-6 space-y-4">
              <div className="flex items-center space-x-3 text-sm text-gray-600">
                <Mail className="w-4 h-4" />
                <span>{employee.email}</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-gray-600">
                <Phone className="w-4 h-4" />
                <span>{employee.phone}</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-gray-600">
                <MapPin className="w-4 h-4" />
                <span>{employee.location}</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-gray-600">
                <Calendar className="w-4 h-4" />
                <span>Hired: {formatDate(employee.hireDate)}</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-gray-600">
                <Award className="w-4 h-4" />
                <span>{employee.experience}</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-gray-600">
                <GraduationCap className="w-4 h-4" />
                <span>{employee.education}</span>
              </div>
            </div>

            <div className="mt-4">
              <p className="text-xs text-gray-500 mb-2">Skills</p>
              <div className="flex flex-wrap gap-2">
                {employee.skills.map((skill, index) => (
                  <span key={index} className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ₹{getStatusColor(employee.status)}`}>
                {employee.status}
              </span>
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
            </div>
          </div>
        ))}
      </div>

      {/* Add Employee Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4">Add New Employee</h3>
            <form onSubmit={handleAddEmployee}>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    value={newEmployee.name}
                    onChange={(e) => setNewEmployee({...newEmployee, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Enter employee full name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={newEmployee.email}
                    onChange={(e) => setNewEmployee({...newEmployee, email: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Enter email address"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <input
                    type="tel"
                    value={newEmployee.phone}
                    onChange={(e) => setNewEmployee({...newEmployee, phone: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Enter phone number"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Position</label>
                  <input
                    type="text"
                    value={newEmployee.position}
                    onChange={(e) => setNewEmployee({...newEmployee, position: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Enter job position"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                  <input
                    type="text"
                    value={newEmployee.department}
                    onChange={(e) => setNewEmployee({...newEmployee, department: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Enter department"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <input
                    type="text"
                    value={newEmployee.location}
                    onChange={(e) => setNewEmployee({...newEmployee, location: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Enter location"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Hire Date</label>
                  <input
                    type="date"
                    value={newEmployee.hireDate}
                    onChange={(e) => setNewEmployee({...newEmployee, hireDate: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Experience</label>
                  <input
                    type="text"
                    value={newEmployee.experience}
                    onChange={(e) => setNewEmployee({...newEmployee, experience: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="e.g., 5 years"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Education</label>
                  <input
                    type="text"
                    value={newEmployee.education}
                    onChange={(e) => setNewEmployee({...newEmployee, education: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="e.g., BSc Computer Science"
                    required
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Skills (comma-separated)</label>
                  <input
                    type="text"
                    value={newEmployee.skills}
                    onChange={(e) => setNewEmployee({...newEmployee, skills: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="e.g., JavaScript, React, Node.js"
                    required
                  />
                </div>
              </div>
              <div className="flex space-x-3 mt-6">
                <button
                  type="submit"
                  className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Add Employee
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