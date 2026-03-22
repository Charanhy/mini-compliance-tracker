const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
  company_name: { type: String, required: true },
  country: { type: String, required: true },
  entity_type: { type: String, required: true }
}, {
  timestamps: true
});

clientSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  }
});

const Client = mongoose.model("Client", clientSchema);
module.exports = Client;
