const DailyTask = require("../models/dailyTasksSchema");

module.exports = {
  getAllOrOne: async (req, res, next) => {
    try {
      const { taskId } = req.params;
      const { employeeId } = req.body;
      if (taskId) {
        const oneTask = await DailyTask.findOne({ _id: taskId });
        res.status(200).json(oneTask);
      } else {
        const allTasks = await DailyTask.find({ employeeId: employeeId });
        res.status(200).json(allTasks);
      }
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
        completePersentage,
        timeSpent,
      } = req.body;

      const existedDailyTask = await DailyTask.findOne({ from });
      if (!existedDailyTask) {
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
          completePersentage,
          timeSpent,
        });

        await dailyTask.save();
        const allTasks = await DailyTask.find({ employeeId: employeeId });
        res.status(200).json(allTasks);
      } else next("you cannot add two tasks in the same time");
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
      completePersentage,
      timeSpent,
    } = req.body;
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
        task.completePersentage = completePersentage;
        task.timeSpent = timeSpent;

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
