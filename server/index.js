const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const port = 5000;
// const auth = require("./Routes/auth");
// const employee = require("./Routes/employee");
const createemployee = require("./Routes/create_employee");

mongoose
  .connect(
    "mongodb+srv://njatin3435:123@hierarchymanagementdb.rnrgp.mongodb.net/?retryWrites=true&w=majority&appName=Hierarchymanagementdb",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // Adjust timeout to avoid long hangs
      socketTimeoutMS: 45000, // Close socket after 45s of inactivity
    }
  )
  .then(() => console.log("DB is connected"))
  .catch((e) => {
    console.error("DB connection error:", e);
  });

// Optional: Listen for connection events
mongoose.connection.on("connected", () =>
  console.log("Mongoose connected to MongoDB")
);
mongoose.connection.on("error", (err) =>
  console.error("Mongoose connection error:", err)
);
mongoose.connection.on("disconnected", () =>
  console.log("Mongoose disconnected")
);
app.use(cors());
app.use(express.json());

// app.use(employee);
// app.use(auth);
app.use(createemployee);

app.listen(port, () => {
  console.log(`server connected at port ${port}`);
});
