const DailyTask = require("../models/dailyTasksSchema");

const changeCompletePersentage = (data) => {
  if (data === "Completed") return "100.00 %";
  if (data === "In Progress") return "---";
  if (data === "Not Started") return "0.00 %";
};

const timeConvert = (totalHours, totalMinutes) => {
  var num = totalMinutes;
  var hours = num / 60;
  var rhours = Math.floor(hours) + totalHours;
  var minutes = (hours - rhours) * 60;
  var rminutes = Math.round(minutes);
  return rhours + ":" + rminutes;
};

const changeTimeSpend = (from, to) => {
  const startHours = +from.split(":")[0];
  const endHours = +to.split(":")[0];
  let totalHours = Math.abs(endHours - startHours);

  const startMinutes = +from.split(":")[1];
  const endMinutes = +to.split(":")[1];
  let totalMinutes = Math.abs(endMinutes - startMinutes);

  let totalTime;
  if (totalMinutes < 60) {
    if (totalMinutes <= 9) {
      totalMinutes = "0" + totalMinutes;
    }
    totalTime = totalHours + ":" + totalMinutes;
    return totalTime;
  } else if (totalMinutes === 60) {
    totalHours += 1;
    totalTime = totalHours + ":" + "00";
    return totalTime;
  } else {
    totalTime = timeConvert(totalHours, totalMinutes);
    return totalTime;
  }
};

module.exports = {
  getAllOrOne: async (req, res, next) => {
    try {
      const { id } = req.params;
      const allTasks = await DailyTask.find({ employeeId: id });
      res.status(200).json(allTasks);
    } catch (err) {
      next(err);
    }
  },

  addTask: async (req, res, next) => {
    try {
      const {
        employeeId,
        date,
        from,
        to,
        projectId,
        category,
        taskDescription,
        priority,
        status,
      } = req.body;

      let calcPersentage = changeCompletePersentage(status);
      let calcTimeSpend = changeTimeSpend(from, to);

      const dailyTask = new DailyTask({
        employeeId,
        date,
        from,
        to,
        projectId,
        category,
        taskDescription,
        priority,
        status,
        completePersentage: calcPersentage,
        timeSpent: calcTimeSpend,
      });

      await dailyTask.save();
      const allTasks = await DailyTask.find({ employeeId: employeeId });
      res.status(200).json(allTasks);
    } catch (error) {
      next(`cannot add new tsak ${error}`);
    }
  },

  updateTask: async (req, res, next) => {
    const { id } = req.params;

    const {
      employeeId,
      date,
      from,
      to,
      projectId,
      category,
      taskDescription,
      priority,
      status,
    } = req.body.data;

    try {
      const task = await DailyTask.findOne({ _id: id });
      if (!task) {
        next("no such task exists");
      } else {
        task.date = date;
        task.from = from;
        task.to = to;
        task.projectId = projectId;
        task.category = category;
        task.taskDescription = taskDescription;
        task.priority = priority;
        task.status = status;
        task.completePersentage = changeCompletePersentage(status);
        task.timeSpent = changeTimeSpend(from, to);

        await task.save();
        const allTasks = await DailyTask.find({ employeeId: employeeId });
        res.status(200).json(allTasks);
      }
    } catch (err) {
      next(err);
    }
  },

  deleteTask: async (req, res, next) => {
    const { id } = req.params;
    const { employeeId } = req.body;
    try {
      const task = await DailyTask.findOne({ _id: id });
      if (!task) next("this task is not exist");
      await DailyTask.deleteOne({ _id: id });
      const allTasks = await DailyTask.find({ employeeId: employeeId });
      res.status(200).json(allTasks);
    } catch (err) {
      next(err);
    }
  },
};
