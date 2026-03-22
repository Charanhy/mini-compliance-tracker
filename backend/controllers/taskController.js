const Task = require("../models/Task");

exports.getTasks = async (req, res) => {
  try {
    const { clientId } = req.params;
    const { search, sort, order } = req.query;

    const query = { client_id: clientId };

    // Search by title or category (case-insensitive)
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } }
      ];
    }

    let sortOption = {};
    if (sort) {
      sortOption[sort] = order === "asc" ? 1 : -1;
    } else {
      sortOption["createdAt"] = -1; // Default to newest tasks first
    }

    const tasks = await Task.find(query).sort(sortOption);
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

exports.getTaskStats = async (req, res) => {
  try {
    const { clientId } = req.params;
    const tasks = await Task.find({ client_id: clientId });
    
    const total = tasks.length;
    const pending = tasks.filter(t => t.status === "Pending").length;
    const completed = tasks.filter(t => t.status === "Completed").length;
    const overdue = tasks.filter(t => 
      t.status === "Pending" && new Date(t.due_date) < new Date()
    ).length;

    res.json({ total, pending, completed, overdue });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

exports.createTask = async (req, res) => {
  try {
    const newTask = new Task(req.body);
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (err) {
    res.status(400).json({ message: "Invalid Data", error: err.message });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedTask = await Task.findByIdAndUpdate(id, req.body, { new: true });
    
    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    
    res.json(updatedTask);
  } catch (err) {
    res.status(400).json({ message: "Error updating task", error: err.message });
  }
};
