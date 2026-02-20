import { useState } from "react";
import { 
  Clock, 
  Calendar, 
  UserCheck, 
  UserX, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  TrendingUp, 
  TrendingDown, 
  BarChart3, 
  Users 
} from "lucide-react";

export default function AttendanceSection() {
  const [attendance, setAttendance] = useState([
    {
      id: 1,
      employee: "John Smith",
      employeeId: "EMP001",
      date: "2024-01-15",
      checkIn: "09:00",
      checkOut: "17:30",
      status: "Present",
      hoursWorked: 8.5,
      lateBy: 0,
      earlyBy: 0,
      department: "Engineering"
    },
    {
      id: 2,
      employee: "Sarah Johnson",
      employeeId: "EMP002",
      date: "2024-01-15",
      checkIn: "09:15",
      checkOut: "18:00",
      status: "Present",
      hoursWorked: 8.5,
      lateBy: 15,
      earlyBy: 0,
      department: "Product"
    },
    {
      id: 3,
      employee: "Mike Chen",
      employeeId: "EMP003",
      date: "2024-01-15",
      checkIn: null,
      checkOut: null,
      status: "Absent",
      hoursWorked: 0,
      lateBy: 0,
      earlyBy: 0,
      department: "Design"
    },
    {
      id: 4,
      employee: "Lisa Rodriguez",
      employeeId: "EMP004",
      date: "2024-01-15",
      checkIn: "08:45",
      checkOut: "17:00",
      status: "Present",
      hoursWorked: 8.0,
      lateBy: 0,
      earlyBy: 30,
      department: "Marketing"
    },
    {
      id: 5,
      employee: "David Kim",
      employeeId: "EMP005",
      date: "2024-01-15",
      checkIn: "09:30",
      checkOut: "16:30",
      status: "Present",
      hoursWorked: 6.5,
      lateBy: 30,
      earlyBy: 60,
      department: "Sales"
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newAttendance, setNewAttendance] = useState({
    employee: "",
    employeeId: "",
    date: "",
    checkIn: "",
    checkOut: "",
    status: "Present"
  });

  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedDepartment, setSelectedDepartment] = useState("All");

  const departments = ["All", "Engineering", "Product", "Design", "Marketing", "Sales"];

  const handleAddAttendance = (e) => {
    e.preventDefault();
    
    const checkInTime = new Date(`2024-01-01 ${newAttendance.checkIn}`);
    const checkOutTime = new Date(`2024-01-01 ${newAttendance.checkOut}`);
    const hoursWorked = (checkOutTime - checkInTime) / (1000 * 60 * 60);
    
    const lateBy = newAttendance.checkIn > "09:00" ? 
      Math.round((checkInTime - new Date('2024-01-01 09:00')) / (1000 * 60)) : 0;
    
    const earlyBy = newAttendance.checkOut < "17:30" ? 
      Math.round((new Date('2024-01-01 17:30') - checkOutTime) / (1000 * 60)) : 0;
    
    const newAttendanceData = {
      id: Date.now(),
      ...newAttendance,
      hoursWorked: hoursWorked,
      lateBy: lateBy,
      earlyBy: earlyBy,
      department: "Engineering" // Default department
    };
    
    setAttendance([...attendance, newAttendanceData]);
    setNewAttendance({
      employee: "",
      employeeId: "",
      date: "",
      checkIn: "",
      checkOut: "",
      status: "Present"
    });
    setIsModalOpen(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Present": return "text-green-600 bg-green-100";
      case "Absent": return "text-red-600 bg-red-100";
      case "Late": return "text-yellow-600 bg-yellow-100";
      case "On Leave": return "text-blue-600 bg-blue-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  const getDepartmentColor = (department) => {
    switch (department) {
      case "Engineering": return "text-blue-600 bg-blue-100";
      case "Product": return "text-purple-600 bg-purple-100";
      case "Design": return "text-pink-600 bg-pink-100";
      case "Marketing": return "text-green-600 bg-green-100";
      case "Sales": return "text-orange-600 bg-orange-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  const calculateStats = () => {
    const filtered = attendance.filter(a => a.date === selectedDate);
    const present = filtered.filter(a => a.status === "Present").length;
    const absent = filtered.filter(a => a.status === "Absent").length;
    const late = filtered.filter(a => a.lateBy > 0).length;
    const avgHours = filtered.reduce((sum, a) => sum + a.hoursWorked, 0) / filtered.length || 0;
    
    return { present, absent, late, avgHours };
  };

  const stats = calculateStats();

  const filteredAttendance = attendance.filter(a => {
    const dateMatch = a.date === selectedDate;
    const deptMatch = selectedDepartment === "All" || a.department === selectedDepartment;
    return dateMatch && deptMatch;
  });

  return (
    <div className="bg-white rounded-xl shadow-sm border p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Attendance Management</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Mark Attendance</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-600 font-medium">Present</p>
              <p className="text-2xl font-bold text-green-700">{stats.present}</p>
            </div>
            <UserCheck className="w-8 h-8 text-green-500" />
          </div>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-red-600 font-medium">Absent</p>
              <p className="text-2xl font-bold text-red-700">{stats.absent}</p>
            </div>
            <UserX className="w-8 h-8 text-red-500" />
          </div>
        </div>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-yellow-600 font-medium">Late</p>
              <p className="text-2xl font-bold text-yellow-700">{stats.late}</p>
            </div>
            <TrendingUp className="w-8 h-8 text-yellow-500" />
          </div>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-600 font-medium">Avg Hours</p>
              <p className="text-2xl font-bold text-blue-700">{stats.avgHours.toFixed(1)}</p>
            </div>
            <BarChart3 className="w-8 h-8 text-blue-500" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
          <select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {departments.map((dept) => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-3 px-4 font-medium text-gray-600">Employee</th>
              <th className="text-left py-3 px-4 font-medium text-gray-600">Department</th>
              <th className="text-left py-3 px-4 font-medium text-gray-600">Check In</th>
              <th className="text-left py-3 px-4 font-medium text-gray-600">Check Out</th>
              <th className="text-left py-3 px-4 font-medium text-gray-600">Hours Worked</th>
              <th className="text-left py-3 px-4 font-medium text-gray-600">Late By</th>
              <th className="text-left py-3 px-4 font-medium text-gray-600">Early By</th>
              <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
              <th className="text-left py-3 px-4 font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAttendance.map((record) => (
              <tr key={record.id} className="border-b hover:bg-gray-50">
                <td className="py-4 px-4">
                  <div>
                    <h3 className="font-medium text-gray-900">{record.employee}</h3>
                    <p className="text-sm text-gray-500">ID: {record.employeeId}</p>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDepartmentColor(record.department)}`}>
                    {record.department}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">
                      {record.checkIn || "Not checked in"}
                    </span>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">
                      {record.checkOut || "Not checked out"}
                    </span>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <span className="font-medium text-gray-900">{record.hoursWorked}h</span>
                </td>
                <td className="py-4 px-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    record.lateBy > 0 ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
                  }`}>
                    {record.lateBy > 0 ? `${record.lateBy} min` : "On time"}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    record.earlyBy > 0 ? "bg-yellow-100 text-yellow-700" : "bg-green-100 text-green-700"
                  }`}>
                    {record.earlyBy > 0 ? `${record.earlyBy} min` : "Full day"}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <span className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm ${getStatusColor(record.status)}`}>
                    {record.status === "Present" && <UserCheck className="w-4 h-4" />}
                    {record.status === "Absent" && <UserX className="w-4 h-4" />}
                    {record.status === "Late" && <TrendingUp className="w-4 h-4" />}
                    {record.status === "On Leave" && <Calendar className="w-4 h-4" />}
                    <span>{record.status}</span>
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

      {/* Add Attendance Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <h3 className="text-lg font-semibold mb-4">Mark Attendance</h3>
            <form onSubmit={handleAddAttendance}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Employee Name</label>
                  <input
                    type="text"
                    value={newAttendance.employee}
                    onChange={(e) => setNewAttendance({...newAttendance, employee: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Enter employee name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Employee ID</label>
                  <input
                    type="text"
                    value={newAttendance.employeeId}
                    onChange={(e) => setNewAttendance({...newAttendance, employeeId: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Enter employee ID"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                  <input
                    type="date"
                    value={newAttendance.date}
                    onChange={(e) => setNewAttendance({...newAttendance, date: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <select
                    value={newAttendance.status}
                    onChange={(e) => setNewAttendance({...newAttendance, status: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="Present">Present</option>
                    <option value="Absent">Absent</option>
                    <option value="Late">Late</option>
                    <option value="On Leave">On Leave</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Check In Time</label>
                  <input
                    type="time"
                    value={newAttendance.checkIn}
                    onChange={(e) => setNewAttendance({...newAttendance, checkIn: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Check Out Time</label>
                  <input
                    type="time"
                    value={newAttendance.checkOut}
                    onChange={(e) => setNewAttendance({...newAttendance, checkOut: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>
              </div>
              <div className="flex space-x-3 mt-6">
                <button
                  type="submit"
                  className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Mark Attendance
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