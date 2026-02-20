import { 
  Calendar, 
  Briefcase, 
  Users, 
  DollarSign, 
  Clock, 
  TrendingUp 
} from "lucide-react";

export default function MetricsCards() {
  const metrics = [
    {
      title: "Total Leaves",
      value: "12",
      change: "+2 this month",
      icon: Calendar,
      color: "text-blue-600",
      bg: "bg-blue-50"
    },
    {
      title: "Active Projects",
      value: "8",
      change: "2 in progress",
      icon: Briefcase,
      color: "text-green-600",
      bg: "bg-green-50"
    },
    {
      title: "Team Members",
      value: "24",
      change: "+3 this quarter",
      icon: Users,
      color: "text-purple-600",
      bg: "bg-purple-50"
    },
    {
      title: "Total Salary",
      value: "₹45,000",
      change: "Monthly payroll",
      icon: DollarSign,
      color: "text-orange-600",
      bg: "bg-orange-50"
    },
    {
      title: "Avg. Login Time",
      value: "9:15 AM",
      change: "On time",
      icon: Clock,
      color: "text-red-600",
      bg: "bg-red-50"
    },
    {
      title: "Performance",
      value: "92%",
      change: "Above target",
      icon: TrendingUp,
      color: "text-indigo-600",
      bg: "bg-indigo-50"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {metrics.map((metric, index) => (
        <div key={index} className="bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`p-3 rounded-lg ₹{metric.bg}`}>
                <metric.icon className={`w-6 h-6 ₹{metric.color}`} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500">{metric.change}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}