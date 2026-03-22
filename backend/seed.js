require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const Client = require("./models/Client");
const Task = require("./models/Task");

const seedDatabase = async () => {
  try {
    await connectDB();

    // Clear existing data
    await Client.deleteMany();
    await Task.deleteMany();

    // Insert sample clients
    const clients = [
      { company_name: "ABC Pvt Ltd", country: "India", entity_type: "Private" },
      { company_name: "XYZ Ltd", country: "USA", entity_type: "Corporation" },
      { company_name: "Global Tech", country: "UK", entity_type: "LLC" }
    ];

    const insertedClients = await Client.insertMany(clients);
    console.log("Clients Seeded!");

    // Insert sample tasks
    const tasks = [
      {
        client_id: insertedClients[0]._id,
        title: "GST Filing",
        category: "Tax",
        due_date: "2026-03-20",
        status: "Pending",
        priority: "High"
      },
      {
        client_id: insertedClients[0]._id,
        title: "Annual Audit",
        category: "Audit",
        due_date: "2026-04-15",
        status: "Pending",
        priority: "High"
      },
      {
        client_id: insertedClients[1]._id,
        title: "Corporate Tax Info",
        category: "Tax",
        due_date: "2026-05-01",
        status: "Completed",
        priority: "Medium"
      }
    ];

    await Task.insertMany(tasks);
    console.log("Tasks Seeded!");

    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();
