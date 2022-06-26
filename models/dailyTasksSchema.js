const mongoose = require("mongoose");

const dailyTaskschema = new mongoose.Schema(
  {
    employeeId: { type: mongoose.Schema.Types.ObjectId, ref: "users" ,required:true},
    date: { type: Date, required: true, default: Date.now },
    from: { type: Date, required: true },
    to: { type: Date, required: true },
    projectId: { type: String },
    category: {
      type: String,
      enum: ["Techical", "Meetings", "Admin"],
    },
    taskDescription: { type: String, default: "No Work assigned" },
    priority: {
      type: String,
      enum: ["High", "Medium", "Low"],
    },
    status: {
      type: String,
      enum: ["In Progress", "Completed", "Not Started"],
    },
    completePersentage: { type: String, default: "0.00 %" },
    timeSpent: { type: String, default: "0.00" },
  },
  { timestamps: { createdAt: "created_at" } }
);

let DailyTask = mongoose.model("dailyTasks", dailyTaskschema);
module.exports = DailyTask;
