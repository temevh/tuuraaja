const mongoose = require("./db");

const SijainenSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  phoneNumber: String,
  aineet: [String],
});

const Sijainen = mongoose.model("Sijainen", SijainenSchema);

module.exports = Sijainen;
