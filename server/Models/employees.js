const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // Optional: Ensure email is unique
    match: /.+\@.+\..+/, // Basic email validation regex
  },
  phone: {
    type: Number,
    required: true,
    validate: {
      validator: (v) => v.toString().length === 10,
      message: (props) => `${props.value} is not a valid 10-digit number!`,
    },
  },
  managerId: {
    type: String,
    default: "CEO",
  },
});

let Employee = mongoose.model("Employee", employeeSchema);
module.exports = Employee;
