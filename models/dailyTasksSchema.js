const mongoose = require("mongoose");

const dailyTaskschema = new mongoose.Schema(
  {
    employeeId: { type: mongoose.Schema.Types.ObjectId, ref: "users" ,required:true},
    date: { type: Date, required: true, default: new Date() },
    from: { type: String, required: true },
    to: { type: String, required: true },
    projectId: { type: String },
    category: {
      type: String,
    },
    taskDescription: { type: String, default: "No Work assigned" },
    priority: {
      type: String,
    },
    status: {
      type: String,
    },
    completePersentage: { type: String, default: "0.00 %" },
    timeSpent: { type: String, default: "0.00" },
  },
  { timestamps: { createdAt: "created_at" } }
);

let DailyTask = mongoose.model("dailyTasks", dailyTaskschema);
module.exports = DailyTask;
