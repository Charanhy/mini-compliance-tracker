const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  client_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
  title: { type: String, required: true },
  category: { type: String, required: true },
  due_date: { type: String, required: true },
  status: { type: String, default: "Pending" },
  priority: { type: String, default: "Medium" }
}, {
  timestamps: true
});

taskSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  }
});

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;
