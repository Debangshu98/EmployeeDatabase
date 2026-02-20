import { useState } from "react";
import { 
  DollarSign, 
  Calendar, 
  TrendingUp, 
  TrendingDown, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Download, 
  CreditCard, 
  Banknote, 
  AlertTriangle 
} from "lucide-react";

export default function SalarySection() {
  const [salaries, setSalaries] = useState([
    {
      id: 1,
      employee: "John Smith",
      employeeId: "EMP001",
      month: "January 2024",
      baseSalary: 5000,
      bonus: 500,
      deductions: 400,
      netSalary: 5100,
      status: "Paid",
      paymentDate: "2024-02-05",
      paymentMethod: "Bank Transfer",
      tax: 600,
      overtime: 200,
      allowances: 100
    },
    {
      id: 2,
      employee: "Sarah Johnson",
      employeeId: "EMP002",
      month: "January 2024",
      baseSalary: 6000,
      bonus: 800,
      deductions: 500,
      netSalary: 6300,
      status: "Paid",
      paymentDate: "2024-02-05",
      paymentMethod: "Bank Transfer",
      tax: 720,
      overtime: 300,
      allowances: 200
    },
    {
      id: 3,
      employee: "Mike Chen",
      employeeId: "EMP003",
      month: "January 2024",
      baseSalary: 4500,
      bonus: 0,
      deductions: 350,
      netSalary: 4150,
      status: "Pending",
      paymentDate: "2024-02-10",
      paymentMethod: "Bank Transfer",
      tax: 540,
      overtime: 150,
      allowances: 0
    },
    {
      id: 4,
      employee: "Lisa Rodriguez",
      employeeId: "EMP004",
      month: "January 2024",
      baseSalary: 4800,
      bonus: 300,
      deductions: 420,
      netSalary: 4680,
      status: "Paid",
      paymentDate: "2024-02-05",
      paymentMethod: "Bank Transfer",
      tax: 576,
      overtime: 100,
      allowances: 150
    },
    {
      id: 5,
      employee: "David Kim",
      employeeId: "EMP005",
      month: "January 2024",
      baseSalary: 5500,
      bonus: 1000,
      deductions: 650,
      netSalary: 5850,
      status: "Paid",
      paymentDate: "2024-02-05",
      paymentMethod: "Bank Transfer",
      tax: 660,
      overtime: 400,
      allowances: 250
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newSalary, setNewSalary] = useState({
    employee: "",
    employeeId: "",
    month: "",
    baseSalary: "",
    bonus: "0",
    deductions: "0",
    tax: "0",
    overtime: "0",
    allowances: "0",
    paymentMethod: "Bank Transfer"
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "Paid": return "text-green-600 bg-green-100";
      case "Pending": return "text-yellow-600 bg-yellow-100";
      case "Failed": return "text-red-600 bg-red-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  const getPaymentMethodIcon = (method) => {
    switch (method) {
      case "Bank Transfer": return <Banknote className="w-4 h-4" />;
      case "Cash": return <CreditCard className="w-4 h-4" />;
      default: return <CreditCard className="w-4 h-4" />;
    }
  };

  const handleAddSalary = (e) => {
    e.preventDefault();
    
    const base = parseFloat(newSalary.baseSalary);
    const bonus = parseFloat(newSalary.bonus);
    const deductions = parseFloat(newSalary.deductions);
    const tax = parseFloat(newSalary.tax);
    const overtime = parseFloat(newSalary.overtime);
    const allowances = parseFloat(newSalary.allowances);
    
    const netSalary = base + bonus + overtime + allowances - deductions - tax;
    
    const newSalaryData = {
      id: Date.now(),
      ...newSalary,
      baseSalary: base,
      bonus: bonus,
      deductions: deductions,
      tax: tax,
      overtime: overtime,
      allowances: allowances,
      netSalary: netSalary,
      status: "Pending",
      paymentDate: new Date().toISOString().split('T')[0]
    };
    
    setSalaries([...salaries, newSalaryData]);
    setNewSalary({
      employee: "",
      employeeId: "",
      month: "",
      baseSalary: "",
      bonus: "0",
      deductions: "0",
      tax: "0",
      overtime: "0",
      allowances: "0",
      paymentMethod: "Bank Transfer"
    });
    setIsModalOpen(false);
  };

  const calculateTotals = () => {
    const totalPaid = salaries
      .filter(s => s.status === "Paid")
      .reduce((sum, s) => sum + s.netSalary, 0);
    
    const totalPending = salaries
      .filter(s => s.status === "Pending")
      .reduce((sum, s) => sum + s.netSalary, 0);
    
    const totalDeductions = salaries.reduce((sum, s) => sum + s.deductions, 0);
    const totalBonuses = salaries.reduce((sum, s) => sum + s.bonus, 0);
    
    return { totalPaid, totalPending, totalDeductions, totalBonuses };
  };

  const totals = calculateTotals();

  return (
    <div className="bg-white rounded-xl shadow-sm border p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Salary Management</h2>
        <div className="flex space-x-2">
          <button className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
            <Download className="w-4 h-4" />
            <span>Export Payroll</span>
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Salary</span>
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-600 font-medium">Total Paid</p>
              <p className="text-2xl font-bold text-green-700">₹{totals.totalPaid.toLocaleString()}</p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-500" />
          </div>
        </div>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-yellow-600 font-medium">Total Pending</p>
              <p className="text-2xl font-bold text-yellow-700">₹{totals.totalPending.toLocaleString()}</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-yellow-500" />
          </div>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-600 font-medium">Total Bonuses</p>
              <p className="text-2xl font-bold text-blue-700">₹{totals.totalBonuses.toLocaleString()}</p>
            </div>
            <DollarSign className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-red-600 font-medium">Total Deductions</p>
              <p className="text-2xl font-bold text-red-700">₹{totals.totalDeductions.toLocaleString()}</p>
            </div>
            <TrendingDown className="w-8 h-8 text-red-500" />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-3 px-4 font-medium text-gray-600">Employee</th>
              <th className="text-left py-3 px-4 font-medium text-gray-600">Month</th>
              <th className="text-left py-3 px-4 font-medium text-gray-600">Base Salary</th>
              <th className="text-left py-3 px-4 font-medium text-gray-600">Bonus</th>
              <th className="text-left py-3 px-4 font-medium text-gray-600">Deductions</th>
              <th className="text-left py-3 px-4 font-medium text-gray-600">Net Salary</th>
              <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
              <th className="text-left py-3 px-4 font-medium text-gray-600">Payment Method</th>
              <th className="text-left py-3 px-4 font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {salaries.map((salary) => (
              <tr key={salary.id} className="border-b hover:bg-gray-50">
                <td className="py-4 px-4">
                  <div>
                    <h3 className="font-medium text-gray-900">{salary.employee}</h3>
                    <p className="text-sm text-gray-500">ID: {salary.employeeId}</p>
                  </div>
                </td>
                <td className="py-4 px-4 text-sm text-gray-600">{salary.month}</td>
                <td className="py-4 px-4">
                  <span className="font-medium text-gray-900">₹{salary.baseSalary.toLocaleString()}</span>
                </td>
                <td className="py-4 px-4">
                  <span className="text-green-600 font-medium">+₹{salary.bonus.toLocaleString()}</span>
                </td>
                <td className="py-4 px-4">
                  <span className="text-red-600 font-medium">-₹{salary.deductions.toLocaleString()}</span>
                </td>
                <td className="py-4 px-4">
                  <span className="font-bold text-gray-900">₹{salary.netSalary.toLocaleString()}</span>
                </td>
                <td className="py-4 px-4">
                  <span className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm ${getStatusColor(salary.status)}`}>
                    {salary.status === "Paid" && <CreditCard className="w-4 h-4" />}
                    {salary.status === "Pending" && <Calendar className="w-4 h-4" />}
                    {salary.status === "Failed" && <AlertTriangle className="w-4 h-4" />}
                    <span>{salary.status}</span>
                  </span>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center space-x-2">
                    {getPaymentMethodIcon(salary.paymentMethod)}
                    <span className="text-sm text-gray-600">{salary.paymentMethod}</span>
                  </div>
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

      {/* Add Salary Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4">Add Salary Record</h3>
            <form onSubmit={handleAddSalary}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Employee Name</label>
                  <input
                    type="text"
                    value={newSalary.employee}
                    onChange={(e) => setNewSalary({...newSalary, employee: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Enter employee name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Employee ID</label>
                  <input
                    type="text"
                    value={newSalary.employeeId}
                    onChange={(e) => setNewSalary({...newSalary, employeeId: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Enter employee ID"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Month</label>
                  <input
                    type="text"
                    value={newSalary.month}
                    onChange={(e) => setNewSalary({...newSalary, month: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="e.g., January 2024"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Base Salary</label>
                  <input
                    type="number"
                    value={newSalary.baseSalary}
                    onChange={(e) => setNewSalary({...newSalary, baseSalary: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="0.00"
                    required
                    min="0"
                    step="0.01"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Bonus</label>
                  <input
                    type="number"
                    value={newSalary.bonus}
                    onChange={(e) => setNewSalary({...newSalary, bonus: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Overtime</label>
                  <input
                    type="number"
                    value={newSalary.overtime}
                    onChange={(e) => setNewSalary({...newSalary, overtime: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Allowances</label>
                  <input
                    type="number"
                    value={newSalary.allowances}
                    onChange={(e) => setNewSalary({...newSalary, allowances: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tax</label>
                  <input
                    type="number"
                    value={newSalary.tax}
                    onChange={(e) => setNewSalary({...newSalary, tax: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Deductions</label>
                  <input
                    type="number"
                    value={newSalary.deductions}
                    onChange={(e) => setNewSalary({...newSalary, deductions: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
                  <select
                    value={newSalary.paymentMethod}
                    onChange={(e) => setNewSalary({...newSalary, paymentMethod: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="Bank Transfer">Bank Transfer</option>
                    <option value="Cash">Cash</option>
                    <option value="Check">Check</option>
                  </select>
                </div>
              </div>
              <div className="flex space-x-3 mt-6">
                <button
                  type="submit"
                  className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Add Salary
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