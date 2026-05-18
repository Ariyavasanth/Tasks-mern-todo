const mongoose = require("mongoose");

// Extract URI from env format
const rawUri = "mongodb+srv://Ariya:ariya12345@cluster0.lyw0t6p.mongodb.net/todos_db?retryWrites=true&w=majority";

console.log("Attempting to connect to MongoDB with URI:", rawUri);

mongoose.connect(rawUri)
  .then(() => {
    console.log("SUCCESS: Connected to MongoDB successfully!");
    process.exit(0);
  })
  .catch((err) => {
    console.error("FAILURE: Could not connect to MongoDB!");
    console.error(err);
    process.exit(1);
  });
