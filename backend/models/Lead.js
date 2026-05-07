const mongoose = require("mongoose");

const LeadSchema = new mongoose.Schema({
  name: String,
  email: String,
  status: {
    type: String,
    default: "new"
  }
});

module.exports = mongoose.model("Lead", LeadSchema);
