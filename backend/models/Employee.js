import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema(
  {
    employeeId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    department: String,
    designation: String,
    salary: Number,
  },
  { timestamps: true }
);

// 👇 important: force collection name
export default mongoose.model("Employee", employeeSchema, "employees");
