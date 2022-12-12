const mongoose = require("mongoose");
const employeeSchema = new mongoose.Schema({
    name:{
      type: String
    },
    email: {
      type: String
    },
    cardnumber:{
      type: Number
    },
    slot: {
      type: String
    },
    date:{
      type: Date
    }
  });
const Payeduser = new mongoose.model("Payeduser", employeeSchema);
module.exports  = Payeduser;