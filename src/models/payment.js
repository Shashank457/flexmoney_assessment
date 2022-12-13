const mongoose = require("mongoose");
const employeeSchema = new mongoose.Schema({
    name:{
      type: String,
      require:true
    },
    email: {
      type: String,
      require:true,
      unique:true
    },
    cardnumber:{
      type: Number,
      require:true
    },
    slot: {
      type: String,
      require:true
    },
    date:{
      type: Date,
      require:true
    }
  });
const Payeduser = new mongoose.model("Payeduser", employeeSchema);
module.exports  = Payeduser;