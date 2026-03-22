const Client = require("../models/Client");

exports.getClients = async (req, res) => {
  try {
    const clients = await Client.find();
    res.json(clients);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};
